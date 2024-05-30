import { createContext, useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
// import { useRouter } from "expo-router";
import userStorage from "@/storage/user";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";

let show = false;
type userType = { id: string; name: string; email: string };

type userContextType = {
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
  bleedingDates: string[];
  setBleedingDates: React.Dispatch<React.SetStateAction<string[]>>;
  ovulationDates: string[];
  setOvulationDates: React.Dispatch<React.SetStateAction<string[]>>;
  fertileDates: string[];
  setFertileDates: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFeelingIndex: number;
  setSelectedFeelingIndex: React.Dispatch<React.SetStateAction<number>>;
  bioAuthEnabled: boolean;
  setBioAuthEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const userContext = createContext<userContextType>({
  user: null,
  setUser: (): userType | null => null,
  bleedingDates: [],
  setBleedingDates: () => [],
  ovulationDates: [],
  setOvulationDates: () => [],
  fertileDates: [],
  setFertileDates: () => [],
  selectedFeelingIndex: -1,
  setSelectedFeelingIndex: () => -1,
  bioAuthEnabled: false,
  setBioAuthEnabled: () => false,
});

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const router = useRouter();
  const [user, setUser] = useState<userType | null>(null);
  const [bleedingDates, setBleedingDates] = useState<string[]>([]);
  const [ovulationDates, setOvulationDates] = useState<string[]>([]);
  const [fertileDates, setFertileDates] = useState<string[]>([]);
  const [selectedFeelingIndex, setSelectedFeelingIndex] = useState<number>(-1);
  const [bioAuthEnabled, setBioAuthEnabled] = useState(false);
  const appState = useRef(AppState.currentState);

  useQuery({
    queryKey: ["start"],
    queryFn: async function () {
      const isAuth = userStorage.getBoolean("bio_auth");
  
      if (isAuth) {
        setBioAuthEnabled(true);
      } else {
        setBioAuthEnabled(false);
      }
      return true;
    }
  })

  useEffect(
    function () {
      if (!userStorage.getBoolean("bio_ask") && userStorage.getBoolean("bio_ask") !== undefined) {
        LocalAuthentication.authenticateAsync({
          promptMessage: "Enable biometric lock",
        }).then(function ({ success }) {
          if (success) {
            userStorage.set("bio_ask", true);
          } else {
            userStorage.set("bio_ask", false);
          }
        });
      }

      const subscription = AppState.addEventListener("change", function(state) {
        if (appState.current.match(/inactive|background/) && state === "active" && bioAuthEnabled) {
          const elapsed = Date.now() - (userStorage.getNumber("startTime") || 0);
  
          if (elapsed >= 10000) {
            router.replace("/Lock");
          }
        } else {
          userStorage.set("startTime", Date.now());
        }
        appState.current = state;
      });
  
      return () => subscription.remove();
    },
    [bioAuthEnabled]
  );

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        bleedingDates,
        setBleedingDates,
        ovulationDates,
        setOvulationDates,
        fertileDates,
        setFertileDates,
        selectedFeelingIndex,
        setSelectedFeelingIndex,
        bioAuthEnabled,
        setBioAuthEnabled,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
