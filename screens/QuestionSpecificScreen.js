// QuestionSpecificScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/outline';
import { fetchQuestions } from '../firebase';
import { storeObject } from '../AsyncStorage';

const QuestionSpecificScreen = ({ navigation, route }) => {
    const { iscorrect, difficulty, topic,p,alevel,sat,calculus1 } = route.params; //difficulty 0/1/2 easy to hard
    const [colour, setColour] = useState('#f5f5f5');
    const [questions, setQuestions] = useState([]);
    const date = new Date();
    useEffect(() => {
        if (iscorrect === 0) { // Not attempted
            setColour('#f5f5f5');
        } else if (iscorrect === 1) { // Got it wrong
            setColour("red");
        } else if (iscorrect === 2) { // Got it correct
            setColour("green");
        }
    }, [iscorrect]);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const fetchedQuestions = await fetchQuestions("Aleveleasy");
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error(error);
            }
        };

        loadQuestions();
    }, []);

    const handleOptionPress = (option,actualAnswer) => {
        if (iscorrect === 0) {

            if (option==actualAnswer){
                console.log("Correct Answer")
                let temp= p //This part is used to increment the points
                const myObject1={
                        points:temp+1,
                        lastlogin:date.getDate(),
                        lastchosen:topic,

                }
                console.log(calculus1)

                
                storeObject('userInfo', myObject1);
                console.log(p)
                console.log(topic,difficulty)
                
                //storeObject('answeredQuestion', myObject2);

            }   //Up to this point is if answer is correct
            
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colour }]}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronDoubleLeftIcon width={24} height={24} />
                    </TouchableOpacity>
                    <Text style={styles.question}></Text>
                </View>
                <View>
                    {questions.map((question, index) => (
                        <View key={question.id} style={styles.questionBlock}>
                            {question.url && (
                                <Image
                                    source={{ uri: question.url }}
                                    style={styles.image}
                                />
                            )}
                            <TouchableOpacity 
                                onPress={() => handleOptionPress(1,question.answer)}
                                disabled={iscorrect !== 0}
                                style={[styles.optionButton, iscorrect !== 0 && styles.disabledButton]}
                            >
                                <Text style={styles.optionText}>Option 1: {question.option1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleOptionPress(2,question.answer)}
                                disabled={iscorrect !== 0}
                                style={[styles.optionButton, iscorrect !== 0 && styles.disabledButton]}
                            >
                                <Text style={styles.optionText}>Option 2: {question.option2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleOptionPress(3,question.answer)}
                                disabled={iscorrect !== 0}
                                style={[styles.optionButton, iscorrect !== 0 && styles.disabledButton]}
                            >
                                <Text style={styles.optionText}>Option 3: {question.option3}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleOptionPress(4,question.answer)}
                                disabled={iscorrect !== 0}
                                style={[styles.optionButton, iscorrect !== 0 && styles.disabledButton]}
                            >
                                <Text style={styles.optionText}>Option 4: {question.option4}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    questionBlock: {
        marginBottom: 20,
    },
    questionText: {
        marginLeft: 10,
        flex: 1,
        fontSize: 16,
    },
    optionButton: {
        marginTop: 5,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#007bff',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: 'grey',
    },
    optionText: {
        fontSize: 14,
        color: 'white',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginTop: 2,
    },
});

export default QuestionSpecificScreen;
