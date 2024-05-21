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
import React, { useState, useContext, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import Colors from "@/constants/Colors";
import { userContext } from "@/context/userContext";
import userStorage from "@/storage/user";

export default function profile() {
  const { user, setUser, bioAuthEnabled, setBioAuthEnabled } = useContext(userContext);

  const [localAuth, setLocalAuth] = useState(true);
  const [isFaceId, setIsFaceId] = useState(false);
  function toggleSwitch() {
    if (!bioAuthEnabled) {
      userStorage.set("bio_ask", false);
    }
    setBioAuthEnabled((previousState) => {
      return !previousState;
    });
  }

  const router = useRouter();

  useEffect(function () {
    LocalAuthentication.hasHardwareAsync().then(function (hasHardware) {
      LocalAuthentication.isEnrolledAsync().then(function (isEnrolled) {
        if (!hasHardware || !isEnrolled) {
          setLocalAuth(false);
        }

        LocalAuthentication.supportedAuthenticationTypesAsync().then(function (
          type
        ) {
          if (type[0] === 2 || type[1] === 2) {
            setIsFaceId(true);
          }
        });
      });
    });
  }, []);

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
          {localAuth && (
            <View style={styles.btn}>
              {isFaceId ? (
                <MaterialCommunityIcons
                  name="face-recognition"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialIcons name="fingerprint" size={24} color="black" />
              )}
              <View>
                <Text style={styles.btnTextBig}>Enable biometric lock</Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: Colors.primaryLight }}
                thumbColor={bioAuthEnabled ? Colors.primary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={bioAuthEnabled}
                style={{ marginLeft: "auto" }}
              />
            </View>
          )}
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
