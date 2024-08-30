import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "@/context/StoreContext";

const FlashSale = () => {
  const { url, saleProduct } = useContext(StoreContext);
  const navigation = useNavigation();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderItem = ({ item: product }) => {
    const isSale = product.salePrice && product.salePrice < product.price;

    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          navigation.navigate("ProductDetail", { id: product._id })
        }
      >
        <View style={styles.product}>
          {isSale && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleText}>{product.discountPercentage}%</Text>
            </View>
          )}
          <Image
            source={{ uri: `${url}/images/${product.images[0].filename}` }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>{product.name}</Text>
          {isSale ? (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>
                {formatPrice(product.price)}
              </Text>
              <Text style={styles.salePrice}>
                {formatPrice(product.salePrice)}
              </Text>
            </View>
          ) : (
            <Text style={styles.productPrice}>
              {formatPrice(product.price)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flash Sale !!!</Text>
      <FlatList
        data={saleProduct}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#38B6FF",
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productContainer: {
    width: "48%",
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  product: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  saleBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  saleText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "column", 
    justifyContent: "center",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "line-through",
    marginBottom: 5,
  },
  salePrice: {
    fontSize: 14,
    color: "#FF5733",
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#FF5733",
    marginRight: 5,
  },
});

export default FlashSale;
