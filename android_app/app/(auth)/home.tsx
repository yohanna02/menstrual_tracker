import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useState, useContext, useMemo, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import Colors from "@/constants/Colors";
import { MarkedDates, Theme } from "react-native-calendars/src/types";
import { Link } from "expo-router";
import { userContext } from "@/context/userContext";
import userStorage from "@/storage/user";
import { insightCard } from "@/constants/SlidesData";

const buttons = [
  {
    label: "Happy",
    color: "#FFFF00",
  },
  {
    label: "Anxious",
    color: "#808080",
  },
  {
    label: "Angry",
    color: "#FF0000",
  },
  {
    label: "Depressed",
    color: "#000080",
  },
  {
    label: "Hungry",
    color: "#FFA500",
  },
  {
    label: "Agitated",
    color: "#FF4500",
  },
  {
    label: "Uncomfortable",
    color: "#556B2F",
  },
  {
    label: "Sad",
    color: "#6A5ACD",
  },
  {
    label: "Exhausted",
    color: "#444444",
  },
];

const cards = insightCard;

export default function TabOneScreen() {
  const [selected, setSelected] = useState("");
  const { width } = useWindowDimensions();

  const { user, bleedingDates, fertileDates, ovulationDates, setBleedingDates, setFertileDates, setOvulationDates } =
    useContext(userContext);

    useEffect(function() {
      setBleedingDates(JSON.parse(userStorage.getString("bleedingDates")!));
      setFertileDates(JSON.parse(userStorage.getString("fertileDates")!));
      setOvulationDates(JSON.parse(userStorage.getString("ovulationDates")!));
    }, []);

  const [selectedFeelingIndex, setSelectedFeelingIndex] = useState(-1);

  const bleeding = useMemo(function () {
    const dates = bleedingDates.map((date, index) => ({
      [date]: {
        color: Colors.bleeding,
        textColor: "white",
      },
    }));
    return Object.assign({}, ...dates);
  }, [bleedingDates]);
  const fertile = useMemo(function () {
    const dates = fertileDates.map((date, index) => ({
      [date]: {
        color: Colors.fertile,
        textColor: "white",
      },
    }));
    return Object.assign({}, ...dates);
  }, [fertileDates]);
  const ovulation = useMemo(function() {
    const dates = ovulationDates.map((date, index) => ({
      [date]: {
        color: Colors.ovulation,
        textColor: "white",
      },
    }));
    return Object.assign({}, ...dates);
  }, [ovulationDates]);

  // console.log(bleeding);

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
  };

  return (
    <>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {user && fertileDates && bleedingDates && ovulationDates && (
          <View style={styles.container}>
            <Text style={[styles.helloText, { width: width - 30 }]}>
              Hello {user.name}
            </Text>
            <Calendar
              style={{
                width: width - 30,
                borderRadius: 20,
              }}
              theme={calendarTheme}
              markingType="period"
              markedDates={{
                ...bleeding,
                ...fertile,
                ...ovulation
              }}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: width - 30,
                marginTop: 10,
                gap: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <View
                  style={{
                    backgroundColor: Colors.bleeding,
                    height: 10,
                    width: 10,
                    borderRadius: 3,
                  }}
                ></View>
                <Text>Bleeding</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <View
                  style={{
                    backgroundColor: Colors.fertile,
                    height: 10,
                    width: 10,
                    borderRadius: 3,
                  }}
                ></View>
                <Text>Fertile</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <View
                  style={{
                    backgroundColor: Colors.ovulation,
                    height: 10,
                    width: 10,
                    borderRadius: 3,
                  }}
                ></View>
                <Text>Ovulation</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <View
                  style={{
                    backgroundColor: "#754965",
                    height: 10,
                    width: 10,
                    borderRadius: 3,
                  }}
                ></View>
                <Text>Today</Text>
              </View>
            </View>

            <View style={{ width: width - 30 }}>
              <Text
                style={{ fontSize: 20, marginVertical: 20, fontWeight: "bold" }}
              >
                How are you feeling today?
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {buttons.map((button, index) => (
                  <TouchableOpacity
                    key={button.label}
                    style={{
                      borderWidth: 2,
                      borderColor: button.color,
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 10,
                      backgroundColor:
                        selectedFeelingIndex === index ? button.color : "white",
                    }}
                    onPress={() => setSelectedFeelingIndex(index)}
                  >
                    <Text
                      style={{
                        color:
                          selectedFeelingIndex === index ? "white" : "black",
                      }}
                    >
                      {button.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ width: width, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  marginVertical: 20,
                  width: width - 30,
                  fontWeight: "bold",
                }}
              >
                Some Daily Insights
              </Text>

              <View style={{ width: width, alignItems: "flex-end" }}>
                <View style={{ marginBottom: 20, width: width - 20 }}>
                  <FlatList
                    data={cards}
                    keyExtractor={(card) => card.text}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={true}
                    overScrollMode="never"
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 10 }} />
                    )}
                    renderItem={({ item: card, index }) => (
                      <Link href={`/(modal)/${index}`} asChild>
                        <TouchableOpacity
                          style={{
                            padding: 20,
                            backgroundColor: card.color,
                            borderRadius: 20,
                            width: 150,
                            alignItems: "center",
                            justifyContent: "space-around",
                            gap: 10,
                            height: 200,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 25,
                              fontWeight: "bold",
                              color: index % 2 !== 0 ? "white" : "black",
                            }}
                          >
                            {card.text}
                          </Text>
                          <Image source={card.image} />
                        </TouchableOpacity>
                      </Link>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  helloText: {
    paddingVertical: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
