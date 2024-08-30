import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/StoreContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RegisterScreen = () => {
  const [text, setText] = useState("");
  const { url, setToken } = useContext(StoreContext);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setToken(token);
        }
      } catch (error) {
        console.error("Lỗi khi lấy token từ AsyncStorage:", error);
      }
    };

    fetchToken();
  }, [setToken]);

  const onChangeHandler = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const registerAccount = async () => {
    if (data.password !== data.confirmPassword) {
      Alert.alert("Thông báo!", "Mật khẩu và mật khẩu nhập lại không khớp");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/user/register`, data);
      if (response.data.success) {
        setToken(response.data.token);
        await AsyncStorage.setItem("token", response.data.token);
        Alert.alert("Thông báo!", "Đăng ký thành công");
        navigation.navigate("Login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký tài khoản:", error);
      Alert.alert("Thông báo!", "Vui lòng kiểm tra lại thông tin");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background_dangky_real.png")}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={{ marginTop: 35 }}>
          <Text style={styles.txtTitle}>Tạo tài khoản của bạn</Text>

          <View style={styles.textInputContainer}>
            <View style={styles.textInputBox}>
              <TextInput
                value={data.name}
                onChangeText={(text) => onChangeHandler("name", text)}
                placeholder="Họ tên"
                placeholderTextColor="#CFCFCF"
                style={{ fontSize: 16, fontWeight: "400" }}
              />
            </View>

            <View style={styles.textInputBox}>
              <TextInput
                value={data.email}
                onChangeText={(text) => onChangeHandler("email", text)}
                style={{ fontSize: 16, fontWeight: "400" }}
                placeholder="Email"
                placeholderTextColor="#CFCFCF"
              />
            </View>

            <View style={styles.textInputBox}>
              <TextInput
                value={data.password}
                onChangeText={(text) => onChangeHandler("password", text)}
                style={{ fontSize: 16, fontWeight: "400" }}
                placeholderTextColor="#CFCFCF"
                placeholder="Mật khẩu"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={() => toggleShowPassword()}
              >
                <Image
                  source={
                    showPassword
                      ? require("../assets/images/show_password.jpg")
                      : require("../assets/images/unshow_password.jpg")
                  }
                  style={styles.iconInput}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.textInputBox}>
              <TextInput
                value={data.confirmPassword}
                onChangeText={(text) =>
                  onChangeHandler("confirmPassword", text)
                }
                style={{ fontSize: 16, fontWeight: "400" }}
                placeholderTextColor="#CFCFCF"
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={!showPassword}
              />
            </View>
          </View>

          <View style={styles.checkLogin}>
            <Text style={styles.textcheck}>
              Tôi đồng ý với{" "}
              <Text style={{ color: "#38B6FF" }}>Điều khoản và điều kiện</Text>
            </Text>
            <BouncyCheckbox
              size={25}
              fillColor="#38B6FF"
              unFillColor="#FFFFFF"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              style={styles.checkbox}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.btnRegister}>
              <Text
                style={styles.btnTextRegister}
                onPress={() => registerAccount()}
              >
                Bắt đầu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  txtTitle: {
    textAlign: "center",
    color: "black",
    fontWeight: "700",
    fontSize: 30,
  },

  iconInput: {
    right: 10,
    width: 30,
    height: 30,
  },

  textInputContainer: {
    alignItems: "center",
    marginTop: 20,
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

  btnRegister: {
    backgroundColor: "#38B6FF",
    width: 374,
    height: 63,
    borderRadius: 38,
    justifyContent: "center",
    left: 5,
    marginVertical: 20,
  },

  btnTextRegister: {
    color: "#F6F1FB",
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },

  checkLogin: {
    flexDirection: "row",
    paddingLeft: 25,
    marginBottom: 20,
  },

  checkbox: {
    position: "absolute",
    right: 10,
  },

  textcheck: {
    fontWeight: "500",
    fontSize: 14,
  },
});
