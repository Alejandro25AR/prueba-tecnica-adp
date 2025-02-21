import { View, Text,Image, Pressable, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useFetch } from '../hooks/useFetch';
import { studentService } from '../services/student.service';
import CardSubjects from '../components/CardSubjects';


const icon = require('../assets/avatar.png');
    

interface IDataSubjects {
  launch_year: number; 
  id_group: number;
  id_subject: number;
  subject_name: string; 
  professor_name: string;
}

interface IDataStudent {
  id: number;
  user_id: string;
  name: string;
  grade: number;
  biological_sex: string;
} 

type responseSubject = { data: Array<IDataSubjects> }
type responseStudent = { student: IDataStudent }

const HomeStudent = () => { 
  const { data: dataEnrolledSubjects } = useFetch<responseSubject>(studentService.getEnrolledSubjects());
  const { data: dataUser } = useFetch<responseStudent>(studentService.getStudent());
    
  return (
     <View style={style.container}>
       <View style={style.containerProfile}>
       <Image source={icon} style={style.avatar}/>
        <View > 
          <Text style={style.greeting}>Bienvenid{dataUser?.student.biological_sex === 'Female' ? 'a' : '0'}</Text>
          <Text style={style.name}>{dataUser?.student.name} 👋</Text>
          <Text style={style.emphasis}>Grado {dataUser?.student.grade}</Text>
        </View>
      </View>   
      <Text style={style.title}>Materias Inscritas</Text>

      <Pressable>  
        <Text>+ Add other</Text> 
      </Pressable>
      <FlatList 
        data={dataEnrolledSubjects?.data} // Asegúrate de que `data?.data` es un array válido
        keyExtractor={(item) => item.id_subject.toString()} // Evita errores con `key`
        renderItem={({ item }) => ( // Aquí se usa `item`, no `subject`
          <CardSubjects 
            key={item.id_subject} 
            group={item.id_group}
            nameProfessor={item.professor_name}
            nameSubject={item.subject_name}
            urlImage={""}
          />
        )}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:16
  },
  containerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:16
  },
  avatar: {
    width: 100,
    height:100,
    borderRadius: 50
  },
  greeting: {
    fontSize: 28
  },
  name: {
    
  },
  emphasis: {
    fontWeight:'800'
  },
  title: {
    fontSize:20,
    marginBlock:20
  }
});


export default HomeStudent