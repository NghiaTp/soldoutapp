import { Stack } from "expo-router";
import StoreContextProvider from "@/context/StoreContext.js";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function RootLayout() {
  return (
    <StripeProvider
      publishableKey="pk_test_51PfuX3HpsrYW7xP0aiROxLiLEWt4FN66jk3m31DhMMM2xTs3H5dRzveb8SzqLE7wTIeVpPPmXVVIALPZCzP0k8Kz00nREQmvfv"
      merchantIdentifier="your_merchant_identifier"
    >
      <StoreContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </StoreContextProvider>
    </StripeProvider>
  );
}
