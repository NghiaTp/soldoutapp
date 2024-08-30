import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import ProductListItem from "@/components/ItemList/ProductListItem";
import { Picker } from "@react-native-picker/picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StoreContext } from "@/context/StoreContext";

const ProductListScreen = ({ navigation }) => {
  const { url, product_list } = useContext(StoreContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");

  useEffect(() => {
    let result = [...product_list];

    if (selectedBrand !== "Tất cả") {
      result = result.filter((product) => product.brand === selectedBrand);
    }

    if (selectedCategory !== "Tất cả") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
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
  }, [product_list, sortOption, showOnlySale, selectedBrand, selectedCategory]);

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const toggleShowOnlySale = () => {
    setShowOnlySale(!showOnlySale);
  };

  const brands = [
    "Tất cả",
    ...new Set(product_list.map((product) => product.brand)),
  ];

  const categories = [
    "Tất cả",
    ...new Set(product_list.map((product) => product.category)),
  ];

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
            style={styles.cartIcon}
          />
        </TouchableOpacity>
      </View>
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
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            isChecked={showOnlySale}
            onPress={toggleShowOnlySale}
            fillColor="#ff6f61"
            unfillColor="#FFFFFF"
            text="Chỉ hiện sản phẩm đang giảm giá"
            iconStyle={{ borderColor: "#ff6f61" }}
            textStyle={{ fontSize: 16 }}
          />
        </View>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductListItem item={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5F5F5",
    marginTop: 25
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerIcon: {
    width: 25,
    height: 25,
  },
  btnCart: {
    padding: 5,
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default ProductListScreen;
