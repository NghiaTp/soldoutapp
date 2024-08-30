import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StoreContext } from "../context/StoreContext";

const ListLaptopProduct = ({ navigation }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const { url, laptopProduct } = useContext(StoreContext);

  useEffect(() => {
    let result = [...laptopProduct];

    if (selectedBrand !== "Tất cả") {
      result = result.filter((product) => product.brand === selectedBrand);
    }

    if (showOnlySale) {
      result = result.filter((product) => product.status === "Giảm giá");
    }

    switch (sortOption) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [laptopProduct, sortOption, showOnlySale, selectedBrand]);

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  const toggleShowOnlySale = () => {
    setShowOnlySale(!showOnlySale);
  };

  const brands = [
    "Tất cả",
    ...new Set(laptopProduct.map((product) => product.brand)),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Các sản phẩm Laptop</Text>
      <View style={styles.filterOptions}>
        <Picker
          selectedValue={sortOption}
          style={styles.picker}
          onValueChange={handleSortChange}
        >
          <Picker.Item label="Sắp xếp mặc định" value="default" />
          <Picker.Item label="Giá tăng dần" value="priceAsc" />
          <Picker.Item label="Giá giảm dần" value="priceDesc" />
        </Picker>
        <Picker
          selectedValue={selectedBrand}
          style={styles.picker}
          onValueChange={handleBrandChange}
        >
          {brands.map((brand) => (
            <Picker.Item key={brand} label={brand} value={brand} />
          ))}
        </Picker>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            isChecked={showOnlySale}
            onPress={toggleShowOnlySale}
            fillColor="#ff6f61"
            unfillColor="#CFCFCF"
            text="Chỉ hiện sản phẩm đang giảm giá"
            iconStyle={{ borderColor: "#ff6f61" }}
            textStyle={{ fontSize: 16 }}
          />
        </View>
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() =>
              navigation.navigate("ProductDetail", { id: item._id })
            }
          >
            <Image
              source={{ uri: `${url}/images/${item.images[0].filename}` }}
              style={styles.productImage}
            />
            {item.status === "Giảm giá" && (
              <View style={styles.saleBadge}>
                <Text>{item.discountPercentage}%</Text>
              </View>
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              {item.status === "Giảm giá" ? (
                <View>
                  <Text style={styles.salePrice}>
                    {formatPrice(item.salePrice)}
                  </Text>
                  <Text style={styles.originalPrice}>
                    {formatPrice(item.price)}
                  </Text>
                </View>
              ) : (
                <Text style={styles.productPrice}>
                  {formatPrice(item.price)}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterOptions: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  picker: {
    height: 50,
    width: "48%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  productItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    position: "relative",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
  },
  saleBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    color: "white",
    padding: 5,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "black",
  },
  salePrice: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
  originalPrice: {
    fontSize: 16,
    color: "#888",
    textDecorationLine: "line-through",
  },
});

export default ListLaptopProduct;
