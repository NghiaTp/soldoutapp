import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "@/context/StoreContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/context/UserContext";
import { Colors } from "@/customs/Styles";
import Normal from "@/customs/Normal";

const UserScreen = () => {
  const navigation = useNavigation();
  const { token, url } = useContext(StoreContext);
  const { userInfo } = useUser();

  const logout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("name");
    navigation.navigate("Login");
  };

  const userId = userInfo?.userId;

  const Dash = () => {
    return (
      <View
        style={[
          { width: "100%", backgroundColor: Colors.semiWhite, height: 1 },
        ]}
      />
    );
  };

  const handleNotLoggedIn = () => {
    Alert.alert("Thông báo", "Vui lòng đăng nhập để tiếp tục.", [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tài khoản</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <Image
              source={require("@/assets/images/cart.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingScreen")}
          >
            <Image
              source={require("@/assets/images/setting_icon.png")}
              style={[styles.icon, styles.settingIcon]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { userId })}
          >
            {!token ? (
              <Image
                source={require("@/assets/images/avatar.jpg")}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={{ uri: `${url}/${userInfo.avatar}` }}
                style={styles.avatar}
              />
            )}
          </TouchableOpacity>
          {!token ? (
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>SoldOut chào bạn!</Text>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.btnLoginText}>Đăng nhập để tiếp tục</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.greetingText}>
                Xin chào, <Text style={styles.username}>{userInfo.name}</Text>
              </Text>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() =>
                  Alert.alert("Thông báo", "Bạn muốn đăng xuất?", [
                    { text: "Cancel" },
                    { text: "Đăng xuất", onPress: logout },
                  ])
                }
              >
                <Text style={styles.btnLoginText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <ScrollView
        style={styles.trangthai}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.trangthaiItem}
          onPress={() => navigation.navigate("WaitOrder")}
        >
          <Image
            source={require("@/assets/images/wallet.png")}
            style={styles.image}
          />
          <Text style={styles.textTrangThai}>Chờ xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trangthaiItem}
          onPress={() => navigation.navigate("PrepareOrder")}
        >
          <Image
            source={require("@/assets/images/package.png")}
            style={styles.image}
          />
          <Text>Đang chuẩn bị đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trangthaiItem}
          onPress={() => navigation.navigate("Shipping")}
        >
          <Image
            source={require("@/assets/images/delivery.png")}
            style={styles.image}
          />
          <Text>Đang vận chuyển</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trangthaiItem}
          onPress={() => navigation.navigate("Transacted")}
        >
          <Image
            source={require("@/assets/images/check_package.png")}
            style={styles.image}
          />
          <Text>Đã giao</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trangthaiItem}
          onPress={() => {
            if (token) {
              navigation.navigate("OrderScreen");
            } else {
              handleNotLoggedIn();
            }
          }}
        >
          <Image
            source={require("@/assets/images/my_package.png")}
            style={styles.image}
          />
          <Text>Đơn hàng của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trangthaiItem}
          onPress={() => {
            if (token) {
              navigation.navigate("CancelOrder");
            } else {
              handleNotLoggedIn();
            }
          }}
        >
          <Image
            source={require("@/assets/images/cancel-order.png")}
            style={styles.image}
          />
          <Text>Đơn hủy</Text>
        </TouchableOpacity>
      </ScrollView>
      <View>
        <ScrollView
          style={styles.personalContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.personalHeader}>Tiện ích khác</Text>
          {token ? (
            <>
              <Normal
                header="Địa chỉ"
                onPress={() => navigation.navigate("Address")}
              />
              <Dash />
              <Normal
                header="Thông tin các đơn hàng"
                onPress={() => navigation.navigate("OrderScreen")}
              />
              <Dash />
              <Normal
                header="Thông tin tài khoản"
                onPress={() => navigation.navigate("Profile", { userId })}
              />
              <Dash />
              <Normal
                header="Đổi mật khẩu"
                onPress={() => navigation.navigate("ChangePassword")}
              />
            </>
          ) : (
            <Text style={styles.notLoggedInText}>
              Vui lòng đăng nhập để xem thông tin cá nhân và các tiện ích khác.
            </Text>
          )}
          <Dash />
          <Normal header="Xem cài đặt" />
        </ScrollView>
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: 65,
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 45,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
  },
  imageContainer: {
    right: 8,
    position: "absolute",
    flexDirection: "row",
  },
  icon: {
    height: 30,
    width: 30,
  },
  settingIcon: {
    marginLeft: 13,
    height: 28,
    width: 28,
  },
  avatarContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },
  textContainer: {
    justifyContent: "center",
    marginLeft: 15,
    gap: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#38B6FF",
  },
  btnLogin: {
    backgroundColor: "#FF3333",
    width: "auto",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnLoginText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#38B6FF",
  },
  username: {
    fontSize: 22,
    fontWeight: "600",
    color: "#38B6FF",
  },
  trangthai: {
    flexDirection: "row",
    marginTop: 40,
    maxHeight: 100,
  },
  textTrangThai: {
    textAlign: "center",
  },
  trangthaiItem: {
    alignItems: "center",
    marginLeft: 20,
  },
  personalContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  personalHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  notLoggedInText: {
    fontSize: 16,
    color: "#FF3333",
    textAlign: "center",
    marginVertical: 20,
  },
});
