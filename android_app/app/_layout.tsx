import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import userStorage from "@/storage/user";

export default function RootLayoutNav() {

  const router = useRouter();

  useEffect(function() {
    if (userStorage.getBoolean("isLoggedIn")) {
      router.replace("/home");
    } else {
      router.replace("/Landing");
    }
  }, []);

  return <Slot />
}
