import React, { useContext, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import axios from "axios";
import { StoreContext } from "@/context/StoreContext";

const VerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { email } = route.params;
  const {url} = useContext(StoreContext);

  const verifyOtp = async () => {
    if (!newPassword.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/auth/reset-password`,
        {
          email,
          otp,
          newPassword,
        }
      );
      Alert.alert("Thành công", "Mật khẩu đã được đặt lại thành công", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Mã xác thực không hợp lệ hoặc đã hết hạn. Vui lòng thử lại."
      );
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post(
        `${url}/api/auth/send-otp`,
        { email }
      );
      Alert.alert("Thành công", "OTP mới đã được gửi!");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể gửi lại OTP. Vui lòng thử lại sau.");
    }
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={require("@/assets/images/forgot_screen.png")}
    >
      <View style={styles.container}>
        <Text style={styles.txtNamePage}>Nhập mã xác thực!</Text>
        <Text style={styles.txtTitle}>
          Nhập vào mã xác thực đã gửi tới email gồm 4 số và mật khẩu mới để lấy
          lại mật khẩu
        </Text>
        <View style={styles.textInputContainer}>
          <View style={styles.textInputBox}>
            <TextInput
              value={otp}
              onChangeText={setOtp}
              style={{ fontSize: 16, fontWeight: "400" }}
              placeholder="Nhập mã OTP"
              placeholderTextColor="#CFCFCF"
              keyboardType="numeric"
              maxLength={4}
            />
            <TouchableOpacity style={styles.iconInput} onPress={resendOtp}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Gửi lại mã
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textInputBox}>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              style={{ fontSize: 16, fontWeight: "400" }}
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor="#CFCFCF"
              secureTextEntry
            />
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#38B6FF" }]}
          onPress={verifyOtp}
        >
          <Text style={[styles.btnText, { color: "white" }]}>
            Đặt lại mật khẩu
          </Text>
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

export default VerificationScreen;

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
    textAlign: "center",
    flexDirection: "row",
  },
  iconInput: {
    position: "absolute",
    right: 0,
    width: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#38B6FF",
    height: 63,
    borderRadius: 15,
  },
  btnText: {
    fontSize: 14,
    fontWeight: "500",
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
