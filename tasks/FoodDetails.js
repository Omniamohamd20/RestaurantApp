/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {ListItem, Right, Left, Badge, NativeBaseProvider} from 'native-base';
// import RadioForm, { RadioButton, RadioButtonGroup } from 'react-native-paper';
import {color, backgroundColor, emptyStarColor} from '../tasks/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';
import NetInfo from '@react-native-community/netinfo';

export default class FoodDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adds: [
        {label: 'فول', value: false},
        {label: 'سلطه', value: false},
        {label: 'فول', value: false},
        {label: 'سلطه', value: false},
      ],
      details: {
        food_details: [],
      },
      arr: [],
      index: '',
      network: false,
      addsPrice: 0,
    };
  }
  componentWillUnmount() {
    let ref = this.props.route.params.referish;
    ref();
    // this.net()
  }
  async componentDidMount() {
    this.getData();
    this.net();
  }

  getData = async () => {
    let arr = await AsyncStorage.getItem('arr');
    arr = JSON.parse(arr);
    arr = arr == null ? [] : arr;
    let details = this.props.route.params.details;
    this.setState({details, arr});
  };

  changecheck(value, index) {
    let list = this.state.details.food_details;
    list[index].value = value + '';
    this.priceWithAdds(index);
    this.setState({food_details: list});
  }

  plusFun = () => {
    let data = this.state.details;

    data.count += 1;
    this.setState({details: data});
  };
  subtractFun = () => {
    let data = this.state.details;

    if (data.count > 0) {
      data.count -= 1;
    } else {
    }
    this.setState({details: data});
  };

  async goToCart() {
    this.props.navigation.navigate('Cart', {
      referish: this.getData,
    });
  }

  async check() {
    let details = this.props.route.params.details;

    let data2 = this.state.arr;
    for (var i = 0; i < data2.length; i++) {
      if (
        data2[i].food_id == details.food_id &&
        data2[i].food_price == details.food_price
      ) {
        data2[i].count = details.count;
        break;
      }
    }

    if (i == data2.length) {
      data2.push(details);
    }

    this.setState({details, arr: data2});
    await AsyncStorage.setItem('arr', JSON.stringify(this.state.arr));

    this.goToCart();
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

  priceWithAdds(index) {
    var sum = 0;
    let detail = this.state.details;
    let list = detail.food_details;
    let newPrice = detail.food_price;
    if (list[index].value == 'true') {
      sum = parseFloat(list[index].price) + parseFloat(detail.food_price);
      newPrice = sum;
      detail.food_price = newPrice;
      this.setState({details: detail});
    } else {
      sum = parseFloat(detail.food_price) - parseFloat(list[index].price);
      newPrice = sum;
      detail.food_price = newPrice;
      this.setState({details: detail});
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#27ae60', width: '100%'}}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            backgroundColor: color,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 19,
              marginTop: 25,
              marginBottom: 40,
              textAlign: 'center',
              fontWeight: 'bold',
              marginLeft: '30%',
              color: backgroundColor,
            }}>
            تفاصيل الطلب
          </Text>
          <TouchableOpacity
            onPress={async () => {
              this.goToCart();
            }}
            style={{
              marginLeft: '25%',
            }}>
            <NativeBaseProvider>
              <Badge
                style={{
                  backgroundColor: color,
                }}>
                <Text
                  style={{
                    color: this.state.arr.length == 0 ? color : backgroundColor,
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
            />
          </TouchableOpacity>
        </View>
        {this.state.network ? (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              marginTop: -30,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}>
            <ScrollView>
              <View
                style={{
                  height: 100,
                  marginTop: '4%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    width: '45%',
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}>
                  {this.state.details.food_name}
                </Text>
                <Image
                  source={{uri: this.state.details.food_image}}
                  style={{
                    width: '40%',
                    borderRadius: 10,
                    height: '100%',
                    alignSelf: 'center',
                  }}
                />
              </View>

              <View>
                {this.state.details.food_details.map((item, index) => (
                  <>
                    <View>
                      <ListItem style={{marginTop: -15, height: 60}}>
                        <Left>
                          <Text style={{fontSize: 19, marginRight: '20%'}}>
                            {item.label}
                          </Text>
                          <Text
                            style={{
                              fontSize: 19,
                              alignSelf: 'center',
                              color: emptyStarColor,
                            }}>
                            {item.price}جنية
                          </Text>
                        </Left>
                        <Right>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '50%',
                              justifyContent: 'space-around',
                              marginVertical: 10,
                            }}>
                            <CheckBox
                              value={item.value == 'true' ? true : false}
                              onValueChange={value => {
                                this.changecheck(value, index);
                              }}
                              tintColors="#000"
                            />
                          </View>
                        </Right>
                      </ListItem>
                    </View>
                  </>
                ))}
                <View
                  style={{
                    justifyContent: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 55,
                  }}>
                  <Text style={{fontSize: 19, marginRight: 40}}>العدد</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.plusFun();
                    }}
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      borderColor: emptyStarColor,
                      borderWidth: 1,
                    }}>
                    <Icon
                      name="plus"
                      style={{
                        fontSize: 20,
                        alignSelf: 'center',
                        marginTop: 4,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginHorizontal: 20,
                    }}>
                    {this.state.details.count + 1}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.subtractFun();
                    }}
                    style={{
                      borderRadius: 15,
                      width: 30,
                      height: 30,
                      borderColor: emptyStarColor,
                      borderWidth: 1,
                    }}>
                    <Icon
                      name="minus"
                      style={{
                        fontSize: 20,
                        marginTop: 4,
                        alignSelf: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <Text style={{fontSize: 19, marginLeft: 65}}>السعر</Text>
                  <View style={{width: '60%', justifyContent: 'center'}}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>
                      {(parseFloat(this.state.details.food_price) +
                        parseFloat(this.state.addsPrice)) *
                        (this.state.details.count + 1)}{' '}
                      جنية
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    this.check();
                  }}
                  style={{
                    backgroundColor: color,
                    width: 200,
                    height: 40,
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      color: '#fff',
                      fontWeight: 'bold',
                      marginTop: 5,
                    }}>
                    إضافة إلى عربة التسوق{' '}
                  </Text>
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
                style={{fontSize: 20, alignSelf: 'center', fontWeight: 'bold'}}>
                لا يوجد اتصال{' '}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
