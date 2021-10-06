import React,{ useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import logo from '../assets/FinBud-icon.png'
import loader from '../assets/loader-balls.gif';
import bg from '../assets/background-1.jpg';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen({navigation}) {
    
    const checkStatus = async() =>{
      const data = await AsyncStorage.getItem('Data');
      if(data !== null)
      {
        console.log("Data is present");
        const time = parseInt(await AsyncStorage.getItem('TimeStamp'));
        const datenow = new Date();
        var difference = datenow.getTime() - time;
        var minutesDifference = Math.floor(difference/1000/60);

        const ConsentHandle = await AsyncStorage.getItem('ConsentHandle');
        const ConsentId = await AsyncStorage.getItem('ConsentId');
        
        console.log("Time:",minutesDifference);
        
        if(minutesDifference>61)
        {
          setTimeout(()=>{
            navigation.navigate('Fetch',{ConsentHandle:ConsentHandle,ConsentId:ConsentId});
          },3000);
        }
        else
        {
          setTimeout(()=>{
            navigation.navigate('Dashboard',{Data:data});
          },3000);  
        }
      }
      else
      {
        console.log("No Data is present");
        setTimeout(()=>{
          navigation.navigate('Info')
        },3000);
      }
    }

    useEffect( () => {
      checkStatus();
    },[]);
    
    return (
        <ImageBackground source={bg} resizeMode="cover" style={style.image}>
          <View style={style.WelcomeStyle}>
              <Image source={logo} style={{ width: 305, height: 159 }} fadeDuration={2000} />
              <Text style={style.MainText}>FinBud</Text>
              <Text style={{color:'#05c7f2', fontSize: 18}}>Your Finance Buddy</Text>
              <Image source={loader} style={style.Loader}/>
              <StatusBar style="auto"/>
          </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    image: {
      flex: 1,
    },
    MainText: {
      color:'#0cb1f2',
      fontSize: 38,
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    WelcomeStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Loader:{
      width:70,
      height:50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 50,
    }
  });
