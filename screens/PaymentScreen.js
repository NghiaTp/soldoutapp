import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useStripe } from "@stripe/stripe-react-native";

const PaymentScreen = () => {
  const { getTotalCartAmount, token, product_list, cartItem, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    district: "",
    commune: "",
    phone: "",
  });

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation();

  useEffect(() => {
    if (!token) {
      Alert.alert(
        "Thông báo!",
        "Bạn chưa đăng nhập tài khoản!",
        [{ text: "Thoát", onPress: () => navigation.navigate("CartScreen") }],
        { cancelable: false }
      );
    } else if (getTotalCartAmount() === 0) {
      Alert.alert(
        "Thông báo!",
        "Không thể thanh toán nếu không có sản phẩm!",
        [{ text: "Thoát", onPress: () => navigation.navigate("CartScreen") }],
        { cancelable: false }
      );
    }
  }, [token, getTotalCartAmount, navigation]);

  const onChangeHandler = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const initializePaymentSheet = async (orderData) => {
    try {
      const response = await axios.post(
        `${url}/api/order/place-mobile`,
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        const { clientSecret } = response.data;
        const initOptions = {
          paymentIntentClientSecret: clientSecret,
          returnURL: "your-app-scheme://stripe-redirect",
          merchantDisplayName: "SoldOut Shop",
        };

        if (Platform.OS === "android") {
          initOptions.googlePay = true;
        }

        const { error } = await initPaymentSheet(initOptions);

        if (error) {
          Alert.alert("Lỗi", error.message);
        } else {
          return true;
        }
      } else {
        Alert.alert(
          "Có lỗi xảy ra",
          response.data.message || "Vui lòng thử lại."
        );
      }
    } catch (error) {
      Alert.alert("Có lỗi xảy ra", error.message || "Vui lòng thử lại.");
    }
    return false;
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Lỗi: ${error.code}`, error.message);
    } else {
      Alert.alert("Thành công", "Thanh toán của bạn đã được xác nhận!");
      navigation.navigate("VerifyOrder");
    }
  };

  const placeOrder = async () => {
    const orderItems = product_list
      .filter((item) => cartItem[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItem[item._id],
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 30000, // Adjust shipping cost here
    };

    const isInitialized = await initializePaymentSheet(orderData);
    if (isInitialized) {
      openPaymentSheet();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Thông tin giao hàng</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Họ"
            value={data.firstName}
            placeholderTextColor={"gray"}
            onChangeText={(value) => onChangeHandler("firstName", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên"
            value={data.lastName}
            placeholderTextColor={"gray"}
            onChangeText={(value) => onChangeHandler("lastName", value)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={data.email}
          placeholderTextColor={"gray"}
          onChangeText={(value) => onChangeHandler("email", value)}
        />
        <TextInput
          style={[styles.input, { marginVertical: 20 }]}
          placeholder="Số nhà, đường, ấp"
          value={data.street}
          placeholderTextColor={"gray"}
          onChangeText={(value) => onChangeHandler("street", value)}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.inputHalf]}
            placeholder="Tỉnh/Thành phố"
            value={data.city}
            placeholderTextColor={"gray"}
            onChangeText={(value) => onChangeHandler("city", value)}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Huyện/Quận"
            value={data.district}
            placeholderTextColor={"gray"}
            onChangeText={(value) => onChangeHandler("district", value)}
          />
        </View>
        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Phường/Xã"
          value={data.commune}
          placeholderTextColor={"gray"}
          onChangeText={(value) => onChangeHandler("commune", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={data.phone}
          placeholderTextColor={"gray"}
          onChangeText={(value) => onChangeHandler("phone", value)}
        />
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>Kiểm tra lại đơn hàng</Text>
        <View style={styles.summaryItem}>
          <Text>Vận chuyển:</Text>
          <Text>{formatPrice(30000)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text>Giảm giá:</Text>
          <Text>{formatPrice(getTotalCartAmount())}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text>Tổng tiền hóa đơn:</Text>
          <Text>{formatPrice(getTotalCartAmount() + 30000)}</Text>
        </View>
        <Button title="Đặt hàng" onPress={placeOrder} color="#4CAF50" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 10,
  },
  formContainer: {
    marginBottom: 32,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#fafafa",
    flex: 1,
    marginRight: 12,
  },
  inputHalf: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#fafafa",
    flex: 1,
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default PaymentScreen;
