import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import InfoCard from './InfoCard';

interface Props {
  nameSubject: string;
  group: number;
  nameProfessor: string;
  urlImage: string;
}

const icon = require('../assets/avatar.png');

const CardSubjects = ({nameSubject,group,nameProfessor,urlImage}:Props) => {
  return (
    <View style={style.container}>
      <InfoCard group={group} nameProfessor={nameProfessor} nameSubject={nameSubject}/>
      <Image source={urlImage && urlImage !== '' ? { uri: urlImage } : icon}  style={style.avatar}/>
    </View>  
  )
}  

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
      paddingBlock: 8,
      paddingInline: 16,
      marginTop: 20,
      width: '100%',
      height: 'auto',
      borderWidth: 2,
      borderRadius: 16,
      justifyContent: 'space-between'
  },
  avatar: {
    width: 100,
    height:100,
    borderRadius: 50
  }
});

export default CardSubjects