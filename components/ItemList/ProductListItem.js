import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { StoreContext } from "@/context/StoreContext";
import { useNavigation } from "@react-navigation/native";

const ProductListItem = ({ item, index }) => {
  const { category } = item;
  const { url } = useContext(StoreContext);
  const navigation = useNavigation();

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`;
  };

  const isSale = item.salePrice && item.salePrice < item.price;

  return (
    <View style={styles.productContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { id: item._id })}
      >
        <View style={styles.product}>
          {isSale && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleText}>{item.discountPercentage}%</Text>
            </View>
          )}
          <Image
            source={{ uri: `${url}/images/${item.images[0].filename}` }}
            style={styles.productImage}
          />

          <Text style={styles.productName}>{item.name}</Text>
          {isSale ? (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>
                {formatPrice(item.price)}
              </Text>
              <Text style={styles.salePrice}>
                {formatPrice(item.salePrice)}
              </Text>
            </View>
          ) : (
            <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },

  productPrice: {
    fontSize: 14,
    color: "#FF5733",
    marginRight: 5,
  },

  productContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },

  product: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 170,
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
});
