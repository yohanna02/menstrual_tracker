import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, BackHandler } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { userContext } from "@/context/userContext";
import Colors from "@/constants/Colors";
import { authFetch } from "@/lib/axios";
import userStorage from "@/storage/user";

const Information = () => {
  const { user, setUser } = useContext(userContext);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const router = useRouter();

  useEffect(function() {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", function() {
        if (!router.canGoBack()) {
            BackHandler.exitApp();
        }
        router.push("/(auth)/profile");
        return true
    });

    return () => backHandler.remove();
  }, []);

  const updateProfile = useMutation({
    mutationFn: async function() {
      const { data } = await authFetch.post("/auth/update-profile", {
        name,
        email,
      });

      return data;
    },
    onSuccess: function(data) {
      const newUser = { id: user?.id || "", name: name || "", email: email || "" };
      userStorage.set("user", JSON.stringify(newUser));
      setUser(newUser);
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
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            width: "100%",
            borderRadius: 11,
          }}
          onPress={() => updateProfile.mutate()}
          disabled={updateProfile.isPending}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 22 }}>
            {updateProfile.isPending ? "Loading..." : "Update"}
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
