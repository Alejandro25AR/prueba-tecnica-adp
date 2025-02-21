import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthContex'

const Logout = () => {
  const { onLogout } = useAuth()
  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <Button onPress={onLogout} title='Salir'/>
    </View>
  )
}

export default Logout