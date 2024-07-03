import { View, Text,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import {UserCircleIcon,QuestionMarkCircleIcon,BoltIcon} from "react-native-heroicons/outline";
import {UserCircleIcon as Profile1} from "react-native-heroicons/outline";
import {QuestionMarkCircleIcon as Questions1} from "react-native-heroicons/outline";
import {BoltIcon as Answers1} from "react-native-heroicons/outline";
import {UserCircleIcon as Profile} from "react-native-heroicons/solid";
import {QuestionMarkCircleIcon as Questions} from "react-native-heroicons/solid";
import {BoltIcon as Answers} from "react-native-heroicons/solid";
import { useState } from 'react';
import { colours } from '../../colours';

const BottomTab = ({navigation,active}) => {
  const [ActiveTab,setActiveTab] = useState(active);
  
  //console.log(ActiveTab);YA
  //navigation.push(ActiveTab)

  const mainactivate =()=>{
    //setActiveTab("main")
    navigation.navigate("MainPage")
  }
  const questionsactivate =()=>{
    //setActiveTab("questions")
    navigation.navigate("QuestionPage")
  }
  
  
  return (
    
    <View style={[styles.wrapper,{backgroundColor:colours.bottomtab}]}>
      <View style={styles.wrapper2}>
    



    {/**Questions Tab */}
    {ActiveTab!="main" && <TouchableOpacity onPress={mainactivate}>
      <Questions1 size={50} color={colours.main}/>
      {/**console.log(ActiveTab)*/}
    </TouchableOpacity>}
    {ActiveTab==="main" && <TouchableOpacity disabled={true} onPress={mainactivate}>
      <Questions size={50} color={colours.main}/>
      {/**console.log(ActiveTab)*/}
    </TouchableOpacity>}

    {ActiveTab!="questions" && <TouchableOpacity onPress={questionsactivate}>
      <Questions1 size={50} color={colours.main}/>
      {/**console.log(ActiveTab)*/}
    </TouchableOpacity>}
    {ActiveTab==="questions" && <TouchableOpacity disabled={true} onPress={questionsactivate}>
      <Questions size={50} color={colours.main}/>
      {/**console.log(ActiveTab)*/}
    </TouchableOpacity>}

    


      </View>
    </View>
  )
}

const styles =StyleSheet.create({
    wrapper:{
        position:"absolute",
        width:"100%",
        bottom:0,
        zIndex:999,
        backgroundColor:colours.bottomtab,
        opacity: 1,
    },
    wrapper2:{flexDirection:"row",justifyContent:"space-around",height:55,paddingTop:5,marginBottom:5,borderRadius: 20}


    

});

export default BottomTab