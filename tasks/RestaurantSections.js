/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Badge, NativeBaseProvider} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
const {width, height} = Dimensions.get('window');

import {color, backgroundColor, emptyStarColor} from '../tasks/Colors';
export default class RestaurantSections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: {
        categories: [],
      },
      arr: [],
      network: false,
      numOfItems: 0,
    };
  }

  componentWillUnmount() {
    let ref = this.props.route.params.referish;
    ref();
    this.net();
  }

  componentDidMount() {
    this.getData();
    this.net();
  }
  getData = async () => {
    let arr = await AsyncStorage.getItem('arr');

    arr = JSON.parse(arr);
    arr = arr == null ? [] : arr;
    let foods = this.props.route.params.foods;

    this.setState({
      foods: foods,
    });

    this.setState({
      arr,
    });
    // this.setState({ loading: false })
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
  searchfun(value) {
    let newarr = this.state.foods.categories;
    let counter = 0;

    for (let i = 0; i < newarr.length; i++) {
      if (newarr[i].categories_name.includes(value.toUpperCase().trim())) {
        newarr[i].categories_show = 1;
      } else {
        newarr[i].categories_show = 0;

        counter++;
      }

      this.setState({categories: newarr, numOfItems: counter});
    }
  }
  render() {
    return (
      <>
        <View style={{flex: 1, backgroundColor: '#27ae60', width: '100%'}}>
          <View>
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
                  width: width * 0.9,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    // textAlign: 'center',
                    fontWeight: 'bold',
                    color: backgroundColor,
                    marginTop: 5,
                    marginLeft: 20,
                  }}>
                  الأقسام
                </Text>
                <TouchableOpacity
                  style={{marginRight: 273, marginTop: -20}}
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
                            this.state.arr.length == 0
                              ? color
                              : backgroundColor,
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
                    style={{marginRight: 29}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                width: '90%',
                borderRadius: 5,
                flexDirection: 'row',
                backgroundColor: backgroundColor,
                marginTop: -30,
                marginLeft: 20,
              }}>
              <Icon
                name={'search'}
                color={emptyStarColor}
                size={19}
                style={{alignSelf: 'center', margin: 5, marginLeft: 10}}
              />

              <TextInput
                style={{
                  height: 45,
                  width: width * 0.89,
                  color: '#000',
                }}
                placeholder={'البحث بإسم القسم'}
                placeholderTextColor="#000000ad"
                onChangeText={value => {
                  this.searchfun(value);
                }}
              />
            </View>
          </View>

          {this.state.network ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                marginTop: 10,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <ScrollView style={{marginTop: '4%'}}>
                {/* {this.state.loading ?
                  (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <ActivityIndicator size={50} color={color} style={{ marginTop: height * 0.3 }} />
                    </View>)
                  : */}
                {this.state.numOfItems != this.state.foods.categories.length ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      flexWrap: 'wrap',
                      marginBottom: '1%',
                      marginRight: '1%',
                    }}>
                    {this.state.foods.categories.map((list, index) =>
                      list.categories_show == 1 ? (
                        <View
                          key={index}
                          style={{
                            backgroundColor: backgroundColor,
                            marginTop: 10,
                            borderRadius: 15,
                            width: '45%',
                            elevation: 2,
                            marginLeft: 13,
                          }}>
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.navigate('RestaurantFood', {
                                id: list.categories_id,
                                foods: list,
                                referish: this.getData,
                              });
                            }}>
                            <View>
                              <View>
                                <Image
                                  source={{uri: list.categories_image}}
                                  style={{
                                    width: '100%',
                                    height: 100,
                                    borderTopRightRadius: 10,
                                    borderTopLeftRadius: 10,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  padding: 10,
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    fontWeight: '500',
                                    color: '#000',
                                  }}>
                                  {list.categories_name}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null,
                    )}
                  </View>
                ) : (
                  <View style={{flex: 1}}>
                    <View
                      style={{flex: 1, marginTop: 100, alignSelf: 'center'}}>
                      <Image
                        source={require('../image/empty.png')}
                        resizeMode="contain"
                        style={{width: 300, height: 300}}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        لا يوجد مطاعم لعرضها{' '}
                      </Text>
                    </View>
                  </View>
                )}
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
