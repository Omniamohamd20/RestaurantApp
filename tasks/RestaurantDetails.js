/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
const {width, height} = Dimensions.get('window');
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Badge, NativeBaseProvider} from 'native-base';
import NetInfo from '@react-native-community/netinfo';

import Swiper from 'react-native-swiper';
import {color, backgroundColor} from './Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class RestaurantDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: this.props.route.params.foods,
      arr: [],
      restaurant_imgSwiper: [],
      network: false,
    };
  }

  openWhatsApp = () => {
    Linking.openURL(
      'https://wa.me/<' + this.state.foods.restaurant_mobileNumber + '>',
    );
  };
  openPhoneCalls = () => {
    Linking.openURL(`tel:${this.state.foods.restaurant_mobileNumber}`);
  };
  openFacebook = () => {
    Linking.openURL(
      'https://www.facebook.com/' + this.state.foods.restaurant_link,
    );
  };

  componentDidMount() {
    this.getData();
    this.net();
  }
  componentWillUnmount() {
    this.net();
  }

  getData = async () => {
    let arr = await AsyncStorage.getItem('arr');
    arr = JSON.parse(arr);
    arr = arr == null ? [] : arr;
    let foods = this.props.route.params.foods;
    let img = foods.img;
    this.setState({foods: foods, img: img});
    this.setState({
      arr,
    });
  };

  async goToCart() {
    this.props.navigation.navigate('Cart', {
      referish: this.getData,
    });
  }

  net() {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.setState({network: true});
      } else {
        this.setState({network: false});
      }
    });
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={color} />
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: color,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              backgroundColor: color,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <View
              style={{
                marginBottom: 40,
                marginTop: 20,
                alignItems: 'center',
                marginLeft: 20,
                width: width * 0.8,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: backgroundColor,
                  marginTop: 5,
                }}>
                {this.state.foods.restaurant_name}
              </Text>
              <TouchableOpacity
                style={{marginRight: 275, marginTop: -20}}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Icon
                  name={'chevron-right'}
                  size={20}
                  color={backgroundColor}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={async () => {
                  this.goToCart();
                }}>
                <NativeBaseProvider>
                  <Badge
                    style={{
                      backgroundColor: color,
                    }}>
                    <Text
                      style={{
                        color:
                          this.state.arr.length == 0 ? color : backgroundColor,
                        marginBottom: -10,
                      }}>
                      {this.state.arr.length}
                    </Text>
                  </Badge>
                </NativeBaseProvider>
                <Icon
                  active
                  name="shopping-cart"
                  size={20}
                  color={backgroundColor}
                  style={{marginRight: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>

          {this.state.network ? (
            <View
              style={{
                width: '100%',
                flex: 1,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: -25,
                backgroundColor: backgroundColor,
              }}>
              <ScrollView>
                <Swiper
                  autoplay
                  autoplayTimeout={3}
                  showsButtons={true}
                  showsPagination={true}
                  height={240}
                  activeDotColor={color}
                  nextButton={
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: backgroundColor,
                        borderRadius: 30,
                        justifyContent: 'center',
                        // paddingBottom: 10,
                        paddingLeft: 5,
                        elevation: 2,
                      }}>
                      <Icon
                        name={'chevron-left'}
                        size={30}
                        color={color}
                        style={{
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  }
                  prevButton={
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: backgroundColor,
                        borderRadius: 30,
                        justifyContent: 'center',
                        // paddingBottom: 10,
                        paddingRight: 5,
                        elevation: 10,
                      }}>
                      <Icon
                        name={'chevron-right'}
                        size={30}
                        color={color}
                        style={{
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  }>
                  {this.state.foods.restaurant_imgSwiper.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        width: '90%',
                        borderRadius: 30,
                        height: 220,
                        alignSelf: 'center',
                        marginTop: '4%',
                        elevation: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{uri: item}}
                        style={{
                          width: '100%',
                          borderRadius: 10,
                          height: '100%',
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                  ))}
                </Swiper>

                <View style={styles.touchableOpacityStyle}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.textStyle}>مواعيد العمل : </Text>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        marginTop: 10,
                        color: '#000',
                      }}>
                      {' '}
                      {this.state.foods.restaurant_active}
                    </Text>
                  </View>
                </View>

                <Text style={styles.textStyle}>الوصف</Text>
                <Text style={styles.textStyle1}>
                  {this.state.foods.restaurant_description}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('RestaurantSections', {
                      foods: this.state.foods,
                      referish: this.getData,
                    });
                  }}
                  style={styles.touchableOpacityStyle1}>
                  <Text
                    style={{
                      fontSize: 22,
                      marginTop: 10,
                      textAlign: 'center',
                      color: backgroundColor,
                      fontWeight: 'bold',
                    }}>
                    الاقسام
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                    marginTop: 20,
                  }}>
                  <Text style={{fontSize: 20, fontWeight: '400'}}>للتواصل</Text>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      marginTop: 5,
                    }}
                    activeOpacity={0.9}
                    onPress={this.openPhoneCalls}>
                    <Icon name="phone" size={22} color={'#4267B2'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{marginLeft: 15}}
                    activeOpacity={0.9}
                    onPress={this.openWhatsApp}>
                    <Icon name="whatsapp" size={27} color={color} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={this.openFacebook}>
                    <Icon name="facebook" size={27} color="#4267B2" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      this.props.navigation.navigate('RestaurantPlace');
                    }}
                    style={{
                      // marginTop: 3,
                      marginLeft: 20,
                      height: height * 0.04,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 30,
                    }}>
                    <Icon name="map-marker-alt" size={24} color={color} />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: backgroundColor,
                marginTop: -30,
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
              }}>
              <View style={{flex: 1, marginTop: 100, alignSelf: 'center'}}>
                <Image
                  source={require('../image/offline.png')}
                  resizeMode="contain"
                  style={{width: 300, height: 300}}
                />
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  لا يوجد اتصال{' '}
                </Text>
              </View>
            </View>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    backgroundColor: backgroundColor,
    marginTop: 20,
    marginLeft: '5%',
    borderRadius: 10,
    width: '90%',
    height: 50,
    // shadowOffset: { width: 5, height: 5 },
    // shadowColor: '#000',
    // shadowOpacity: 10,
    elevation: 20,
  },
  touchableOpacityStyle1: {
    backgroundColor: color,
    marginTop: 10,
    borderRadius: 10,
    width: '40%',
    height: 50,
    alignSelf: 'center',
  },
  textStyle: {
    marginLeft: 20,
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#03041d',
  },
  textStyle1: {
    marginLeft: 25,
    fontSize: 19,
    marginTop: 5,
    paddingRight: 10,
    alignSelf: 'center',
    color: '#03041d',
  },
});
