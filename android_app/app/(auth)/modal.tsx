import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function modal() {
  return (
    <View style={styles.container}>
     <Text>Daily insight</Text>
     <Text>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  }
});
