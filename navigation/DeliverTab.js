import React, { useState } from 'react';
import { View, StyleSheet, Image, Platform, StatusBar, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const productList = [
  {
    id: "1",
    name: "Áo thun trắng",
    store: "Fashion Shop",
    status: false,
    amount: 2,
    price: 50000,
    totalAmount: 100000,
    image: require("../assets/images/laptop1.jpg"),
  },
  {
    id: "2",
    name: "Áo thun trắng",
    store: "Fashion Shop",
    status: true,
    amount: 2,
    price: 50000,
    totalAmount: 100000,
    image: require("../assets/images/laptop1.jpg"),
  },
  {
    id: "3",
    name: "Áo thun trắng",
    store: "Fashion Shop",
    status: true,
    amount: 2,
    price: 50000,
    totalAmount: 100000,
    image: require("../assets/images/laptop1.jpg"),
  },
  {
    id: "4",
    name: "Áo thun trắng",
    store: "Fashion Shop",
    status: true,
    amount: 2,
    price: 50000,
    totalAmount: 100000,
    image: require("../assets/images/laptop1.jpg"),
  },
  {
    id: "5",
    name: "Áo thun trắng",
    store: "Fashion Shop",
    status: true,
    amount: 2,
    price: 50000,
    totalAmount: 100000,
    image: require("../assets/images/laptop1.jpg"),
  },
];

const labels = ["Đơn hàng đã đặt", "Đã xác nhận thông tin thanh toán", "Chờ lấy hàng", "Đang giao", "Đánh giá"];
const customStyles = {
    stepIndicatorSize: 35,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#38B6FF',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#38B6FF',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#38B6FF',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#38B6FF',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#38B6FF',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'

};
const Dash = () => {
    return (
        <View
            style={[
                { width: '100%', backgroundColor: 'white', height: 1 },
            ]}></View>
    );
};

const ProductItem = ({ item }) => {
    return (
        <View style={[styles.itemContainer]}>
            {/* <View>
              <Text style={styles.storeName}>Fashion Shop</Text>

          </View> */}
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{
                    width: '25%',
                    height: 80,

                }}>
                    <Image source={require('../assets/images/laptop1.jpg')}
                        style={styles.productImage} />

                </View>
                <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                        <Text style={styles.productName}>{item.store}</Text>
                        <Text style={[styles.productName, { marginTop: 10, color: '#00000080' }]}>Space Grey  |  32GB  |  1TB</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'right', }}>x{item.amount}</Text>
                        <Text style={{ color: '#00000080' }}>{item.price}</Text>
                    </View>
                    {/* <Text style={{ textAlign: 'right', color: '#f44336' }}>Thành tiền: {item.totalAmount}</Text> */}
                    {/* <Text style={styles.completedText}>Đơn hàng đã hoàn thành</Text> */}
                </View>
            </View>
            {/* <TouchableOpacity style={[ styles.reBuyButton,{}]}>
              <Text style={styles.reBuyText}>Mua Lại</Text>
          </TouchableOpacity> */}

        </View>
    );
};
const DeliverTab = () => {
    const [currentStep, setCurrentStep] = useState(4);

    const renderStepIndicator = (params) => {
        const icons = [
            require('../assets/icons/order.png'),
            require('../assets/icons/wallet.png'),
            require('../assets/icons/package.png'),
            require('../assets/icons/tracking.png'),
            require('../assets/icons/star.png')
        ];
        const iconName = icons[params.position];
        return <Image source={iconName} style={{ width: 20, height: 20 }} />;
    };

    return (
        <View style={styles.container}>
                <View style={{ marginTop: '10%' }}>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={currentStep}
                        labels={labels}
                        stepCount={5}
                        renderStepIndicator={renderStepIndicator}

                    />
                </View>
                <FlatList
                    data={productList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProductItem item={item} />}
                    style={{ maxHeight: '60%', minHeight: '40%' }}
                />
                <Dash />
                <View style={{ width: '100%', flexDirection: 'row', height: '24%', marginHorizontal: 10, marginBottom: 20 }}>
                    <View style={{ width: '50%', }}>
                        <View style={{ height: '50%' }}>
                            <Text style={styles.foot}>Payment</Text>
                            <Text style={{ color: '#00000080' }}>Visa</Text>
                        </View>
                        <Dash />
                        <View style={{ height: '50%' }}>
                            <Text style={styles.foot}>Need help</Text>
                            <Text style={{ color: '#00000080' }}>Order issue</Text>
                            <Text style={{ color: '#00000080' }}>Delivery Info</Text>
                            <Text style={{ color: '#00000080' }}>Returns</Text>
                        </View>
                    </View>

                    <View style={{ width: '50%' }}>
                        <View style={{ height: '50%' }}>
                            <Text style={styles.foot}>Delivery</Text>
                            <Text style={{ color: '#00000080' }}>Address</Text>
                            <Text style={{ color: '#00000080' }}>Binh Thanh, TP HCM</Text>
                            <Text style={{ color: '#00000080' }}>Binh Thanh, TP HCM</Text>
                        </View>
                        <Dash />
                        <View style={{ height: '50%' }}>
                            <Text style={styles.foot}>Order Sumary</Text>
                            <Text style={{ color: '#00000080' }}>Discount</Text>
                            <Text style={{ color: '#00000080' }}>Delivery</Text>
                            <Text style={{ color: '#00000080' }}>Tax</Text>
                            <Text style={{ color: '#00000080' }}>Total</Text>
                        </View>
                    </View>
                </View>
        </View>
    );
};


export default DeliverTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    itemContainer: {
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: 10,
    },
    productImage: {
        resizeMode: 'cover',
        flex: 1,
        width: null,
        height: null,
        borderRadius: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: '700',
    },
    storeName: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: -0.14,
    },
    foot: {
        color: '#000000',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.14,
    },
    completedText: {
        color: 'green',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 22,
    },
    pendingText: {
        color: 'red',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 22,
    },
    reBuyButton: {
        borderWidth: 2,
        borderColor: '#38B6FF',
        backgroundColor: '#38B6FF',
        borderRadius: 10,
        width: 86,
        height: 30,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    reBuyText: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.16,
        textAlign: 'center',
        color: '#ffffff'
    },
});
