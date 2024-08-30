import { View, Text, StatusBar, ScrollView } from "react-native";
import React from "react";
import { styles, font, Colors, components } from "@/app/customs/Styles";
import Normal from "@/customs/Normal";
// import { StackNavigationProp } from '@react-navigation/stack';
// import { AccountStackParamsEnum, AccountStackParamsList } from '../../navigation/ParamList/AccountStackParams';
// type AccountSettingNavigationProp = StackNavigationProp<AccountStackParamsList, AccountStackParamsEnum.AccountSetting>;

const Setting = () => {
  //   const navigation = useNavigation<AccountSettingNavigationProp>();

  const Dash = () => {
    return (
      <View
        style={[
          { width: "100%", backgroundColor: Colors.semiWhite, height: 1 },
        ]}
      ></View>
    );
  };
  return (
    <View style={[styles.container1]}>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <View style={[{ marginVertical: 10 }]}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 28,
            lineHeight: 36,
            letterSpacing: -0.28,
            fontFamily: "Raleway",
          }}
        >
          Setting
        </Text>
      </View>

      <ScrollView
        style={[{ marginTop: 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={[{}]}>
            <Text
              style={[
                font.subline,
                {
                  fontWeight: "800",
                  fontSize: 20,
                  lineHeight: 23.48,
                  fontFamily: "Raleway",
                },
              ]}
            >
              Personal
            </Text>
          </View>
          <Normal
            header="Profile"
            // onPress={() =>{
            //   navigation.navigate(AccountStackParamsEnum.CreateRestaurant);
            // }}
          />
          <Dash />
          <Normal
            header="Shipping address"
            // subline="Change your Menu"
            // onPress={() =>{
            //   navigation.navigate(AccountStackParamsEnum.CreateMenu);
            // }}
          />
          <Dash />
          <Normal
            header="Payment methods"
            // subline="Track your order status here"
            // onPress={() =>{
            //   navigation.navigate(AccountStackParamsEnum.DeliveryInfo);
            // }}
          />
          <Dash />
          <View style={[{ marginTop: 10 }]}>
            <Text
              style={[
                font.subline,
                {
                  fontWeight: "800",
                  fontSize: 20,
                  lineHeight: 23.48,
                  fontFamily: "Raleway",
                },
              ]}
            >
              Personal
            </Text>
          </View>
          <Normal header="Country" subline="Viet Nam" />
          <Dash />
          <Normal header="Currency" subline="$ USD" />

          <Dash />

          <Normal header="Sizes" subline="UK" />

          <Dash />

          <Normal
            header="terms and conditions"
            // subline="Add or remove your delivery locations"
          />

          <Dash />

          <View style={[{ marginTop: 10 }]}>
            <Text
              style={[
                font.subline,
                {
                  fontWeight: "800",
                  fontSize: 20,
                  lineHeight: 23.48,
                  fontFamily: "Raleway",
                },
              ]}
            >
              Account
            </Text>
          </View>

          <Normal
            header="Language"
            // subline="Add Facebook, Twitter etc"
          />

          <Dash />
          <Normal header="About Soldout" subline="Introduction" />
        </View>

        <View style={[{ marginTop: 10 }]}>
          <Text
            style={[
              font.subline,
              {
                fontWeight: "800",
                fontSize: 20,
                lineHeight: 23.48,
                fontFamily: "Raleway",
              },
            ]}
          >
            Sold out
          </Text>
          <Text style={{ fontWeight: 400, lineHeight: 20, fontSize: 12 }}>
            Version: 1.0 June, 2024
          </Text>
        </View>

        <Normal style={{ marginBottom: 28 }} header="Logout" hideSubline />
      </ScrollView>
    </View>
  );
};

export default Setting;
