import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Screens/Home'
import LoginScreen from './Screens/Login'
import HistoryScreen from './Screens/History';

// Screen Names
const homeScreen = 'Home'
const loginScreen = 'login'
const historyScreen = 'History'

const Tab = createBottomTabNavigator()

const MainContainer = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator
        initialRouteName={loginScreen}
        screenOptions={
            ({route})=>({
            tabBarIcon:({focused,color,size})=>{
                let iconName;
                let rn = route.name
                if(rn=== homeScreen){
                    iconName = focused ? 'map' : 'map'
                }else if(rn === loginScreen){
                    iconName = focused ? 'login' : 'login'
                }
                else if(rn === historyScreen){
                    iconName = focused ? 'list' : 'list'
                }
                return <SimpleLineIcons name={iconName} size={size} color={color} />
            },
            activeTintColor: '#9146ff',
            inactiveTintColor: 'grey',
            labelStyle:{paddingBottom:10, fontSize:10},
            tabBarStyle: {padding: 10,height:70},
        })

        }
        >
            <Tab.Screen name={homeScreen} component={Home} />
            <Tab.Screen name={historyScreen} component={HistoryScreen} />
            <Tab.Screen name={loginScreen} component={LoginScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainContainer