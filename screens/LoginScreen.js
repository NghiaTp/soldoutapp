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
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "@/context/StoreContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useUser } from "@/context/UserContext";

const LoginScreen = () => {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo } = useUser();
  const { url, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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

  const loginAccount = async () => {
    try {
      const response = await axios.post(`${url}/api/user/login`, data);
      if (response.data.success) {
        setToken(response.data.token);
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("userId", response.data.data._id);
        await AsyncStorage.setItem("name", response.data.data.name);

        const avatar = response.data.data.avatar || "";
        await AsyncStorage.setItem("avatar", avatar);

        setUserInfo({
          userId: response.data.data._id,
          name: response.data.data.name,
          avatar: response.data.data.avatar || "",
          token: response.data.token,
        });

        Alert.alert("Thông báo!", "Đăng nhập thành công");
        navigation.navigate("HomeScreen");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      // const response = await axios.post(`${url}/api/user/register`, data);
      console.error("Lỗi khi đăng nhập tài khoản:", error);
      Alert.alert("Thông báo!", "Vui lòng kiểm tra lại thông tin");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background_dangnhap.png")}
      resizeMode="cover"
      style={styles.backgroundImg}
    >
      <View style={styles.container}>
        <Text style={styles.txtNamePage}>Đăng nhập</Text>
        <Text style={styles.txtTitle}>Chào bạn đến với Sold Out!</Text>
        <View style={styles.textInputContainer}>
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
              style={styles.iconInput}
              onPress={() => toggleShowPassword()}
            >
              <Image
                source={
                  showPassword
                    ? require("../assets/images/show_password.jpg")
                    : require("../assets/images/unshow_password.jpg")
                }
                style={{ width: 35, height: 35 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.btnRegister}>
            <Text style={styles.btnTextRegister} onPress={() => loginAccount()}>
              Bắt đầu
            </Text>
          </TouchableOpacity>
          <Text style={[styles.txtForgor]}>
            Bạn đăng nhập không được?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: "#38B6FF",
                fontWeight: "600",
              }}
              onPress={() => navigation.navigate("ForgotPass")}
            >
              Vào đây
            </Text>
          </Text>
          <Text style={[styles.txtForgor]}>
            Bạn chưa có tài khoản?{" "}
            <Text
              style={{
                textDecorationLine: "underline",
                color: "#38B6FF",
                fontWeight: "600",
              }}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              Đăng ký
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 20,
    bottom: "15%",
  },
  txtNamePage: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
  },
  txtTitle: {
    fontSize: 19,
    fontWeight: "500",
  },
  iconInput: {
    position: "absolute",
    right: 10,
  },

  textInputContainer: {
    alignItems: "center",
    marginTop: 30,
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
    marginTop: 30,
    backgroundColor: "#38B6FF",
    width: 374,
    height: 63,
    borderRadius: 38,
    justifyContent: "center",
    left: 5,
  },

  btnTextRegister: {
    color: "#F6F1FB",
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },

  txtForgor: {
    fontSize: 15,
    fontWeight: "300",
    marginTop: 15,
  },
});
