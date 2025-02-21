import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStudent, ImpartSubjects } from '../screens';
import Logout from '../screens/Logout';

const Tab = createBottomTabNavigator();

const BottonTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route})=>({
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5 },
      })}
    >
        <Tab.Screen name="Inicio" component={HomeStudent} />
        <Tab.Screen name="Impartir" component={ImpartSubjects} />
        <Tab.Screen name="Salir" component={Logout} />
    </Tab.Navigator>
  )
}

export default BottonTabs