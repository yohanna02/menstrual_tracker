import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/axios";
import { PieChart } from "react-native-chart-kit";
import FullScreenLoading from "@/components/FullScreenLoading";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import FeelingLogger from "@/components/FeelingLogger";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface LogResponse {
  name: string;
  count: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

let dateString = new Date();

export default function logs() {
  const { width, height } = useWindowDimensions();
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-UK", { month: "long" })
  );

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForLabels: {
      fontSize: 15,
    },
  };

  const logQuery = useQuery({
    queryKey: ["logs", date],
    queryFn: async function () {
      const { data } = await authFetch.get<LogResponse[]>("/log", {
        params: {
          date: dateString,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    logQuery.refetch();
  }, [date]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  return (
    <View style={styles.container}>
      <FeelingLogger />
      {logQuery.isLoading && <FullScreenLoading text={`Fetching ${date} logs`} />}
      <BottomSheetModalProvider>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 24 }}>{date}</Text>
          <AntDesign name="caretdown" size={14} color="black" />
        </TouchableOpacity>
        {logQuery.isError && (
          <Text style={{ color: "red", fontSize: 15, marginTop: 20 }}>
            Error fetching data
          </Text>
        )}
        {logQuery.isSuccess && logQuery.data.length === 0 && (
          <Text style={{ marginTop: 20, fontSize: 18 }}>No data available</Text>
        )}
        <PieChart
          data={logQuery.data || []}
          width={width}
          height={220}
          chartConfig={chartConfig}
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[0, 0]}
          absolute
        />
        <View style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackDrop}
          >
            <BottomSheetView style={styles.contentContainer}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  onPress={() => {
                    dateString = new Date();
                    dateString.setMonth(index);
                    setDate(month);
                    bottomSheetModalRef.current?.dismiss();
                  }}
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{month}</Text>
                </TouchableOpacity>
              ))}
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
});
