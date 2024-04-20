import Colors from "@/constants/Colors";
import { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import userStorage from "@/storage/user";
import { setAuthFetchToken, standardFetch } from "@/lib/axios";

interface SignupResponse {
  message: string;
  data: {
    id: string;
    email: string;
  };
  token: string;
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const signup = useMutation({
    mutationFn: function() {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }
      return standardFetch.post("/auth/signup", {
        email,
        password,
      });
    },
    onSuccess: function({ data }: { data: SignupResponse}) {
      userStorage.set("isLoggedIn", true);
      userStorage.set("token", data.token);
      setAuthFetchToken(data.token);
      userStorage.set("user", JSON.stringify(data.data));
      router.push("/OnBoarding");
    },
    onError: function(error: any) {
      alert(error.response.data.message || "An error occured!");
    }
  });

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={style.textHeaderContainer}>
        <Image
          source={require("../../assets/images/adaptive-icon.png")}
          style={style.headerImage}
        />
        <Text
          style={{ fontSize: 28, fontWeight: "700", color: Colors.primary }}
        >
          Create an account
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "400", color: "#8A8787" }}>
          Input your details and sign up with us!
        </Text>
      </View>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={style.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={style.input}
          secureTextEntry={true}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={{ width: "100%", padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>
          Already have an account?{" "}
          <Link
            href="/Login"
            style={{ color: Colors.primary, fontWeight: "700" }}
          >
            Log in
          </Link>
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            padding: 10,
            width: "100%",
            borderRadius: 11,
            marginTop: 20,
          }}
          onPress={() => signup.mutate()}
          disabled={signup.isPending}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 22 }}>
            { signup.isPending ? "Loading..." : "Sign up" }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeaderContainer: {
    alignItems: "center",
    width: "80%",
  },
  headerImage: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    padding: 20,
    width: "100%",
    gap: 30,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 11,
    padding: 10,
    fontSize: 21,
  },
});
