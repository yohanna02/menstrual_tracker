import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";

const White = () => {
  const router = useRouter();
  const [isFaceId, setIsFaceId] = useState(false);
  useEffect(function () {
    LocalAuthentication.hasHardwareAsync().then(function (hasHardware) {
      LocalAuthentication.isEnrolledAsync().then(function (isEnrolled) {
        if (!hasHardware || !isEnrolled) {
          router.replace("/(auth)/home");
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

  function unlockDevice() {
    LocalAuthentication.authenticateAsync({
      promptMessage: "unlock to use periodpal",
    }).then(function ({ success }) {
      if (success) {
        router.replace("/(auth)/home");
      }
    });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text style={{ fontSize: 20 }}>Use {isFaceId ? <Text>FaceID</Text> : <Text>Fingerprint</Text>} to unlock</Text>

      <TouchableOpacity style={{ marginTop: 10 }} onPress={unlockDevice}>
        {isFaceId ? (
          <MaterialCommunityIcons
            name="face-recognition"
            size={70}
            color="black"
          />
        ) : (
          <MaterialIcons name="fingerprint" size={70} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default White;
