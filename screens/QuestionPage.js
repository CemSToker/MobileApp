import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BottomTab from '../components/main/BottomTab';
import { getObject } from '../AsyncStorage';
import SvgGradientStatic from '../components/main/SvgGradientStatic';

const QuestionPage = ({ navigation }) => {
  // State declarations
  const [last, setLast] = useState(1);
  const [lastc, setLastc] = useState("Alevel");  // Last answered question topic
  const [Alevel, setAlevel] = useState([0, 0, 0]);
  const [Sat, setSat] = useState([0, 0, 0]);
  const [Integral, setIntegral] = useState([0, 0, 0]);
  const [Differentiation, setDifferentiation] = useState([0, 0, 0]);
  const [selectedTopic, setSelectedTopic] = useState("Alevel"); // State for ComboBox selection

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
        setSelectedTopic(storedData1.lastchosen)
      }
      if (storedData2) {
        setAlevel(storedData2.Alevel);
        setSat(storedData2.Sat);
        setIntegral(storedData2.Integral);
        setDifferentiation(storedData2.Differentiation);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <SvgGradientStatic>
        <Picker
          selectedValue={selectedTopic}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedTopic(itemValue)}
        >
          <Picker.Item label="Alevel" value="Alevel" />
          <Picker.Item label="Sat" value="Sat" />
          <Picker.Item label="Integral" value="Integral" />
          <Picker.Item label="Differentiation" value="Differentiation" />
        </Picker>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </SvgGradientStatic>
      <BottomTab navigation={navigation} active={"questions"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  picker: {
    height: 50,
    width: 150,
    alignSelf: 'flex-start',
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'white', // Content background
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default QuestionPage;

