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
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import Colors from "@/constants/Colors";
import { Theme } from "react-native-calendars/src/types";
import { Link } from "expo-router";

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

const cards = [
  {
    text: "The Menstrual Cycle",
    image: require("@/assets/images/cycle.png"),
    color: "#F9E9DE",
  },
  {
    text: "Irregular Periods",
    image: require("@/assets/images/irregular-period.png"),
    color: "#C3C193",
  },
  {
    text: "Dealing with cramps",
    image: require("@/assets/images/cramps.png"),
    color: "#E3D0E9",
  },
  {
    text: "Late Periods",
    image: require("@/assets/images/late-period.png"),
    color: "#5E1707",
  },
  {
    text: "Mind and Body",
    image: require("@/assets/images/mind-body.png"),
    color: "#CAD1F3",
  },
  {
    text: "Period blood colour",
    image: require("@/assets/images/blood.png"),
    color: "#B79A7D",
  },
  {
    text: "Signs of Pregnancy",
    image: require("@/assets/images/pregnancy.png"),
    color: "#F2BEEC",
  },
];

export default function TabOneScreen() {
  const [selected, setSelected] = useState("");
  const { width } = useWindowDimensions();

  const [selectedFeelingIndex, setSelectedFeelingIndex] = useState(-1);

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
        <View style={styles.container}>
          <Text style={[styles.helloText, { width: width - 30 }]}>
            Hello Eddie
          </Text>
          <Calendar
            style={{
              width: width - 30,
              borderRadius: 20,
            }}
            theme={calendarTheme}
            markingType="period"
            markedDates={{
              "2024-04-04": {
                startingDay: true,
                color: Colors.bleeding,
                textColor: "white",
              },
              "2024-04-05": { color: Colors.bleeding, textColor: "white" },
              "2024-04-06": { color: Colors.bleeding, textColor: "white" },
              "2024-04-07": {
                color: Colors.bleeding,
                endingDay: true,
                textColor: "white",
              },
              "2024-04-08": {
                color: Colors.fertile,
                textColor: "white",
                startingDay: true,
              },
              "2024-04-09": { color: Colors.fertile, textColor: "white" },
              "2024-04-10": { color: Colors.fertile, textColor: "white" },
              "2024-04-11": { color: Colors.fertile, textColor: "white" },
              "2024-04-12": { color: Colors.fertile, textColor: "white" },
              "2024-04-13": { color: Colors.fertile, textColor: "white" },
              "2024-04-14": {
                color: Colors.fertile,
                textColor: "white",
                endingDay: true,
              },
              "2024-04-15": {
                color: Colors.ovulation,
                textColor: "white",
                startingDay: true,
              },
              "2024-04-16": { color: Colors.ovulation, textColor: "white" },
              "2024-04-17": { color: Colors.ovulation, textColor: "white" },
              "2024-04-18": {
                color: Colors.ovulation,
                textColor: "white",
                endingDay: true,
              },
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
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
            <Text style={{ fontSize: 20, marginVertical: 20, fontWeight: "bold" }}>
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
                      color: selectedFeelingIndex === index ? "white" : "black",
                    }}
                  >
                    {button.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ width: width, alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginVertical: 20, width: width - 30, fontWeight: "bold" }}>
              Some Daily Insights
            </Text>

            <View style={{width: width, alignItems: "flex-end"}}>
              <View style={{ marginBottom: 20, width: width - 20 }}>
                <FlatList
                  data={cards}
                  keyExtractor={(card) => card.text}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={true}
                  overScrollMode="never"
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  renderItem={({ item: card, index }) => (
                    <Link href="/modal" asChild>
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
