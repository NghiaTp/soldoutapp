import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StoreContext } from "@/context/StoreContext";
import axios from "axios";

const { width } = Dimensions.get("window");

const OrderDetail = ({ route, navigation }) => {
  const [order, setOrder] = useState(null);
  const { url, token } = useContext(StoreContext);
  const { orderId } = route.params;

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`${url}/api/order/${orderId}`, {
        headers: { token },
      });
      setOrder(response.data.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    if (token && orderId) {
      fetchOrderDetail();
    }
  }, [token, orderId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Chi tiết đơn hàng</Text>
        <View style={styles.detailCard}>
          <View style={styles.titleContainer}>
            <Text style={styles.detailTitle}>Thông tin giao hàng</Text>
            {order.status == "Đã hủy" ? (
              <Text style={{ color: "red", fontSize: 15, fontWeight: "500" }}>
                {order.status}
              </Text>
            ) : (
              <Text style={{ color: "green", fontSize: 15, fontWeight: "500" }}>
                {order.status}
              </Text>
            )}
          </View>
          {order.type === "Trực tiếp" ? (
            <>
              <Text style={styles.detailText}>
                Tên: {order.address.fullname}
              </Text>
              <Text style={styles.detailText}>
                Số điện thoại: {order.address.phone}
              </Text>
              <Text style={styles.detailText}>
                Địa chỉ: {order.address.address}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.detailText}>
                Tên: {order.address.firstName} {order.address.lastName}
              </Text>
              <Text style={styles.detailText}>
                Số điện thoại: {order.address.phone}
              </Text>
              <Text style={styles.detailText}>
                Địa chỉ: {order.address.street}, {order.address.commune},{" "}
                {order.address.district}, {order.address.city}
              </Text>
            </>
          )}
        </View>
        <View style={styles.itemsContainer}>
          <Text style={styles.detailTitle}>Sản phẩm</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image
                source={{ uri: `${url}/images/${item.images[0].filename}` }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>
                  Số lượng: {item.quantity}
                </Text>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalAmount}>
          Thành tiền: {formatPrice(order.amount)}
        </Text>
        <Text style={styles.orderType}>
          Phương thức thanh toán: {order.type}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Trở về</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginTop: 30
  },
  detailCard: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemsContainer: {
    margin: 10,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 15,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  itemQuantity: {
    color: "#666",
    marginBottom: 5,
  },
  itemPrice: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  footer: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  orderType: {
    fontSize: 16,
    marginVertical: 14,
    fontWeight: "600",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrderDetail;
