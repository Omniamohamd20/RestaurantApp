/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Badge, NativeBaseProvider} from 'native-base';
import {color, backgroundColor, emptyStarColor} from '../tasks/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('screen');
import NetInfo from '@react-native-community/netinfo';

import axios from 'axios';
export default class RestaurantFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
      foods: {},
      arr: [],
      loading: true,
      numOfItems: 0,
      network: false,
    };
  }

  // ComponentWillUmount:

  componentWillUnmount() {
    let ref = this.props.route.params.referish;
    ref();
    this.net();
  }

  async componentDidMount() {
    this.getdataFromAxois();
    this.net();
  }

  getdataFromAxois() {
    this.setState({loading: true});
    let dataToSend = {
      categoriesId: this.props.route.params.id,
    };
    axios
      .post('http://192.168.1.7/api/FoodsAndDetails.php', dataToSend)
      .then(res => {
        if (res.status == 200) {
          if (res.data == 'Error') {
            alert('try again');
          } else if (typeof res.data === typeof []) {
            this.setState({food: res.data});
            this.getData();
          } else {
            alert('try again');
          }
        } else {
          alert('try again');
        }
        this.setState({loading: false});
      });
  }
  net() {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.setState({network: true, loading: true});
      } else {
        this.setState({network: false, loading: false});
      }
    });
  }

  getData = async () => {
    let arr = await AsyncStorage.getItem('arr');
    arr = JSON.parse(arr);
    arr = arr == null ? [] : arr;

    let foods = this.props.navigation.getParam('foods');
    let newArr = this.state.food;
    for (let i = 0; i < newArr.length; i++) {
      let count = 0;
      for (let y = 0; y < arr.length; y++) {
        if (newArr[i].food_id == arr[y].food_details.food_id) {
          count = arr[y].count;
          break;
        }
      }

      newArr[i].count = count;
    }
    this.setState({food: newArr, foods: foods});

    this.setState({
      arr,
    });
  };

  async check(index) {
    let data = this.state.food;
    let data2 = this.state.arr;
    for (var i = 0; i < data2.length; i++) {
      if (data2[i].id == data[index].id) {
        data2[i].count = data[index].count;
        break;
      }
    }

    if (i == data2.length) {
      data2.push(data[index]);
    }

    this.setState({food: data, arr: data2});
    await AsyncStorage.setItem('arr', JSON.stringify(this.state.arr));
  }

  plusFun(index) {
    let data = this.state.food;
    data[index].count += 1;
    this.setState({food: data});
  }
  subtractFun(index) {
    let data = this.state.food;

    if (data[index].count > 0) {
      data[index].count -= 1;
    } else {
    }
    this.setState({food: data});
  }

  async goToCart() {
    this.props.navigation.navigate('Cart', {
      referish: this.getData,
    });
  }

  searchfun(value) {
    let newarr = this.state.food;
    let counter = 0;
    for (let i = 0; i < newarr.length; i++) {
      if (newarr[i].food_name.includes(value.toUpperCase().trim())) {
        newarr[i].food_show = 1;
      } else {
        newarr[i].food_show = 0;

        counter++;
      }

      this.setState({food: newarr, numOfItems: counter});
    }
  }

  render() {
    return (
      <>
        <View
          style={{
            backgroundColor: color,
            flex: 1,
            width: '100%',
          }}>
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
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: backgroundColor,
                    marginTop: 5,
                    marginLeft: 20,
                  }}>
                  {this.state.foods.categories_name}
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
                placeholder={'البحث بإسم الطعام'}
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
                backgroundColor: backgroundColor,
                marginTop: 10,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <ScrollView>
                {this.state.loading ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator
                      size={50}
                      color={color}
                      style={{marginTop: height * 0.3}}
                    />
                  </View>
                ) : this.state.numOfItems != this.state.food.length ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      //   marginTop: '1%',
                      marginBottom: '1%',
                      marginRight: '1%',
                      marginTop: 10,
                      flexWrap: 'wrap',
                    }}>
                    {this.state.food.map((list, index) =>
                      list.food_show == 1 ? (
                        <TouchableOpacity
                          onPress={async () => {
                            this.props.navigation.navigate('FoodDetails', {
                              details: list,
                              referish: this.getData,
                            });
                          }}
                          key={index}
                          style={{
                            width: '45%',
                            backgroundColor: backgroundColor,
                            borderRadius: 10,
                            // shadowColor: '#000',
                            // shadowOpacity: 10,
                            elevation: 2,
                            marginLeft: 13,
                            marginBottom: 10,
                          }}>
                          <Image
                            source={{uri: list.food_image}}
                            style={{
                              width: '100%',
                              height: 100,
                              borderTopRightRadius: 10,
                              borderTopLeftRadius: 10,
                            }}
                          />

                          <View
                            style={{
                              alignSelf: 'center',
                              width: '90%',
                              padding: 2,
                            }}>
                            <Text
                              numberOfLines={2}
                              style={{
                                fontSize: 16,
                                marginTop: 5,
                                textAlign: 'center',
                                marginBottom: 3,
                                color: '#000',
                              }}>
                              {list.food_name}
                            </Text>

                            <View style={{justifyContent: 'center'}}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  color: color,
                                  textAlign: 'left',
                                  alignSelf: 'center',
                                }}>
                                {list.food_price} جنية
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
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
                        لم يم اضافة الوجبات في هذا القسم بعد{' '}
                      </Text>
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                // flex: 1,
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
