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
import { setAuthFetchToken, standardFetch } from "@/lib/axios";
import userStorage from "@/storage/user";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  onboardingCompleted: boolean;
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = useMutation({
    mutationFn: function () {
      return standardFetch.post("/auth/login", {
        email,
        password,
      });
    },
    onSuccess: function ({ data }: { data: LoginResponse }) {
      console.log(data);
      userStorage.set("isLoggedIn", true);
      userStorage.set("token", data.token);
      setAuthFetchToken(data.token);
      userStorage.set("user", JSON.stringify(data.user));

      if (!data.onboardingCompleted) {
        router.replace("/OnBoarding");
      } else {
        router.replace("/home");
      }
    },
    onError: function (error: any) {
      alert(error.response.data.message || "An error occured!");
    },
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
          Login to your account
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "400", color: "#8A8787" }}>
          Login to continue using our app!
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
      </View>

      <View style={{ width: "100%", padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>
          Don't have an account?{" "}
          <Link
            href="/Signup"
            style={{ color: Colors.primary, fontWeight: "700" }}
          >
            Sign up
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
          onPress={() => login.mutate()}
          disabled={login.isPending}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 22 }}>
            {login.isPending ? "Loading..." : "Login"}
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
