import Colors from "@/constants/Colors";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  BackHandler
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { Calendar } from "react-native-calendars";
import { DateData, Theme } from "react-native-calendars/src/types";
import { useMutation } from "@tanstack/react-query";
import { authFetch } from "@/lib/axios";
import userStorage from "@/storage/user";

const peroidLength = [3, 4, 5, 6, 7, 8, 9, 10, 11];
const cycleLength = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];
const viewTitle = [
  "What should we call you on PeriodPal?",
  "Your Average Peroid length?",
  "Your Average Cycle length?",
  "Your last period date?",
];

type Selected = {
  [date: string]: {
    selected: boolean;
    marked: boolean;
    selectedColor: string;
  };
} | {};

export default function OnBoarding() {
  const [name, setName] = useState("");
  const [selectPeroidLength, setSelectPeroidLength] = useState(4);
  const [selectCycleLength, setSelectCycleLength] = useState(28);
  const [lastPeriodDate, setLastPeriodDate] = useState(0);
  const { width } = useWindowDimensions();

  const calendarTheme: Theme = {
    backgroundColor: "#ffffff",
    calendarBackground: Colors.primaryLight,
    arrowColor: Colors.primary,
    dayTextColor: Colors.primary,
    monthTextColor: Colors.primary,
    textMonthFontWeight: "bold",
    selectedDayBackgroundColor: Colors.primary,
    selectedDayTextColor: "white",
    textSectionTitleColor: Colors.primary,
    textDayHeaderFontWeight: "bold",
    todayTextColor: "white",
    todayBackgroundColor: "#754965",
    textDisabledColor: "#8A8787",
  };

  const today = new Date();
  const minDate = `${today.getFullYear() - 1}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const [selectedDate, setSelectedDate] = useState<Selected>({});

  const [view, setView] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", function() {
      if (view === 0) {
        if (router.canGoBack())
          router.back();
        else
          BackHandler.exitApp();
      } else {
        setView(view - 1);
      }
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const onBoard = useMutation({
    mutationFn: async () => {
      return await authFetch.post("/auth/onboarding", {
        name,
        periodLength: selectPeroidLength,
        cycleLength: selectCycleLength,
        lastPeriodDate,
      });
    },
    onSuccess: () => {
      userStorage.set("onBoardingCompleted", true);
      router.push("/(auth)/home");
    },
    onError: (error: any) => {
      alert(error.response.data.message || "An error occured!");
    },
  });

  function handleOnboarding() {
    if (view === 0) {
      if (name.length > 0) {
        setView(1);
      }
    } else if (view === 1) {
      setView(2);
    } else if (view === 2) {
      setView(3);
    } else {
      onBoard.mutate();
    }
  }

  function daySelectHanndler(day: DateData) {
    const lastDate = new Date(day.timestamp);
    if (lastDate > today) {
      alert("Please select a date before today");
      return;
    }

    setLastPeriodDate(day.timestamp);
    setSelectedDate({
      [day.dateString]: {
        selected: true,
        marked: false,
        selectedColor: "#03adfc",
      },
    });
  }

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <View style={style.textHeaderContainer}>
        <Image
          source={require("../../assets/images/adaptive-icon.png")}
          style={style.headerImage}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            color: "#8A8787",
            textAlign: "center",
          }}
        >
          Let's get to know you for a better experience!
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: Colors.primary,
            textAlign: "center",
          }}
        >
          {viewTitle[view]}
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        {view === 0 && (
          <TextInput
            style={style.input}
            placeholder="Your name"
            onChangeText={setName}
          />
        )}
        {view === 1 && (
          <Picker
            style={style.input}
            selectedValue={selectPeroidLength}
            onValueChange={(itemValue) => setSelectPeroidLength(itemValue)}
          >
            {peroidLength.map((item, index) => (
              <Picker.Item key={index} label={item.toString()} value={item} />
            ))}
          </Picker>
        )}
        {view === 2 && (
          <Picker
            style={style.input}
            selectedValue={selectCycleLength}
            onValueChange={(itemValue) => setSelectCycleLength(itemValue)}
          >
            {cycleLength.map((item, index) => (
              <Picker.Item key={index} label={item.toString()} value={item} />
            ))}
          </Picker>
        )}
        {view === 3 && (
          <Calendar
            style={{
              width: width - 30,
              borderRadius: 20,
            }}
            markedDates={selectedDate}
            onDayPress={daySelectHanndler}
            theme={calendarTheme}
            minDate={minDate}
            enableSwipeMonths={true}
          />
        )}
        <TouchableOpacity style={style.btn} onPress={handleOnboarding}>
          <Text style={style.btnText}>
            {view === 3 ? (onBoard.isPending ? "Loading..." : "Finish") : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeaderContainer: {
    alignItems: "center",
    width: "90%",
  },
  headerImage: {
    width: 100,
    height: 100,
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    fontSize: 18,
  },
  btn: {
    marginTop: 200,
    width: 200,
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 21,
    fontWeight: "700",
  },
});
