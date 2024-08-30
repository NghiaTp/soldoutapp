import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/StoreContext";
import axios from "axios";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const PrepareOrderScreen = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);
  const navigation = useNavigation()

  const fetchOrders = async (status = "Đang chuẩn bị đơn") => {
    try {
      const response = await axios.post(
        `${url}/api/order/user-orders`,
        { status },
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Đang chuẩn bị đơn</Text>
      {data.map((order, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', {orderId:order._id})}>
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={[styles.statusText]}>{order.status}</Text>
                <Text style={styles.dateText}>{order._id}</Text>
              </View>
              {order.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.itemContainer}>
                  <Image
                    source={{ uri: `${url}/images/${item.images[0].filename}` }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>
                      Số lượng: {item.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {formatPrice(item.price)}
                    </Text>
                  </View>
                </View>
              ))}
              <View style={styles.orderFooter}>
                <Text style={styles.totalItems}>
                  Số lượng sản phẩm: {order.items.length}
                </Text>
                <Text style={styles.totalAmount}>
                  Thành tiền: {formatPrice(order.amount)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default PrepareOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  orderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dateText: {
    color: "#666",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
  orderFooter: {
    padding: 15,
  },
  totalItems: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
