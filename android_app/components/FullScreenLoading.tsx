import Spinner from "react-native-loading-spinner-overlay";
import Colors from "@/constants/Colors";

export default function FullScreenLoading({text}: {text: string}) {
  return (
    <Spinner
      visible={true}
      textContent={text}
      color={Colors.primary}
      textStyle={{ color: Colors.primary }}
    />
  );
}
