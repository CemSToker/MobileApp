import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import SvgGradient from '../components/main/SvgGradient';
import { getObject, storeObject } from '../AsyncStorage';
import { CheckIcon, XMarkIcon } from 'react-native-heroicons/outline'; // Assuming you're using heroicons
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

function MainPage({ navigation }) {
  const [last, setLast] = useState(1);
  const [lastc, setLastc] = useState("Alevel");
  const [points, setPoints] = useState(0);
  const [Alevel, setAlevel] = useState([0, 0, 0]);
  const [Sat, setSat] = useState([0, 0, 0]);
  const [Calculus1, setCalculus1] = useState([0, 0, 0]);
  const [showntopic, setShowntopic] = useState([0, 0, 0]);
  const [selectedTopic, setSelectedTopic] = useState("Alevel");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'A level', value: 'Alevel' },
    { label: 'Sat', value: 'Sat' },
    { label: 'Calculus 1', value: 'Calculus1' }
  ]);

  const key1 = "userInfo";
  const key2 = "answeredQuestion";

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const storedData1 = await getObject(key1);
        const storedData2 = await getObject(key2);
        if (storedData1) {
          setLast(storedData1.lastlogin);
          setLastc(storedData1.lastchosen);
          setPoints(storedData1.points);
          setSelectedTopic(storedData1.lastchosen);
        }
        if (storedData2) {
          setAlevel(storedData2.Alevel);
          setSat(storedData2.Sat);
          setCalculus1(storedData2.Calculus1);
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {    //This part saves the last chosen topic and also sets it for the picker
    let myObject1;
    if (selectedTopic === "Alevel") {
      setShowntopic(Alevel);
      myObject1={
        points:points,
        lastlogin:last,
        lastchosen:"Alevel",
    }
    } else if (selectedTopic === "Sat") {
      setShowntopic(Sat);
      myObject1={
        points:points,
        lastlogin:last,
        lastchosen:"Sat",
    }
    } else if (selectedTopic === "Calculus1") {
      setShowntopic(Calculus1);
      myObject1={
        points:points,
        lastlogin:last,
        lastchosen:"Calculus1",
    }
    }
    storeObject('userInfo', myObject1);
    //storeObject('answeredQuestion', {Alevel:[0,0,0],Sat:[0,0,0],Calculus1:[0,0,0]})  
  }, [selectedTopic, Alevel, Sat, Calculus1]);

  return (
    <View style={styles.container}>
      <SvgGradient>
        <View style={styles.topBar}>
          <Text style={styles.pointsText}>Points: {points}</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={selectedTopic}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedTopic}
            setItems={setItems}
            containerStyle={styles.picker}
            style={styles.dropDown}
            dropDownContainerStyle={styles.dropDownContainer}
            zIndex={1000}
            elevation={1000}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.navigate('QuestionSpecificScreen', {
            iscorrect: showntopic[0],
            difficulty: 0,   //0 difficulty means easy
            topic: selectedTopic,
            p:points,
            alevel:Alevel,
            sat:Sat,
            calculus1:Calculus1,
          })}}>
            <View style={[styles.card, { backgroundColor: 'red', shadowColor: 'black' }]}>
              <View style={styles.iconContainer}>
                {showntopic[0] === 1 && <CheckIcon color="white" width={24} height={24} />}
                {showntopic[0] === 2 && <XMarkIcon color="white" width={24} height={24} />}
              </View>
              <Text style={styles.itemText}>Easy Question</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.navigate('QuestionSpecificScreen', {
            iscorrect: showntopic[1],
            difficulty: 1,   //1 difficulty means medium
            topic: selectedTopic,
            p:points,
            alevel:Alevel,
            sat:Sat,
            calculus1:Calculus1,
          })}}>
            <View style={[styles.card, { backgroundColor: 'blue', shadowColor: 'black' }]}>
              <View style={styles.iconContainer}>
                {showntopic[1] === 1 && <CheckIcon color="white" width={24} height={24} />}
                {showntopic[1] === 2 && <XMarkIcon color="white" width={24} height={24} />}
              </View>
              <Text style={styles.itemText}>Medium Question</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.navigate('QuestionSpecificScreen', {
            iscorrect: showntopic[2],
            difficulty: 2,   //2 difficulty means hard
            topic: selectedTopic,
            p:points,
            alevel:Alevel,
            sat:Sat,
            calculus1:Calculus1,
          })}}>
            <View style={[styles.card, { backgroundColor: 'green', shadowColor: 'black' }]}>
              <View style={styles.iconContainer}>
                {showntopic[2] === 1 && <CheckIcon color="white" width={24} height={24} />}
                {showntopic[2] === 2 && <XMarkIcon color="white" width={24} height={24} />}
              </View>
              <Text style={styles.itemText}>Hard Question</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SvgGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure background is transparent
  },
  topBar: {
    backgroundColor: '#fafafa',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    alignItems: 'center',
    marginBottom: 10,
    zIndex: 1000,
    elevation: 1000,
  },
  picker: {
    width: '80%',
  },
  dropDown: {
    backgroundColor: '#fafafa',
  },
  dropDownContainer: {
    backgroundColor: '#fafafa',
    zIndex: 1000,
    elevation: 1000,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  card: {
    width: width * 0.9, // Increased width to 90% of the screen width
    height: 150,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainPage;
