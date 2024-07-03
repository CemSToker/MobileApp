import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomTab from '../components/main/BottomTab';
import { getObject } from '../AsyncStorage';
import SvgGradientStatic from '../components/main/SvgGradientStatic';
import QuestionCard from '../components/question/QuestionCard';

const QuestionPage = ({ navigation }) => {
  const [last, setLast] = useState(1);
  const [lastc, setLastc] = useState("Alevel");
  const [Alevel, setAlevel] = useState([0, 0, 0]);
  const [Sat, setSat] = useState([0, 0, 0]);
  const [Calculus1, setCalculus1] = useState([0, 0, 0]);

  const [selectedTopic, setSelectedTopic] = useState("Alevel");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'A level', value: 'Alevel' },
    { label: 'Sat', value: 'Sat' },
    { label: 'Calculus 1', value: 'Calculus1' }
  ]);

  const key1 = "userInfo";
  const key2 = "answeredQuestion";

  const questionItems = ['Easy Question', 'Medium Question', 'Hard Question'];

  useEffect(() => {
    const fetchData = async () => {
      const storedData1 = await getObject(key1);
      const storedData2 = await getObject(key2);
      if (storedData1) {
        setLast(storedData1.lastlogin);
        setLastc(storedData1.lastchosen);
        setSelectedTopic(storedData1.lastchosen);
      }
      if (storedData2) {
        setAlevel(storedData2.Alevel);
        setSat(storedData2.Sat);
        setCalculus1(storedData2.Calculus1);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <SvgGradientStatic>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={selectedTopic}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedTopic}
            setItems={setItems}
            containerStyle={styles.picker}
            style={{ backgroundColor: '#fafafa' }}
            dropDownContainerStyle={{ backgroundColor: '#fafafa', zIndex: 1000, elevation: 1000 }}
            zIndex={1000}
            elevation={1000}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {questionItems.map((item, index) => (
            <QuestionCard key={index} colour1={"red"} solved={1}>
              <Text style={styles.itemText}>{item}</Text>
            </QuestionCard>
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
    backgroundColor: 'transparent',
  },
  dropdownContainer: {
    marginTop:30,
    zIndex: 1000,
    elevation: 1000,
  },
  picker: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  itemText: {
    fontSize: 16,
  },
});

export default QuestionPage;
