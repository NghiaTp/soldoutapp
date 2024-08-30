import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item, index}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.products}>
      <TouchableOpacity
        style={styles.product}
        onPress={() => navigation.navigate("ProductDetail", {productId: item.id})}
      >
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  products: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 10,
    flexWrap: "wrap",
  },
  product: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 180
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10, // Bo góc các cạnh
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 14,
    color: "#000",
  },
});
