import { createContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [profile, setProfile] = useState({});
  const [url] = useState("http://172.16.88.130:8010");
  const [token, setToken] = useState("");
  const [product_list, setProductList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [saleProduct, setSaleProduct] = useState([]);
  const [phoneProduct, setPhoneProduct] = useState([]);
  const [laptopProduct, setLaptopProduct] = useState([]);
  const [tabletProduct, setTabletProduct] = useState([]);

  const handleTokenError = async (error) => {
    if (error.response && error.response.status === 401) {
      Alert.alert(
        "Session Expired",
        "Your session has expired. Please log in again.",
        [
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.removeItem("token");
              setToken("");
            },
          },
        ]
      );
    } else {
      console.error("An error occurred:", error);
    }
  };

  const addToCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        handleTokenError(error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => {
      const newCartItem = { ...prev };
      if (newCartItem[itemId] > 0) {
        newCartItem[itemId] -= 1;
      }
      return newCartItem;
    });
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        handleTokenError(error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = product_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchDataProducts = useCallback(async () => {
    try {
      const response = await axios.get(url + "/api/product/list");
      if (response.data && response.data.data) {
        const productsWithImages = response.data.data.map((product) => ({
          ...product,
          images: product.images.map((image) => ({
            ...image,
            url: `${url}/images/${image.filename}`,
          })),
        }));
        setProductList(productsWithImages);
      }
    } catch (error) {
      handleTokenError(error);
    }
  }, [url]);

  const loadCartData = useCallback(
    async (token) => {
      try {
        const response = await axios.post(
          url + "/api/cart/get",
          {},
          { headers: { token } }
        );
        if (response.data && response.data.cartData) {
          setCartItem(response.data.cartData);
        }
      } catch (error) {
        handleTokenError(error);
      }
    },
    [url]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchDataProducts();
        await fetchDataSaleProducts();
        await fetchPhoneProduct();
        await fetchLaptopProduct();
        await fetchTabletProduct();
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          await loadCartData(storedToken);
        }

        const savedFavorites = await AsyncStorage.getItem("favoriteProduct");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, [fetchDataProducts, loadCartData]);

  const addToFavorites = async (product) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, product];
      AsyncStorage.setItem(
        "favoriteProduct",
        JSON.stringify(updatedFavorites)
      ).catch((error) => {
        console.error("Error saving favorites:", error);
      });
      return updatedFavorites;
    });
  };

  const removeFromFavorites = async (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (product) => product._id !== productId
      );
      AsyncStorage.setItem(
        "favoriteProduct",
        JSON.stringify(updatedFavorites)
      ).catch((error) => {
        console.error("Error removing favorites:", error);
      });
      return updatedFavorites;
    });
  };

  const fetchDataSaleProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/api/product/status?status=Giảm giá`
      );
      const productsWithImages = response.data.data.map((sale_product) => ({
        ...sale_product,
        images: sale_product.images.map((image) => ({
          ...image,
          url: `${url}/images/${image.filename}`,
        })),
      }));
      setSaleProduct(productsWithImages);
    } catch (error) {
      handleTokenError(error);
    }
  }, [url]);

  const fetchPhoneProduct = async () => {
    try {
      const response = await axios.get(
        `${url}/api/product/products/category?category=Điện thoại`
      );
      if (response.data.success) {
        setPhoneProduct(response.data.data);
      } else {
        Alert.alert("Không thể tải danh sách");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLaptopProduct = async () => {
    try {
      const response = await axios.get(
        `${url}/api/product/products/category?category=Laptop`
      );
      if (response.data.success) {
        setLaptopProduct(response.data.data);
      } else {
        Alert.alert("Không thể tải danh sách");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTabletProduct = async () => {
    try {
      const response = await axios.get(
        `${url}/api/product/products/category?category=Tablet`
      );
      if (response.data.success) {
        setTabletProduct(response.data.data);
      } else {
        Alert.alert("Không thể tải danh sách");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const contextValue = {
    product_list,
    url,
    addToCart,
    removeFromCart,
    cartItem,
    getTotalCartAmount,
    token,
    setToken,
    fetchDataProducts,
    addToFavorites,
    removeFromFavorites,
    favorites,
    saleProduct,
    phoneProduct,
    tabletProduct,
    laptopProduct
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
