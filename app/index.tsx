import { Text, View } from "react-native";
import Navigation from "@/navigation/navigation";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function Index() {
  return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Navigation />
      </View>
  );
}
