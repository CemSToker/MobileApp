import React from 'react';
import { View, StyleSheet, Dimensions, useColorScheme, TouchableOpacity } from 'react-native';
import { CheckIcon, XMarkIcon } from 'react-native-heroicons/solid';

const { width } = Dimensions.get('window');

const QuestionCard = (props) => {
    const colorScheme = useColorScheme();

    const cardBackgroundColor = colorScheme === 'dark' ? '#333' : 'white';
    const shadowColor = colorScheme === 'dark' ? '#888' : '#000';

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
            <View style={[styles.card, { backgroundColor: props.colour1, shadowColor: shadowColor }]}>
                <View style={styles.iconContainer}>
                    {props.solved === 1 && <CheckIcon color="white" width={24} height={24} />}
                    {props.solved === 2 && <XMarkIcon color="white" width={24} height={24} />}
                </View>
                {props.children}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.5 ,  // 50% of the screen width minus a small margin
        marginHorizontal: 3,  // Added left margin
        marginVertical: 5,  // Split the margin into top and bottom margins to replace the margin shorthand
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        height: 100,
        position: 'relative', // Ensure positioning context for iconContainer
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
    },
});

export default QuestionCard;
