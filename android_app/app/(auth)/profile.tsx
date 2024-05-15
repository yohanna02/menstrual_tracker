import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { userContext } from "@/context/userContext";
import userStorage from "@/storage/user";

export default function profile() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { user, setUser } = useContext(userContext);
  const router = useRouter();

  function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "OK",
        onPress: () => {
          userStorage.clearAll();
          setUser(null);
          router.replace("/Landing");
        },
      },
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        {user && (
          <>
            <Text style={{ fontSize: 28, fontWeight: "400" }}>{user.name}</Text>
            <Text style={{ color: "#404040" }}>{user.email}</Text>
          </>
        )}

        <View style={{ marginTop: 24 }}>
          <Text style={{ color: "#404040", fontSize: 18 }}>Account</Text>
          <Link href="/(profile)/UpdateInformation" asChild>
            <TouchableOpacity style={styles.btn}>
              <AntDesign name="user" size={28} color="black" />
              <View>
                <Text style={styles.btnTextBig}>Profile information</Text>
                <Text style={styles.btnTextSmall}>Change name, email</Text>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color="black"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </Link>
          <Link href="/(profile)/UpdatePassword" asChild>
            <TouchableOpacity style={styles.btn}>
              <Feather name="lock" size={28} color="black" />
              <View>
                <Text style={styles.btnTextBig}>Change password</Text>
                <Text style={styles.btnTextSmall}>Secure your account</Text>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color="black"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </Link>
          <View style={styles.btn}>
            <MaterialIcons name="fingerprint" size={28} color="black" />
            <View>
              <Text style={styles.btnTextBig}>Enable biometric lock</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primaryLight }}
              thumbColor={isEnabled ? Colors.primary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleLogout}>
            <MaterialIcons name="logout" size={28} color="black" />
            <View>
              <Text style={styles.btnTextBig}>Logout</Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="black"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "white",
  },
  btn: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  btnTextBig: {
    fontSize: 18,
    fontWeight: "bold",
  },
  btnTextSmall: {
    fontSize: 14,
    color: "#404040",
  },
});
