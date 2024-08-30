import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useUser } from "@/context/UserContext";

const Cartscreen = () => {
  const {
    cartItem,
    product_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
  } = useContext(StoreContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("atm");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const { userInfo } = useUser();

  useEffect(() => {
    if (token) {
      axios
        .get(`${url}/api/address/list`, { headers: { token } })
        .then((response) => {
          if (response.data && response.data.data) {
            setAddresses(response.data.data);
          } else {
            console.error("Unexpected data format:", response.data);
          }
        })
        .catch((error) => console.error("Error fetching addresses:", error));
    }
  }, [url, token]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleApplyPromoCode = () => {
    // Logic to handle promo code application
    setModalVisible(false);
  };

  const handleOrder = async () => {
    if (paymentMethod === "cash") {
      if (!selectedAddress) {
        Alert.alert("Thông báo", "Vui lòng chọn địa chỉ giao hàng.");
        return;
      }
      
      const chosenAddress = addresses.find(
        (addr) => addr._id === selectedAddress
      );

      if (!chosenAddress) {
        Alert.alert("Thông báo", "Địa chỉ không hợp lệ.");
        return;
      }

      let orderItems = product_list
        .filter((item) => cartItem[item._id] > 0)
        .map((item) => ({
          name: item.name,
          price: item.status === "Giảm giá" ? item.salePrice : item.price,
          quantity: cartItem[item._id],
          images: item.images,
        }));

      let orderData = {
        userId: userInfo.userId,
        items: orderItems,
        amount: getTotalCartAmount(),
        address: {
          address: chosenAddress.address,
          fullname: chosenAddress.fullname,
          phone: chosenAddress.phone,
        },
      };

      try {
        const response = await axios.post(
          `${url}/api/order/cash/order`,
          orderData
        );

        if (response.data.success) {
          Alert.alert("Thông báo", "Đơn hàng đã được tạo thành công!");
          navigation.navigate("VerifyOrder");
        } else {
          Alert.alert(
            "Thông báo",
            response.data.message || "Có lỗi xảy ra khi tạo đơn hàng."
          );
        }
      } catch (error) {
        console.error("Error creating cash order:", error);
        Alert.alert("Thông báo", "Có lỗi xảy ra khi tạo đơn hàng.");
      }
    } else if (paymentMethod === "atm") {
      navigation.navigate("PaymentScreen");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.cartItems}>
          {product_list.map((item) => {
            if (cartItem[item._id] > 0) {
              return (
                <View key={item._id} style={styles.cartItem}>
                  <Image
                    source={{ uri: `${url}/images/${item.images[0].filename}` }}
                    style={styles.image}
                  />
                  <View style={styles.itemDetails}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemText}>{item.name}</Text>
                      <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => removeFromCart(item._id)}
                          style={styles.removeButton}
                        >
                          <Text style={styles.removeText}>X</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.itemPrice}>
                        {formatPrice(item.price)}
                      </Text>
                      <Text style={styles.itemQuantity}>
                       Sl: {cartItem[item._id]}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>
      <View style={styles.cartBottom}>
        <View style={styles.cartTotal}>
          <View style={styles.totalDetail}>
            <Text style={styles.totalTitle}>Tổng giá:</Text>
            <Text style={styles.totalAmount}>
              {formatPrice(getTotalCartAmount())}
            </Text>
          </View>
          <View style={styles.totalDetail}>
            <Text style={styles.shippingTitle}>Vận chuyển:</Text>
            <Text style={styles.shippingAmount}>
              {formatPrice(getTotalCartAmount() > 200000 ? 0 : 16000)}
            </Text>
          </View>
          <View style={styles.totalDetail}>
            <Text style={styles.finalTitle}>Tổng hóa đơn:</Text>
            <Text style={styles.finalAmount}>
              {formatPrice(
                getTotalCartAmount() > 200000
                  ? getTotalCartAmount()
                  : getTotalCartAmount() + 16000
              )}
            </Text>
          </View>
        </View>
        <View style={styles.paymentMethodContainer}>
          <Text style={styles.paymentMethodTitle}>
            Chọn phương thức thanh toán:
          </Text>
          <View style={styles.paymentMethodOptions}>
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                paymentMethod === "atm" && styles.selectedMethod,
              ]}
              onPress={() => setPaymentMethod("atm")}
            >
              <Text style={styles.paymentMethodText}>
                Thanh toán bằng thẻ ATM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                paymentMethod === "cash" && styles.selectedMethod,
              ]}
              onPress={() => setPaymentMethod("cash")}
            >
              <Text style={styles.paymentMethodText}>Thanh toán tiền mặt</Text>
            </TouchableOpacity>
          </View>
        </View>
        {paymentMethod === "cash" && (
          <View style={styles.addressSelectionContainer}>
            <TouchableOpacity
              style={styles.addressButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addressButtonText}>
                Chọn địa chỉ giao hàng
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Đặt hàng ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.promocodeButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.promocodeButtonText}>Nhập mã giảm giá</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn địa chỉ giao hàng</Text>
            {addresses.length === 0 ? (
              <Text>Không có địa chỉ nào để chọn.</Text>
            ) : (
              <View style={styles.addressSelection}>
                {addresses.map((address) => (
                  <TouchableOpacity
                    key={address._id}
                    style={[
                      styles.addressOption,
                      selectedAddress === address._id && styles.selectedAddress,
                    ]}
                    onPress={() => setSelectedAddress(address._id)}
                  >
                    <Text>
                      {address.fullname} - {address.address} - {address.phone}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 30
  },
  scrollView: {
    flexGrow: 1,
  },
  cartItems: {
    padding: 10,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemQuantity: {
    marginRight: 10,
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: 30
  },
  removeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold'
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartBottom: {
    padding: 10,
  },
  cartTotal: {
    marginBottom: 20,
  },
  totalDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  totalTitle: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shippingTitle: {
    fontSize: 16,
  },
  shippingAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  finalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  finalAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  paymentMethodTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethodOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  paymentMethodButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedMethod: {
    backgroundColor: "#38B6FF",
  },
  paymentMethodText: {
    color: "#333",
  },
  addressSelectionContainer: {
    marginBottom: 20,
  },
  addressButton: {
    backgroundColor: "#38B6FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addressButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addressSelection: {
    marginTop: 10,
  },
  addressPicker: {
    marginBottom: 10,
  },
  addressInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  addressOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedAddress: {
    backgroundColor: "#d3f4ff",
  },
  orderButton: {
    backgroundColor: "#38B6FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  promocodeButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  promocodeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#38B6FF",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  priceContainer:{
    flexDirection:'row',
    justifyContent: 'space-between'
  }
});

export default Cartscreen;
