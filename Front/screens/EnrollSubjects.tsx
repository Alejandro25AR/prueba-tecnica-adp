import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useFetch } from '../hooks/useFetch'
import CardSubjects from '../components/CardSubjects';
import { studentService } from '../services/student.service';

interface IDataSubjects {
  name: string;
  description: string;
  grade_required: number;
  id_professor: number;
  launch_year: number;
  places_availables: number;
  name_professor: string;
  url_image: string;
  id_subject: number;
  id_group: number;
}

type ResponseSubjects = {data: Array<IDataSubjects>}; 

const EnrollSubjects = () => {
  const { data: dataSubjectsAvailables } = useFetch<ResponseSubjects>(studentService.getSubjetsAvailables());

  return (
    <View style={{flex:1}}>
      <FlatList 
        data={dataSubjectsAvailables?.data} 
        keyExtractor={(item) => `${item.id_group}${item.id_subject}${item.launch_year}`} 
        renderItem={({ item }) => (
          <CardSubjects
            group={item.id_group}
            nameProfessor={item.name_professor}
            nameSubject={item.name}
            urlImage={item.url_image} 
          /> 
        )}
      />  
    </View>
  )
}

export default EnrollSubjects