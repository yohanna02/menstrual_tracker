import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="UpdateInformation"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          title: "Update Imformation",
        }}
      />
      <Stack.Screen
        name="UpdatePassword"
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          title: "Update Password",
        }}
      />
    </Stack>
  );
}
