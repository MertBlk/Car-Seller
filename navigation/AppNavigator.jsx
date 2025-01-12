import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CarDetailScreen from '../screens/CarDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Araçlar' }}
      />
      <Stack.Screen 
        name="CarDetail" 
        component={CarDetailScreen}
        options={{ title: 'Araç Detayı' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator; 