import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "@/context/StoreContext";

const ForgetPassScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const {url} = useContext(StoreContext);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${url}/api/auth/send-otp`,
        {
          email,
        }
      );
      console.log("Response:", response.data);
      if (response.data && response.data.message) {
        Alert.alert("Thông báo", response.data.message, [
          {
            text: "OK",
            onPress: () => {
              console.log(
                "Navigating to Verification screen with email:",
                email
              );
              navigation.navigate("Verification", { email });
            },
          },
        ]);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Lỗi", "Không thể gửi OTP. Vui lòng thử lại.");
    }
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={require("@/assets/images/forgot_screen.png")}
    >
      <View style={styles.container}>
        <Text style={styles.txtNamePage}>Bạn quên mật khẩu ?</Text>
        <Text style={styles.txtTitle}>
          Nhập Email của bạn vào để lấy mã xác thực!
        </Text>
        <View style={styles.textInputContainer}>
          <View style={styles.textInputBox}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={{ fontSize: 16, fontWeight: "400" }}
              placeholder="Nhập Email của bạn"
              placeholderTextColor="#CFCFCF"
            />
            <Image
              source={require("../assets/images/check.png")}
              style={styles.iconInput}
            />
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#38B6FF" }]}
          onPress={handleSendOtp}
        >
          <Text style={[styles.btnText, { color: "white" }]}>Xác thực</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.btnText, { fontWeight: "400" }]}>Hủy bỏ</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ForgetPassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtNamePage: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    letterSpacing: 1,
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  iconInput: {
    position: "absolute",
    right: 10,
  },
  textInputContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  textInputBox: {
    width: 374,
    height: 63,
    borderWidth: 0.5,
    borderColor: "#38B6FF",
    backgroundColor: "#F2F3F7",
    marginBottom: 20,
    borderRadius: 15,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  btnContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: "10%",
    paddingVertical: 20,
  },
  button: {
    width: 374,
    height: 63,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  btnText: {
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
});
