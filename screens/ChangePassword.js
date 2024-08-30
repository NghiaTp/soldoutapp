import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { StoreContext } from "@/context/StoreContext";
import { useNavigation } from "expo-router";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { url } = useContext(StoreContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/auth/change-password`, {
        email,
        oldPassword,
        newPassword,
        confirmNewPassword,
      });

      if (response.data.success) {
        Alert.alert("Success", response.data.message);
        setEmail("");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        navigation.navigate('HomeScreen')
      } else {
        Alert.alert("Error", response.data.error);
      }
    } catch (err) {
      Alert.alert("Error", "An error occurred while changing the password.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Đổi mật khẩu</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập email của bạn"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Old Password:</Text>
          <TextInput
            style={styles.input}
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder="Nhập mật khẩu cũ"
            secureTextEntry
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>New Password:</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm New Password:</Text>
          <TextInput
            style={styles.input}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 32,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ChangePassword;
