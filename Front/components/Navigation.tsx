import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider, useAuth } from '../context/AuthContex';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { 
  HomeProfessor,
  HomeStudent,
  ResetPassword,
  EnrollSubjects,
  ImpartSubjects,
  Login 
} from '../screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Logout from '../screens/Logout';
import RegisterStudent from '../screens/RegisterStudent';

const Navigation = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Layout></Layout>
    </NavigationContainer>
  )
}

export const Layout = () => {
  const { authState } = useAuth();

  if (!authState) {
    return <View><Text>Error</Text></View>;
  }

  if (!authState.authenticated) {
    return <Login></Login>
  }

  if (authState.purpose === "password-reset-token") {
    return <ResetPassword />;
  }

  if (authState.purpose === "access-token" && authState.role === "student") {
    return <StudentTabs />;  // 🔥 Renderiza el menú de estudiantes
  }

  if (authState.purpose === "access-token" && authState.role === "professor") {
    return <ProfessorTabs />;  // 🔥 Renderiza el menú de profesores
  }

  return <View><Text>Error</Text></View>;
};

const Tab = createBottomTabNavigator();

function ProfessorTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeProfessor} />
      <Tab.Screen name="Clases" component={ImpartSubjects} />
      <Tab.Screen name="Registrar" component={RegisterStudent} />
      <Tab.Screen name="Salir" component={Logout} />
    </Tab.Navigator>
  );
}

function StudentTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeStudent} />
      <Tab.Screen name="Inscripción" component={EnrollSubjects} />
      <Tab.Screen name="Salir" component={Logout} />
    </Tab.Navigator>
  );
}

export default Navigation