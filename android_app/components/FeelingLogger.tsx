import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useState } from "react";
import MoodData from "@/constants/MoodData";
import { useMutation } from "@tanstack/react-query";
import { authFetch } from "@/lib/axios";
import FullScreenLoading from "./FullScreenLoading";

const buttons = MoodData;

const FeelingLogger = () => {
  const { width } = useWindowDimensions();

  const [selectedFeelingIndex, setSelectedFeelingIndex] = useState(-1);

  const logFeelingMutation = useMutation({
    mutationFn: function (feeling: string) {
      return authFetch.post("/log", {
        month: new Date(),
        mood: feeling.toUpperCase(),
      });
    },
    onSuccess: function ({ data }) {
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    },
  });

  function logFeeling(feeling: string, index: number) {
    setSelectedFeelingIndex(index);
    logFeelingMutation.mutate(feeling);
  }

  return (
    <View style={{ width: width - 30 }}>
      {logFeelingMutation.isPending && <FullScreenLoading text="Logging feeling" />}
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
            onPress={() => logFeeling(button.label, index)}
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
  );
};

export default FeelingLogger;
