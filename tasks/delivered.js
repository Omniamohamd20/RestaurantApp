/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  I18nManager,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {color, backgroundColor, emptyStarColor, fullStarColor} from './Colors';
import * as ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('screen');

export default class delivered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [
        {
          food_order: 'دينا',
          food_price: '40',
          food_no: '1',
          count: 0,
        },
        {
          food_order: 'امنيه',
          food_price: '40',
          food_no: '2',
          count: 0,
        },
      ],
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        <View
          style={{
            backgroundColor: color,
            flex: 1,
            width: '100%',
          }}>
          <StatusBar backgroundColor={color} />
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

                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: backgroundColor,
                    marginTop: 5,
                  }}>
                  طلبات تم توصيلها
                </Text>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    marginTop: 20,
                    alignSelf: 'center',
                  }}>
                  <FlatList
                    data={this.state.food}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          // flexDirection: 'row',
                          width: '90%',
                          height: width * 0.33,
                          alignSelf: 'center',
                          backgroundColor: backgroundColor,
                          elevation: 3,
                          borderRadius: 10,
                          // alignItems: 'center',
                          marginBottom: 1,
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 19,
                            // alignSelf: 'center',
                            paddingVertical: 2,
                            fontWeight: 'bold',
                            marginTop: width * 0.06,
                            textAlign: 'center',
                            marginLeft: 10,
                          }}>
                          اسم العميل: {item.food_order}{' '}
                        </Text>

                        <Text
                          style={{
                            fontSize: 19,
                            // alignSelf: 'center',
                            paddingVertical: 2,
                            fontWeight: 'bold',
                            // marginTop: 5,
                            textAlign: 'center',
                            marginLeft: 10,
                          }}>
                          رقم العميل: {item.food_no}{' '}
                        </Text>

                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            paddingVertical: 2,
                          }}>
                          {item.food_price * (item.count + 1)} جنيه{' '}
                        </Text>
                        {/* <View style={{
                                                    width: '60%', height: '80%', marginRight: 20
                                                    , justifyContent: 'center'
                                                }}>
                                                   
                                                    

                                                </View> */}
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}
