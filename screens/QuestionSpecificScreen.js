import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ChevronDoubleLeftIcon } from 'react-native-heroicons/outline';


const QuestionSpecificScreen = ({ navigation,route}) => {
    const {iscorrect, difficulty, topic} = route.params;
    const [colour,setcolour]= useState('#f5f5f5')
    useEffect(() => {
        if (iscorrect === 0) {   //Not attempted so you must give if they answer and make all buttons pressable
            setcolour('#f5f5f5');
        } else if (iscorrect === 1) {
            setcolour("red");      //Got it wrong          //If 1 or 2 show the correct answer
        } else if (iscorrect === 2) {    //Got it correct
            setcolour("green");
        }
      }, [iscorrect]);
    
    return (
        <SafeAreaView style={[styles.container,{backgroundColor:colour}]}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        
                        <ChevronDoubleLeftIcon width={24} height={24} />
                    </TouchableOpacity>
                    <Text style={styles.question}></Text>
                    
                </View>
                
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',  // Light gray background
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,  // Rounded corners
        padding: 16,  // Inner padding for the card content
        margin: 16,  // Margin around the card
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,  // Elevation for Android
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    question: {
        marginLeft: 10,
        flex: 1,
        fontSize: 16,
    },
    answerCount: {
        marginTop: 10,
        fontSize: 14,
        color: 'grey',
    },
});

export default QuestionSpecificScreen;
