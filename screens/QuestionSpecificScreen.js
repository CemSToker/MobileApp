// QuestionSpecificScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/outline';
import { fetchQuestions } from '../firebase';

const QuestionSpecificScreen = ({ navigation, route }) => {
    const { iscorrect, difficulty, topic } = route.params;
    const [colour, setColour] = useState('#f5f5f5');
    const [questions, setQuestions] = useState([]);

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
                const fetchedQuestions = await fetchQuestions();
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error(error);
            }
        };

        loadQuestions();
    }, []);

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
                            <Text style={styles.option}>Option 1: {question.option1}</Text>
                            <Text style={styles.option}>Option 2: {question.option2}</Text>
                            <Text style={styles.option}>Option 3: {question.option3}</Text>
                            <Text style={styles.option}>Option 4: {question.option4}</Text>
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
    option: {
        marginTop: 5,
        fontSize: 14,
        color: 'grey',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginTop: 2,
    },
});

export default QuestionSpecificScreen;
