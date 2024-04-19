import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import userStorage from "@/storage/user";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function RootLayoutNav() {

  const router = useRouter();

  console.log(userStorage.getBoolean("onBoardingCompleted"));

  useEffect(function() {
    if (!userStorage.getBoolean("onBoardingCompleted")) {
      router.replace("/OnBoarding");
    } else if (!userStorage.getBoolean("isLoggedIn")) {
      router.replace("/Landing");
    } else {
      router.replace("/home");
    }
  }, []);

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
