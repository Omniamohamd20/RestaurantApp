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
import {
  color,
  backgroundColor,
  emptyStarColor,
  fullStarColor,
} from '../tasks/Colors';
import * as ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('screen');
import {Table, Row, Rows} from 'react-native-table-component';
export default class bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [
        {
          food_name: 'كريب كرانشي',
          food_price: '40',
          food_image:
            'https://www.swishschool.com/w/wp-content/uploads/2019/01/%D9%81%D9%84%D8%A7%D9%81%D9%84-9.jpg',
          count: 0,
        },
        {
          food_name: 'كريب زنجر',
          food_price: '40',
          food_image:
            'https://www.swishschool.com/w/wp-content/uploads/2019/01/%D9%81%D9%84%D8%A7%D9%81%D9%84-9.jpg',
          count: 0,
        },
      ],
      tableHead: ['الصنف', 'عدد', 'جنيه', 'قرش'],
      tableData: [
        ['كريب كرانشي', '1', '40', '0'],
        ['كريب زنجر', '1', '40', '0'],
      ],
    };
  }

  async componentDidMount() {
    this.requestCameraPermission();
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
                  الحسابات
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
                  <View>
                    <View
                      style={{
                        padding: 16,
                        backgroundColor: '#fff',
                        marginTop: 25,
                      }}>
                      <Table
                        borderStyle={{
                          borderWidth: 2,
                          borderColor: '#27ae60bf',
                        }}>
                        <Row
                          data={this.state.tableHead}
                          style={{height: 40, backgroundColor: '#6bc892bf'}}
                          textStyle={{margin: 6, textAlign: 'center'}}
                        />
                        <Rows
                          data={this.state.tableData}
                          textStyle={{margin: 6, textAlign: 'center'}}
                        />
                      </Table>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}
