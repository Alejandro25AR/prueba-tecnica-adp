import { View, Text, Button, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const icon = require('../assets/avatar.png');

const HomeProfessor = () => {
  return (
    <View style={{flex: 1,backgroundColor: '#fff', paddingTop:16}}>
      <View style={{flexDirection: 'row',alignItems: 'center', gap:16}}>
        <Image source={icon} style={style.avatar}/>
        <View>
          <Text style={{fontSize: 28}}>Bienvenido</Text>
          <Text>Carlos Perez 👋</Text>
        </View>
      </View>Más preguntas
      
      <Text style={{fontSize:20, marginBlock:20}}>Materias a impartir</Text>

      <Pressable style={{
          alignItems:'center',
          justifyContent:'center',
          width: '100%',
          height: 80,
          borderWidth: 2,
          borderRadius: 16
        }}>
        <Text>+ Impart other</Text>
      </Pressable>

      <View style={{
          flexDirection: 'row',
          paddingBlock: 8,
          paddingInline: 16,
          marginTop: 20,
          width: '100%',
          height: 'auto',
          borderWidth: 2,
          borderRadius: 16
        }}>
        <View>
          <Text>Nombre materia</Text>
          <Text>Grupo</Text>
          <Text># estudiantes</Text>
        </View>
        <Pressable>
          <Text>-&gt;</Text>
        </Pressable>
      </View>
      <View style={{
          flexDirection: 'row',
          paddingBlock: 8,
          paddingInline: 16,
          marginTop: 20,
          width: '100%',
          height: 'auto',
          borderWidth: 2,
          borderRadius: 16
        }}>
        <View>
          <Text>Nombre materia</Text>
          <Text>Grupo</Text>
          <Text># estudiantes</Text>
        </View>
        <Pressable>
          <Text>-&gt;</Text>
        </Pressable>
      </View>
      <View style={{
          flexDirection: 'row',
          paddingBlock: 8,
          paddingInline: 16,
          marginTop: 20,
          width: '100%',
          height: 'auto',
          borderWidth: 2,
          borderRadius: 16
        }}>
        <View>
          <Text>Nombre materia</Text>
          <Text>Grupo</Text>
          <Text># estudiantes</Text>
        </View>
        <Pressable>
          <Text>-&gt;</Text>
        </Pressable>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  avatar: {
    width: 100,
    height:100,
    borderRadius: 50
  }
});

export default HomeProfessor