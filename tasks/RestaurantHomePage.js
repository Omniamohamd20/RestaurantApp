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
  StatusBar,
  ActivityIndicator,
  Dimensions,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {
  color,
  backgroundColor,
  emptyStarColor,
  fullStarColor,
} from '../tasks/Colors';
import * as ImagePicker from 'react-native-image-picker';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class RestaurantHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: [],
      loading: true,
      restaurant_showg: 1,
      numOfItems: 0,
      network: false,
      // img: ''
    };
  }

  componentWillUnmount() {
    this.net();
  }

  async componentDidMount() {
    // this.requestCameraPermission()

    this.net();
  }

  // requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: "Cool Photo App Camera Permission",
  //         message:
  //           "Cool Photo App needs access to your camera " +
  //           "so you can take awesome pictures.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the camera");
  //     } else {
  //       console.log("Camera permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  getdata() {
    axios
      .get('http://192.168.1.7/api/SelectRestarantAndCategories.php')
      .then(res => {
        if (res.status == 200) {
          if (res.data == 'Error') {
            alert('try again');
          } else if (typeof res.data == typeof []) {
            this.setState({restaurant: res.data});
          } else {
            alert('try again');
          }
        } else {
          alert('try again');
        }
        this.setState({loading: false});
      });
  }
  searchfun(value) {
    let newarr = this.state.restaurant;
    let counter = 0;
    for (let i = 0; i < newarr.length; i++) {
      if (newarr[i].restaurant_name.includes(value.toUpperCase().trim())) {
        newarr[i].restaurant_show = 1;
      } else {
        newarr[i].restaurant_show = 0;

        counter++;
      }

      this.setState({restaurant: newarr, numOfItems: counter});
    }
  }
  onStarRatingPress(rating, index) {
    let newstar = this.state.restaurant;
    newstar[index].restaurant_starCount = rating;
    this.setState({
      restaurant: newstar,
    });
  }

  net() {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.setState({network: true, loading: true});
        if (this.state.restaurant.length == 0) {
          this.getdata();
        }
      } else {
        this.setState({network: false, loading: false});
      }
    });
  }

  // select_first_photo() {

  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {
  //     // console.log('Response = ', res);

  //     if (res.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (res.error) {
  //       console.log('ImagePicker Error: ', res.error);
  //     } else if (res.customButton) {
  //       console.log('User tapped custom button: ', res.customButton);
  //       alert(res.customButton);
  //     } else {

  //       this.setState({
  //         // first_photo_data: res,
  //         // first_photo_uri: res.uri,
  //         // first_photo_string: res.base64
  //         img: res.uri
  //       });
  //       // console.log(res)
  //     }
  //   });

  // }

  // launchCamera = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchCamera(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log('response', JSON.stringify(response));
  //       this.setState({
  //         // filePath: response,
  //         // fileData: response.data,
  //         // fileUri: response.uri
  //         img: response.uri
  //       });
  //     }
  //   });
  // }
  render() {
    return (
      <>
        <View
          style={{
            backgroundColor: color,
            flex: 1,
            width: width,
          }}>
          {/* header */}

          <StatusBar backgroundColor={color} />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color,
              height: height * 0.13,
              marginBottom: 15,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                width: '90%',
                borderRadius: 5,
                flexDirection: 'row',
                backgroundColor: backgroundColor,
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
                placeholder={'البحث بإسم المطعم'}
                placeholderTextColor="#000000ad"
                onChangeText={value => {
                  this.searchfun(value);
                }}
              />
            </View>
          </View>

          {/* content */}
          {this.state.network ? (
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                marginTop: -30,
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
              }}>
              <ScrollView style={{marginTop: '1%'}}>
                {this.state.numOfItems != this.state.restaurant.length ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: '1%',
                      marginBottom: '1%',
                      marginRight: '1%',
                    }}>
                    {this.state.restaurant.map((item, index) =>
                      item.restaurant_show == 1 ? (
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
                              this.props.navigation.navigate(
                                'RestaurantDetails',
                                {foods: item},
                              );
                            }}>
                            <View>
                              <View>
                                <Image
                                  source={{uri: item.restaurant_image}}
                                  style={{
                                    width: '100%',
                                    height: 90,
                                    borderTopRightRadius: 15,
                                    borderTopLeftRadius: 15,
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  padding: 5,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    fontWeight: '800',
                                    color: '#333',
                                  }}>
                                  {item.restaurant_name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: '#9B9A9B',
                                    alignSelf: 'center',
                                  }}>
                                  {item.restaurant_type}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: '#9B9A9B',
                                    alignSelf: 'center',
                                  }}>
                                  {item.restaurant_address}
                                </Text>

                                <View
                                  style={{
                                    alignSelf: 'center',
                                    transform: [
                                      {scaleX: I18nManager.isRTL ? -1 : 1},
                                    ],
                                  }}>
                                  <StarRating
                                    emptyStarColor={emptyStarColor}
                                    fullStarColor={fullStarColor}
                                    starSize={20}
                                    disabled={false}
                                    maxStars={5}
                                    rating={item.restaurant_starCount}
                                    animation="flash"
                                    selectedStar={rating =>
                                      this.onStarRatingPress(rating, index)
                                    }
                                  />
                                </View>
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
                          color: '#000',
                        }}>
                        لا يوجد مطاعم لعرضها{' '}
                      </Text>
                    </View>
                  </View>
                )}
                {/* <Image source={{ uri: this.state.img }}
                  style={{
                    width: width * 0.6,
                    height: width * 0.4
                  }}
                  resizeMode='cover'
                ></Image>
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#000',
                    borderRadius: 25,
                    alignSelf: 'center',
                    marginTop: 30
                  }}
                  onPress={() => {
                    // this.select_first_photo()
                    this.launchCamera()
                  }}

                ></TouchableOpacity> */}
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
                    color: '#000',
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
// export default RestaurantHomePage;
