import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/outline';
import { fetchQuestions } from '../firebase';
import { storeObject } from '../AsyncStorage';

const QuestionSpecificScreen = ({ navigation, route }) => {
    const { iscorrect, difficulty, topic, p, alevel, sat, calculus1, lastlogin } = route.params; // difficulty 0/1/2 easy to hard
    const [correct, setCorrect] = useState(iscorrect);
    const [colour, setColour] = useState('#f5f5f5');
    const [questions, setQuestions] = useState([]);
    const date = new Date();
    let zor;
    if (difficulty === 0) {
        zor = "easy";
    } else if (difficulty === 1) {
        zor = "med";
    } else {
        zor = "hard";
    }

    useEffect(() => {
        if (correct === 0) { // Not attempted
            setColour('#f5f5f5');
        } else if (correct === 1) { // Got it correct
            setColour('green');
        } else if (correct === 2) { // Got it wrong
            setColour('red');
        }
    }, [correct]);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const fetchedQuestions = await fetchQuestions(topic + zor); // This should be changed to whatever is chosen
                const validQuestions = fetchedQuestions.filter(q => q.option1 && q.option2 && q.option3 && q.option4); // Adjust validation criteria as needed
                setQuestions(validQuestions);
            } catch (error) {
                console.error(error);
            }
        };
        loadQuestions();
    }, []);

    const handleOptionPress = (option, actualAnswer) => {
        if (correct === 0) {
            if (option === actualAnswer) {
                console.log("Correct Answer");
                let temp = p; // This part is used to increment the points
                const myObject1 = {
                    points: temp + 1,
                    lastlogin: date.getDate(),
                    lastchosen: topic,
                };
                storeObject('userInfo', myObject1);
                setNewArrays(alevel, sat, calculus1, topic, difficulty, true);
            } else {
                setNewArrays(alevel, sat, calculus1, topic, difficulty, false);
            }
        }
    };

    const setNewArrays = (array1, array2, array3, topic, difficulty, isCorrect) => {
        let answeredobj;
        if (isCorrect) {
            setCorrect(1);
            if (topic === "Sat") {
                switch (difficulty) {
                    case 0:
                        answeredobj = {
                            Alevel: array1,
                            Sat: [1, array2[1], array2[2]],
                            Calculus1: array3,
                        };
                        break;
                    case 1:
                        answeredobj = {
                            Alevel: array1,
                            Sat: [array2[0], 1, array2[2]],
                            Calculus1: array3,
                        };
                        break;
                    case 2:
                        answeredobj = {
                            Alevel: array1,
                            Sat: [array2[0], array2[1], 1],
                            Calculus1: array3,
                        };
                        break;
                }
            } else if (topic === "Calculus1") {
                switch (difficulty) {
                    case 0:
                        answeredobj = {
                            Alevel: array1,
                            Sat: array2,
                            Calculus1: [1, array3[1], array3[2]],
                        };
                        break;
                    case 1:
                        answeredobj = {
                            Alevel: array1,
                            Sat: array2,
                            Calculus1: [array3[0], 1, array3[2]],
                        };
                        break;
                    case 2:
                        answeredobj = {
                            Alevel: array1,
                            Sat: array2,
                            Calculus1: [array3[0], array3[1], 1],
                        };
                        break;
                }
            } else {
                switch (difficulty) {
                    case 0:
                        answeredobj = {
                            Alevel: [1, array1[1], array1[2]],
                            Sat: array2,
                            Calculus1: array3,
                        };
                        break;
                    case 1:
                        answeredobj = {
                            Alevel: [array1[0], 1, array1[2]],
                            Sat: array2,
                            Calculus1: array3,
                        };
                        break;
                    case 2:
                        answeredobj = {
                            Alevel: [array1[0], array1[1], 1],
                            Sat: array2,
                            Calculus1: array3,
                        };
                        break;
                }
            }
        } else {
            if (topic === "Sat") {
                switch (difficulty) {
                    case 0:
                        answeredobj = {
                            Alevel: array1,
                            Sat: [2, array2[1], array2[2]],
                            Calculus1: array3,
                        };
                        break;
                    case 1:
                        answeredobj = {
                            Alevel: array1,
                            Sat: [array2[0], 2, array2[2]],
                            Calculus1: array3,
                        };
                        break;
                    case 2:
                        answeredobj = {
                            Alevel: array1,
                            Sat: [array2[0], array2[1], 2],
                            Calculus1: array3,
                        };
                        break;
                }
            } else if (topic === "Calculus1") {
                switch (difficulty) {
                    case 0:
                        answeredobj = {
                            Alevel: array1,
                            Sat: array2,
                            Calculus1: [2, array3[1], array3[2]],
                        };
                        break;
                    case 1:
                        answeredobj = {
                            Alevel: array1,
                            Sat: array2,
                            Calculus1: [array3[0], 2, array3[2]],
                        };
                        break;
                    case 2:
                        answeredobj = {
                            Alevel: array1,
                            Sat: array2,
                            Calculus1: [array3[0], array3[1], 2],
                        };
                        break;
                }
            } else {
                switch (difficulty) {
                    case 0:
                        answeredobj = {
                            Alevel: [2, array1[1], array1[2]],
                            Sat: array2,
                            Calculus1: array3,
                        };
                        break;
                    case 1:
                        answeredobj = {
                            Alevel: [array1[0], 2, array1[2]],
                            Sat: array2,
                            Calculus1: array3,
                        };
                        break;
                    case 2:
                        answeredobj = {
                            Alevel: [array1[0], array1[1], 2],
                            Sat: array2,
                            Calculus1: array3,
                        };
                        break;
                }
            }
            setCorrect(2);
        }
        storeObject('answeredQuestion', answeredobj);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colour }]}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronDoubleLeftIcon width={24} height={24} />
                    </TouchableOpacity>
                    <Text style={styles.questionText}></Text>
                </View>
                <View>
                    {questions.length === 0 ? (
                        <View style={styles.noQuestionsContainer}>
                            <Text style={styles.noQuestionsText}>No Question Uploaded Today</Text>
                        </View>
                    ) : (
                        <View key={questions[questions.length - 1].id} style={styles.questionBlock}>
                            {questions[questions.length - 1].url && (
                                <Image
                                    source={{ uri: questions[questions.length - 1].url }}
                                    style={styles.image}
                                />
                            )}
                            <TouchableOpacity 
                                onPress={() => handleOptionPress(1, questions[questions.length - 1].answer)}
                                disabled={correct !== 0}
                                style={[styles.optionButton, correct !== 0 && styles.disabledButton, questions[questions.length - 1].answer === 1 && correct !== 0 && { backgroundColor: 'green' }]}
                            >
                                <Text style={styles.optionText}>Option 1: {questions[questions.length - 1].option1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleOptionPress(2, questions[questions.length - 1].answer)}
                                disabled={correct !== 0}
                                style={[styles.optionButton, correct !== 0 && styles.disabledButton, questions[questions.length - 1].answer === 2 && correct !== 0 && { backgroundColor: 'green' }]}
                            >
                                <Text style={styles.optionText}>Option 2: {questions[questions.length - 1].option2}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleOptionPress(3, questions[questions.length - 1].answer)}
                                disabled={correct !== 0}
                                style={[styles.optionButton, correct !== 0 && styles.disabledButton, questions[questions.length - 1].answer === 3 && correct !== 0 && { backgroundColor: 'green' }]}
                            >
                                <Text style={styles.optionText}>Option 3: {questions[questions.length - 1].option3}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => handleOptionPress(4, questions[questions.length - 1].answer)}
                                disabled={correct !== 0}
                                style={[styles.optionButton, correct !== 0 && styles.disabledButton, questions[questions.length - 1].answer === 4 && correct !== 0 && { backgroundColor: 'green' }]}
                            >
                                <Text style={styles.optionText}>Option 4: {questions[questions.length - 1].option4}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
    correctButton: {
        backgroundColor: 'green',
    },
    incorrectButton: {
        backgroundColor: 'red',
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
    noQuestionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noQuestionsText: {
        fontSize: 18,
        color: 'red',
    },
});

export default QuestionSpecificScreen;
