import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
