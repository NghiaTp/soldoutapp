import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider, useUser } from "@/context/UserContext";
import LoginScreen from "@/screens/LoginScreen";
import ForgetPassScreen from "@/screens/ForgetPassScreen";
import VerificationScreen from "@/screens/VerificationScreen";
import ChangePass from "@/screens/ChangePass";
import SettingScreen from "@/screens/SettingScreen";
import CartScreen from "../screens/Cartscreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductListScreen from "../screens/ProductListScreen";
import DeliverTab from "./DeliverTab";
import VoucherScreen from "../screens/VoucherScreen";
import PaymentScreen from "../screens/PaymentScreen";
import UserProfile from "@/screens/UserProfile";
import VerifyOrderScreen from "@/screens/VerifyOrderScreen";
import OrderScreen from "@/screens/OrderScreen";
import WaitOrderScreen from "@/screens/WaitOrderScreen";
import PrepareOrderScreen from "@/screens/PrepareOrderScreen";
import AreShippingScreen from "@/screens/AreShippingScreen";
import TransactedScreen from "@/screens/TransactedScreen";
import FlashSale from "@/screens/FlashSale";
import ListPhoneProduct from '@/screens/ListPhoneProduct'
import ListLaptopProduct from '@/screens/ListLaptopProduct'
import ListTabletProduct from '@/screens/ListTabletProduct'
import Address from '@/screens/Address';
import CancelOrder from '@/screens/CancelOrder'
import OrderDetail from '@/screens/OrderDetail'
import { StoreContext } from "@/context/StoreContext";
import ChangePassword from '@/screens/ChangePassword'
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const { token } = useContext(StoreContext);

  return (
    <UserProvider>
      {!token ? (
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="HomeScreen" component={TabNavigation} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
            />
            <Stack.Screen
              name="ProductListScreen"
              component={ProductListScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* <Stack.Screen name='Home' component={TabNavigation}/> */}
            <Stack.Screen name="ForgotPass" component={ForgetPassScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="ChangePass" component={ChangePass} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="TabDeliver" component={DeliverTab} />
            <Stack.Screen name="VoucherScreen" component={VoucherScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="Profile" component={UserProfile} />
            <Stack.Screen name="VerifyOrder" component={VerifyOrderScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="WaitOrder" component={WaitOrderScreen} />
            <Stack.Screen name="PrepareOrder" component={PrepareOrderScreen} />
            <Stack.Screen name="Shipping" component={AreShippingScreen} />
            <Stack.Screen name="Transacted" component={TransactedScreen} />
            <Stack.Screen name="FlashSale" component={FlashSale} />
            <Stack.Screen name="Phone" component={ListPhoneProduct}/>
            <Stack.Screen name="TabletScreen" component={ListTabletProduct}/>
            <Stack.Screen name="LaptopScreen" component={ListLaptopProduct}/>
            <Stack.Screen name="Address" component={Address}/>
            <Stack.Screen name="CancelOrder" component={CancelOrder}/>
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="HomeScreen" component={TabNavigation} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
            />
            <Stack.Screen
              name="ProductListScreen"
              component={ProductListScreen}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* <Stack.Screen name='Home' component={TabNavigation}/> */}
            <Stack.Screen name="ForgotPass" component={ForgetPassScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="ChangePass" component={ChangePass} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="TabDeliver" component={DeliverTab} />
            <Stack.Screen name="VoucherScreen" component={VoucherScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="Profile" component={UserProfile} />
            <Stack.Screen name="VerifyOrder" component={VerifyOrderScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="WaitOrder" component={WaitOrderScreen} />
            <Stack.Screen name="PrepareOrder" component={PrepareOrderScreen} />
            <Stack.Screen name="Shipping" component={AreShippingScreen} />
            <Stack.Screen name="Transacted" component={TransactedScreen} />
            <Stack.Screen name="FlashSale" component={FlashSale} />
            <Stack.Screen name="Phone" component={ListPhoneProduct}/>
            <Stack.Screen name="TabletScreen" component={ListTabletProduct}/>
            <Stack.Screen name="LaptopScreen" component={ListLaptopProduct}/>
            <Stack.Screen name="Address" component={Address}/>
            <Stack.Screen name="CancelOrder" component={CancelOrder}/>
            <Stack.Screen name="OrderDetail" component={OrderDetail}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword}/>

          </Stack.Navigator>
        </NavigationContainer>
      )}
    </UserProvider>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
