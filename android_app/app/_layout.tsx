import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import userStorage from "@/storage/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setAuthFetchToken } from "@/lib/axios";
import UserContextProvider from "@/context/userContext";

export default function RootLayoutNav() {
  const router = useRouter();

  useEffect(function () {
    setAuthFetchToken(userStorage.getString("token"));
    if (
      userStorage.getBoolean("isLoggedIn") &&
      !userStorage.getBoolean("onBoardingCompleted")
    ) {
      router.replace("/OnBoarding");
    } else if (!userStorage.getBoolean("isLoggedIn")) {
      router.replace("/Landing");
    } else {
      router.replace("/home");
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
