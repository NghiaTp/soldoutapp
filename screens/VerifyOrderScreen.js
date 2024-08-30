import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const VerifyOrderScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require("@/assets/icons/icon.png")} style={styles.img}/>
        <Text style={{fontSize: 26, fontWeight: '700', color: 'white', letterSpacing: 0.4}}>Thanh toán thành công</Text>
        <Text style={styles.title}>Cảm ơn bạn đã mua hàng</Text>
        <Text style={styles.title}>SoldOut sẽ xem giao hàng nhanh nhất có thể.</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.btn, {backgroundColor: 'white'}]} onPress={() => navigation.navigate('OrderScreen')}>
          <Text style={[styles.text, {color: "#38B6FF"}]}>Xem lại đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, {borderWidth: 3, borderColor: 'white'}]} onPress={()=>navigation.navigate('HomeScreen')}>
          <Text style={[styles.text,{color: 'white'}]}>Trang chủ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOrderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#38B6FF",
    flex: 1,
    justifyContent: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginVertical:40,
    bottom: '10%'
  },
  img:{
    width: 200,
    height: 200,
    marginBottom: 20
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30
  },
  btn: {
    width: '80%',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.4
  },
  title: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.3
  }
});
