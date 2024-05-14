import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useContext, useEffect } from "react";
import Colors from "@/constants/Colors";
import { userContext } from "@/context/userContext";
import userStorage from "@/storage/user";

export default function TabLayout() {

  const { setUser, user } = useContext(userContext);

  useEffect(function() {
    const userObj = JSON.parse(userStorage.getString("user")!);

    setUser(userObj);
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          headerShown: true,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <AntDesign name="areachart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
