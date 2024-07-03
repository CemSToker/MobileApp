import { View, Text } from 'react-native'
import React from 'react'
import BottomTab from '../components/main/BottomTab'


const QuestionPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>QuestionPage</Text>

      <BottomTab navigation={navigation} active={"questions"}/>
    </View>
  )
}

export default QuestionPage