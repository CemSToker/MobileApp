import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import SvgGradient from '../components/main/SvgGradient';
import { getObject } from '../AsyncStorage';
import { CheckIcon, XMarkIcon } from 'react-native-heroicons/outline'; // Assuming you're using heroicons

function MainPage({ navigation }) {
  const [last, setLast] = useState(1);
  const [lastc, setLastc] = useState("Alevel");
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

  useEffect(() => {
    if (selectedTopic === "Alevel") {
      setShowntopic(Alevel);
    } else if (selectedTopic === "Sat") {
      setShowntopic(Sat);
    } else if (selectedTopic === "Calculus1") {
      setShowntopic(Calculus1);
    }
  }, [selectedTopic, Alevel, Sat, Calculus1]);

  return (
    <View style={styles.container}>
      <SvgGradient>
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
          <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.navigate('QuestionSpecificScreen', {
            iscorrect: showntopic[0],
            otherParam: 'anything you want here',
          })}}>
            <View style={[styles.card, { backgroundColor: 'red', shadowColor: 'black' }]}>
              <View style={styles.iconContainer}>
                {showntopic[0] === 2 && <CheckIcon color="white" width={24} height={24} />}
                {showntopic[0] === 1 && <XMarkIcon color="white" width={24} height={24} />}
              </View>
              <Text style={styles.itemText}>Easy Question</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.navigate('QuestionSpecificScreen', {
            iscorrect: showntopic[1],
            otherParam: 'anything you want here',
          })}}>
            <View style={[styles.card, { backgroundColor: 'blue', shadowColor: 'black' }]}>
              <View style={styles.iconContainer}>
                {showntopic[1] === 2 && <CheckIcon color="white" width={24} height={24} />}
                {showntopic[1] === 1 && <XMarkIcon color="white" width={24} height={24} />}
              </View>
              <Text style={styles.itemText}>Medium Question</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={() => {{navigation.navigate('QuestionSpecificScreen', {
            iscorrect: showntopic[2],
            otherParam: 'anything you want here',
          })}}}>
            <View style={[styles.card, { backgroundColor: 'green', shadowColor: 'black' }]}>
              <View style={styles.iconContainer}>
                {showntopic[2] === 2 && <CheckIcon color="white" width={24} height={24} />}
                {showntopic[2] === 1 && <XMarkIcon color="white" width={24} height={24} />}
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
  dropdownContainer: {
    marginTop: 30,
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
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default MainPage;
