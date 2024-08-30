import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { StoreContext } from "@/context/StoreContext";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const { url } = useContext(StoreContext);
  const { userInfo } = useUser();
  const { userId } = useLocalSearchParams();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${url}/api/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin hồ sơ người dùng:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);

      if (user.avatar) {
        formData.append("avatar", {
          uri: user.avatar,
          type: "image/jpeg",
          name: "avatar.jpg",
        });
      }

      await axios.put(`${url}/api/user/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Cập nhật hồ sơ thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      alert("Cập nhật hồ sơ không thành công");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, avatar: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, avatar: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{alignItems: 'center', justifyContent: 'center',marginHorizontal:50, marginVertical: 40, fontWeight: '700', fontSize: 30}}>Thông tin tài khoản</Text>
      <View style={{justifyContent: 'center'}}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              user.avatar
                ? { uri: `${url}/${user.avatar}` }
                : { uri: `${url}/${userInfo.avatar}` }
            }
            style={styles.avatar}
          />
          <View style={styles.imageButtons}>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Chọn Ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={styles.button}>
              <Text style={styles.buttonText}>Chụp Ảnh</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
          placeholder="Tên"
        />
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          placeholder="Email"
          keyboardType="email-address"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={user.phone}
          onChangeText={(text) => setUser({ ...user, phone: text })}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
        />

        <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Cập Nhật Hồ Sơ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  imageButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UserProfile;
