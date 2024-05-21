import { createContext, useEffect, useState, useRef } from "react";
import { AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
// import { useRouter } from "expo-router";
import userStorage from "@/storage/user";

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
  // const appState = useRef(AppState.currentState);

  useEffect(function () {
    const isAuth = userStorage.getBoolean("bio_auth");

    if (isAuth) {
      setBioAuthEnabled(true);
    } else {
      setBioAuthEnabled(false);
    }

    // const subscription = AppState.addEventListener("change", function(state) {
    //   if (appState.current.match(/inactive|background/) && state === "active") {
    //     console.log(1);
    //   } else if (state === "active") {
    //     console.log(2);
    //   }
    //   appState.current = state;
    // });

    // return () => subscription.remove();
  }, []);

  useEffect(
    function () {
      userStorage.set("bio_auth", bioAuthEnabled);

      if (!userStorage.getBoolean("bio_ask")) {
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
