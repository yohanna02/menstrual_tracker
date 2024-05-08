import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { userContext } from "@/context/userContext";
import Colors from "@/constants/Colors";
import userStorage from "@/storage/user";
import { useRouter } from "expo-router";

export default function profile() {
  const { user, setUser } = useContext(userContext);
  const router = useRouter();

  function handleLogout() {
    userStorage.clearAll();
    setUser(null);
    router.replace("/Landing");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
      { user && <Text>{ user.name }</Text> }
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: Colors.primary,
          marginTop: 20,
          borderRadius: 5,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
