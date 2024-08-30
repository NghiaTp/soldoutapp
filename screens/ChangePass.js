import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  
  const ChangePass = ({ navigation }) => {
    const [text, setText] = useState("");
  
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
          <View style={styles.textInputBox}>
            <TextInput
              value={text}
              setText={setText}
              style={{ fontSize: 16, fontWeight: "400" }}
              placeholderTextColor="#CFCFCF"
              placeholder="Mật khẩu"
            />
            <Image
              source={require("../assets/images/eye.png")}
              style={styles.iconInput}
            />
          </View>

          <View style={styles.textInputBox}>
            <TextInput
              value={text}
              setText={setText}
              style={{ fontSize: 16, fontWeight: "400" }}
              placeholderTextColor="#CFCFCF"
              placeholder="Nhập lại mật khẩu"
            />
            <Image
              source={require("../assets/images/eye.png")}
              style={styles.iconInput}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#38B6FF" }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.btnText, { color: "white" }]}>Đồng ý</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ForgotPass")}
          >
            <Text style={[styles.btnText, { fontWeight: "400" }]}>Hủy bỏ</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
  
  export default ChangePass;
  
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
  