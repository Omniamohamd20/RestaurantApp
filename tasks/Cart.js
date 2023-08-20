/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color, backgroundColor} from '../tasks/Colors';
import NetInfo from '@react-native-community/netinfo';
const {width, height} = Dimensions.get('screen');

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: {
        categories: [
          {
            name: '',
          },
        ],
        img: [],
      },

      totalPrice: 0,

      arr: [],
      index: '',
      network: false,
    };
  }

  componentWillUnmount() {
    let ref = this.props.route.params.referish;
    ref();
    this.net();
  }

  async componentDidMount() {
    let arr = await AsyncStorage.getItem('arr');
    let data = JSON.parse(arr);
    let total = this.state.totalPrice;
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].food_price * (data[i].count + 1);
    }
    total = sum;
    this.setState({totalPrice: total});
    this.setState({arr: data});
    this.net();
  }

  async setData() {
    let arr = this.state.arr;
    await AsyncStorage.setItem('arr', JSON.stringify(arr));
    this.setState({loading: false});
  }

  plusFun(index) {
    let data = this.state.arr;
    data[index].count += 1;
    this.setState({arr: data});
    this.sum(index);
  }
  subtractFun(index) {
    let data = this.state.arr;

    if (data[index].count > 0) {
      data[index].count -= 1;
    } else {
    }
    this.setState({arr: data});
    this.sum(index);
  }
  async delete(index) {
    let data = this.state.arr;
    data.splice(index, 1);

    this.setState({
      arr: data,
    });
    this.sum(index);
  }
  async sum() {
    let data = this.state.arr;
    let total = this.state.totalPrice;
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].food_price * (data[i].count + 1);
    }
    total = sum;
    this.setState({totalPrice: total});
    this.setData();
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
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '10%',
            alignSelf: 'center',
            elevation: 10,
          }}>
          <TouchableOpacity
            style={{marginTop: 4, width: 30, height: 25}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Icon
              name={'chevron-right'}
              size={20}
              color={color}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              fontWeight: 'bold',
              width: '80%',
              color: color,
            }}>
            عربة التسوق
          </Text>
        </View>

        {this.state.network ? (
          this.state.arr.length == 0 ? (
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
                marginTop: 5,
              }}>
              <View style={{flex: 1, marginTop: 100, alignSelf: 'center'}}>
                <Image
                  source={require('../image/emptyCart.png')}
                  resizeMode="contain"
                  style={{width: 300, height: 300}}
                />
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  لا يوجد مشتريات{' '}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{flex: 1, backgroundColor: backgroundColor}}>
              <ScrollView>
                <Text
                  style={{
                    color: color,
                    marginLeft: '5%',
                    marginVertical: '3%',
                    fontSize: 18,
                  }}>
                  {this.state.arr.length} عنصر{' '}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                    marginBottom: 5,
                    flexWrap: 'wrap',
                  }}>
                  <FlatList
                    data={this.state.arr}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: width * 0.9,
                          height: height * 0.16,
                          alignSelf: 'center',
                          backgroundColor: backgroundColor,
                          elevation: 3,
                          borderRadius: 10,
                          alignItems: 'center',
                          marginBottom: 1,
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            width: '20%',
                          }}>
                          <Image
                            style={{
                              width: '150%',
                              height: '100%',
                              borderRadius: 10,
                            }}
                            source={{uri: item.food_image}}
                          />
                        </View>

                        <View
                          style={{
                            width: '60%',
                            height: '80%',
                            paddingHorizontal: 40,
                            justifyContent: 'center',
                            marginRight: 20,
                          }}>
                          <Text
                            style={{
                              fontSize: 17,
                              alignSelf: 'flex-start',
                              paddingVertical: 2,
                              fontWeight: 'bold',
                            }}>
                            {item.food_name}{' '}
                          </Text>
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: 'bold',
                              alignSelf: 'flex-start',
                              paddingVertical: 2,
                            }}>
                            {item.food_price * (item.count + 1)} جنيه{' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '5%',
                            alignItems: 'center',
                            // width: '5%',
                            height: '80%',
                            justifyContent: 'space-around',
                            // marginLeft: 5
                          }}>
                          <TouchableOpacity
                            style={{
                              width: 30,
                              height: 30,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() => this.plusFun(index)}>
                            <Icon name="plus" color={color} size={15} />
                          </TouchableOpacity>
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 15,
                              backgroundColor: color,
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 15,
                                color: backgroundColor,
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                marginRight: 3,
                              }}>
                              {item.count + 1}{' '}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={{
                              width: 30,
                              height: 30,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onPress={() => this.subtractFun(index)}>
                            <Icon name="minus" color={color} size={15} />
                          </TouchableOpacity>
                        </View>
                        <View style={{width: '5%'}}>
                          <TouchableOpacity
                            onPress={() => this.delete(index)}
                            style={{
                              marginTop: -70,
                              marginLeft: -300,
                              backgroundColor: 'red',
                              width: 25,
                              height: 25,
                              borderRadius: 12.5,
                            }}>
                            <Icon
                              name="times"
                              size={20}
                              color={backgroundColor}
                              style={{alignSelf: 'center', marginTop: 1}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </ScrollView>

              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginTop: '2%',
                  elevation: 20,
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 20, marginTop: 5}}>
                  المبلغ الاجمالي :{' '}
                  <Text style={{fontWeight: 'bold', marginTop: 5}}>
                    {this.state.totalPrice} جنيه
                  </Text>
                </Text>

                <TouchableOpacity
                  style={{
                    width: width * 0.3,
                    height: 40,
                    backgroundColor: color,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginLeft: '10%',
                  }}
                  // onPress={() => }
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#fff',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    التوصيل
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
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
