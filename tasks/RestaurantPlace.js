/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  I18nManager,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import {color} from './Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
class RestaurantMarketPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  currentLocation = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(JSON.stringify(position));
    });
  };

  requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);
      if (response === 'granted') {
        this.currentLocation();
      }
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          showsUserLocation={true}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            // draggable
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            description="the restaurant is here."
          />
        </MapView>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            left: 3,
            top: 3,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          }}>
          <Icon name="arrow-left" color={color} size={25} style={{}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
});

export default RestaurantMarketPlace;
