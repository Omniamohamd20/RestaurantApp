import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import RestaurantHomePage from './tasks/RestaurantHomePage';
import RestaurantDetails from './tasks/RestaurantDetails';
import RestaurantFood from './tasks/RestaurantFood';
import RestaurantSections from './tasks/RestaurantSections';
import FoodDetails from './tasks/FoodDetails';
import Cart from './tasks/Cart';
import RestaurantPlace from './tasks/RestaurantPlace';
// import adminRestaurantHome from './tasks/adminRestaurantHome'
// import delivered from './tasks/delivered'
// import bill from './tasks/bill'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="RestaurantHomePage"
              component={RestaurantHomePage}
            />
            <Stack.Screen
              name="RestaurantDetails"
              component={RestaurantDetails}
            />
            <Stack.Screen name="RestaurantFood" component={RestaurantFood} />
            <Stack.Screen
              name="RestaurantSections"
              component={RestaurantSections}
            />
            <Stack.Screen name="FoodDetails" component={FoodDetails} />

            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="RestaurantPlace" component={RestaurantPlace} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
export default App;
