import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BottomTab from '../components/main/BottomTab';
import { getObject } from '../AsyncStorage';

const QuestionPage = ({navigation}) => {
  // Gereken data: lastlogin ve questions
  /* Alevel:[0,0,0]

Sat:[1,1,1]

Integral:[1,2,0]

Differentiation:[1,2,0]

Trigonometry:[1,2,0]*/
  const [last, setLast] = useState(1);
  const [lastc, setLastc] = useState("Alevel");  //Last answered question topic
  const [Alevel, setAlevel] = useState([0,0,0]);
  const [Sat, setSat] = useState([0,0,0]);
  const [Integral, setIntegral] = useState([0,0,0]);
  const [Differentiation, setDifferentiation] = useState([0,0,0]);
  const key1 = "userInfo"; 
  const key2 = "answeredQuestion"; 

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  useEffect(() => {
    const fetchData = async () => {
      const storedData1 = await getObject(key1);
      const storedData2 = await getObject(key2);
      if (storedData1) {
        setLast(storedData1.lastlogin);
        setLastc(storedData1.lastchosen);
      }
      if (storedData2){
        setAlevel(storedData2.Alevel);
        setSat(storedData2.Sat);
        setIntegral(storedData2.Integral);
        setDifferentiation(storedData2.Differentiation);
       
      }
    };

    fetchData();
  }, []);

  console.log(Alevel)
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
      <BottomTab navigation={navigation} active={"questions"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default QuestionPage;