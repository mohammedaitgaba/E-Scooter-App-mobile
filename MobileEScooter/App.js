import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View} from "react-native";
import Home from './Screens/Home'
import LoginScreen from "./Screens/Login";
import RegisterScreen from './Screens/Register'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options=
          {{
            title: 'Welcome',
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: 'blue',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign:'center'
          }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header:{
    headerStyle: { backgroundColor: 'white' },
    headerTintColor: 'blue',
    headerTitleStyle: { fontWeight: 'bold' },
    headerTitleAlign:'center'
  }
});
