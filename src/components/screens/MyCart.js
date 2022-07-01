import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {COLOURS, Items} from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {removeFromCart} from '../store/reducers/CartReducer';
import {useDispatch} from 'react-redux';

const MyCart = ({navigation}) => {
  const cartItemIds = useSelector(state => state.cartItems.ids);

  const dispatch = useDispatch();

  const cartItems = Items.filter(item => cartItemIds.includes(item.id));
  console.log(cartItems);

  let total = 0;

  cartItems.forEach(product => {
    total = total + product.productPrice;
  });
  console.log(total);

  //remove iten from cart
  const removeItemFromCart = itemId => {
    dispatch(removeFromCart({id: itemId}));
  };

  const renderProducts = item => {
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => navigation.navigate('ProductInfo', {productID: item.id})}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={item.productImage}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {item.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}>
                &#8377;{item.productPrice}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => removeItemFromCart(item.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLOURS.white,
          position: 'relative',
        }}>
        <ScrollView>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingTop: 16,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.backgroundLight,
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
              }}>
              Order Details
            </Text>
            <View></View>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 20,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            My Cart
          </Text>
          <View style={{paddingHorizontal: 16}}>
            {cartItems ? cartItems.map(renderProducts) : null}
          </View>
          <View>
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 40,
                marginBottom: 80,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}>
                Order Info
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLOURS.black,
                    opacity: 0.8,
                  }}>
                  &#8377;{total}.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 22,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}>
                  Shipping Tax
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: COLOURS.black,
                    opacity: 0.8,
                  }}>
                  &#8377;{total / 20}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: COLOURS.black,
                  }}>
                  &#8377;{total + total / 20}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            height: '8%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: '86%',
              height: '90%',
              backgroundColor: COLOURS.blue,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                letterSpacing: 1,
                color: COLOURS.white,
                textTransform: 'uppercase',
              }}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyCart;
