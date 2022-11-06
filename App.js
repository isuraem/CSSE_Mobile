import { StatusBar } from 'expo-status-bar';
import Drawer from 'react-native-drawer'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Signuplocal from './screens/Signuplocal';
import Home from './screens/Home';
import BusPick from './screens/BusPick';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='EditProfile'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='EditProfile' component={EditProfile}   />
        <Stack.Screen name='Signup' component={Signup}   />
        <Stack.Screen name='Login' component={Login}   />
        <Stack.Screen name='Signuplocal' component={Signuplocal}   />
        <Stack.Screen name='Home' component={Home}   />
        <Stack.Screen name='BusPick' component={BusPick}   />
        <Stack.Screen name='Profile' component={Profile}   />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


