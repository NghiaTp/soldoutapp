import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useNavigation } from "expo-router";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { url } = useContext(StoreContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoryResponse, brandResponse] = await Promise.all([
          axios.get(`${url}/api/categories/categories-list`),
          axios.get(`${url}/api/categories/brands-list`),
        ]);
        setCategories(categoryResponse.data.data);
        setBrands(brandResponse.data.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, [url]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCategory, selectedBrand]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/product/search`, {
        params: {
          search: searchTerm,
          category: selectedCategory,
          brand: selectedBrand,
        },
      });

      setResults(response.data.data);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setSearchTerm("");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={styles.filtersContainer}>
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Danh mục</Text>
          <View style={styles.filterList}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category._id}
                onPress={() => handleCategoryClick(category.name)}
                style={[
                  styles.filterItem,
                  selectedCategory === category.name && styles.activeFilter,
                ]}
              >
                <Image
                  source={{ uri: `${url}/${category.image}` }}
                  style={styles.filterImage}
                />
                <Text>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Hãng</Text>
          <View style={styles.filterList}>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand._id}
                onPress={() => handleBrandClick(brand.name)}
                style={[
                  styles.filterItem,
                  selectedBrand === brand.name && styles.activeFilter,
                ]}
              >
                <Image
                  source={{ uri: `${url}/${brand.image}` }}
                  style={styles.filterImage}
                />
                <Text>{brand.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={clearFilters}
        style={styles.clearFiltersButton}
      >
        <Text style={styles.clearFiltersText}>Xóa bộ lọc</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            !loading && (
              <Text style={styles.noResultsText}>
                Không có sản phẩm nào phù hợp với lựa chọn của bạn.
              </Text>
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() =>
                navigation.navigate("ProductDetail", { id: item._id })
              }
            >
              <Image
                source={{ uri: `${url}/images/${item.images[0].filename}` }}
                style={styles.resultImage}
              />
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text
                  style={item.salePrice ? styles.originalPrice : styles.price}
                >
                  {formatPrice(item.price)}
                </Text>
                {item.salePrice && (
                  <Text style={styles.salePrice}>
                    {formatPrice(item.salePrice)}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 30
  },
  searchInput: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 20,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },
  filterImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: "#007bff",
    borderColor: "#0056b3",
    color: "#fff",
  },
  clearFiltersButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 6,
  },
  clearFiltersText: {
    color: "#fff",
    textAlign: "center",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  resultImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 6,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  salePrice: {
    fontSize: 16,
    color: "#e53935",
    fontWeight: "bold",
  },
  noResultsText: {
    textAlign: "center",
    color: "#333",
    fontSize: 16,
  },
});

export default SearchScreen;
