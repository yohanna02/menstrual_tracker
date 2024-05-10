import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import React, { useState, useMemo } from "react";
import { FontAwesome, Octicons, MaterialIcons } from "@expo/vector-icons";
import Share from "react-native-share";
import { insightCard } from "@/constants/SlidesData";
import Colors from "@/constants/Colors";

export default function modal() {
  const data = useLocalSearchParams<{ modal: string }>();
  const [slideIndex, setSlideIndex] = useState(0);

  const index = useMemo(() => parseInt(data.modal), [data.modal]);

  const [slides, setSlides] = useState(insightCard[index].slides);

  function handleNext() {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  }

  function handlePrev() {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  }

  function shareImage() {
    Share.open({
      title: insightCard[index].text,
      url: slides[slideIndex],
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Image
        source={{uri: slides[slideIndex]}}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          marginTop: (StatusBar.currentHeight || 0) * 2,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Link href="/(auth)/home" asChild>
            <TouchableOpacity>
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>
          </Link>
          <Text>Tap to continue</Text>
          <TouchableOpacity onPress={shareImage}>
            <Octicons name="download" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white", height: 5 }}>
          <View
            style={{
              width: `${100 / slides.length}%`,
              height: 5,
              backgroundColor: Colors.primary,
              marginLeft: `${(100 / slides.length) * slideIndex}%`,
            }}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={handlePrev}
          style={{ opacity: slideIndex === 0 ? 0 : 1 }}
          disabled={slideIndex === 0}
        >
          <FontAwesome
            name="arrow-circle-left"
            size={32}
            color={insightCard[index].slideBtnColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={{ opacity: slides.length - 1 === slideIndex ? 0 : 1 }}
          disabled={slides.length - 1 === slideIndex}
        >
          <FontAwesome
            name="arrow-circle-right"
            size={32}
            color={insightCard[index].slideBtnColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  btnContainer: {
    padding: 10,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
