import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import ProductListItem from "@/components/ItemList/ProductListItem"; // Adjust import path as necessary
import axios from "axios";
import { StoreContext } from "@/context/StoreContext";

// import { product_data } from "@/data/data"; // Adjust import path as necessary
// import AxiosInstance from "@/helper/AxiosInstance";

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {url, product_list} = useContext(StoreContext);
  // const url = "http://172.16.88.188:8010";
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Image
            source={require("../assets/images/back_arrow_icon.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Sản Phẩm Tiêu Biểu</Text>
        <TouchableOpacity style={styles.btnCart}>
          <Image
            source={require("../assets/images/cart.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={product_list}
        renderItem={({ item, index }) => <ProductListItem item={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#38B6FF",
    marginBottom: 20,
  },
  headerIcon: {
    width: 35,
    height: 35,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
});

export default ProductListScreen;
