import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import { authFetch } from "@/lib/axios";

const Information = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, confirmSetPassword] = useState("");

  const router = useRouter();

  useEffect(function () {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      function () {
        if (!router.canGoBack()) {
          BackHandler.exitApp();
        }
        router.push("/(auth)/profile");
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const updatePassword = useMutation({
    mutationFn: async function() {
      const { data } = await authFetch.post("/auth/update-password", {
        oldPassword,
        newPassword: password,
      });

      return data;
    },
    onSuccess: function(data) {
      setOldPassword("");
      setPassword("");
      confirmSetPassword("");
      alert(data.message);
    },
    onError: function(error: any) {
      alert(error.response.data.message || "An error occured!");
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={confirmSetPassword}
        />

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            width: "100%",
            borderRadius: 11,
          }}
            onPress={() => {
              if (password !== confirmPassword) {
                Alert.alert("Passwords do not match");
                return;
              }
              updatePassword.mutate();
            }}
            disabled={updatePassword.isPending}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 22 }}>
            {updatePassword.isPending ? "Loading..." : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 40,
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

export default Information;
