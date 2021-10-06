import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import logo from '../assets/FinBud-icon.png'
import info from '../assets/Info-screen.jpg'

export default function InfoScreen({navigation}) {

    const HandleButtonClick = () =>{
        navigation.navigate('Login')
    };

    return (
        <View style={style.InfoScreenStyle} >
            <Image source={logo} style={style.LogoStyle} fadeDuration={1000} />
            <Image source={info} style={style.ImageStyle} fadeDuration={500} />
            <TouchableOpacity style={style.ButtonStyle} onPress={HandleButtonClick}><Text style={style.buttonTextStyle}>START YOUR JOURNEY</Text></TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    InfoScreenStyle: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogoStyle: {
        width:205,
        height:139,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0
    },
    ImageStyle: {
        width:355,
        height:489,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 160
    },
    TextStyle:{
        fontSize:25,
        fontWeight:'bold',
        color:'#05c7f2',
        padding:25,
        position:'absolute',
        top:160,
        textAlign: 'center',

    },
    ButtonStyle:{
        backgroundColor:'#05c7f2',
        width:330,
        alignItems:'center',
        padding:10,
        borderRadius:15,
        position:'absolute',
        bottom:80
    },
    buttonTextStyle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
    }
});    
