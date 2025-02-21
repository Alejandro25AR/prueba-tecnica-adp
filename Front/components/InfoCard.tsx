import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
  nameSubject: string;
  group: number;
  nameProfessor: string;
}

const InfoCard = ({nameSubject,group,nameProfessor}:Props) => {
  return (
    <View>
      <Text>{nameSubject}</Text>
      <Text>Grupo {group}</Text>
      <Text>{nameProfessor}</Text>
    </View>
  )
}

const style = StyleSheet.create({});

export default InfoCard