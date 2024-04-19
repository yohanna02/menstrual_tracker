import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar
} from "react-native";
import { useState } from "react";
import SlidesData from "@/constants/SlidesData";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

function Index() {
  const { width } = useWindowDimensions();

  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <View style={style.container}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <FlatList
        data={SlidesData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        overScrollMode="never"
        renderItem={({ item }) => (
          <View style={[style.container, { width }]}>
            <Image
              source={item.image}
              style={[style.image, { width, resizeMode: "contain" }]}
            />
          </View>
        )}
        onViewableItemsChanged={({viewableItems}) => {setSlideIndex(viewableItems[0].index!)}}
      />

      <View style={style.indicatorContainer}>
        {SlidesData.map((_, index) => (
          <View key={index} style={[style.indicator, slideIndex === index && { width: 20, backgroundColor: Colors.primary}]} />
        ))}
      </View>

      <View style={style.textContainer}>
        <Text style={style.textTitle}>Welcome</Text>
        <Text style={style.textSubtitle}>
          Create an account to get started and learn more!
        </Text>
        <Link href="/Signup" asChild>
          <TouchableOpacity style={style.btn}>
            <Text style={style.btnText}>Get Started</Text>
          </TouchableOpacity>
        </Link>

        <Text style={{marginTop: 20, color: "#000000AD", fontSize: 17}}>
          Already have an account? <Link href="/Login" style={{color: "#672B2D", fontSize: 17}}>Log in</Link>
        </Text>
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
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  indicatorContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryLight,
    margin: 5,
  },
  textContainer: {
    marginTop: 30,
    flex: 0.5,
    alignItems: "center",
  },
  textTitle: {
    fontSize: 27,
    fontWeight: "700",
  },
  textSubtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#000000AD",
  },
  btn: {
    marginTop: 20,
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

export default Index;
