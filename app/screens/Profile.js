import React, { useState } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loader from '../assets/loader-balls.gif';
import Toast from 'react-native-toast-message';

export default function Profile({navigation}) {
    const [spinloader,SetLoader] = useState(false);
    
    const HandleButtonClick = async () =>{
        SetLoader(true);
        const ConsentHandle = await AsyncStorage.getItem('ConsentHandle');
        const ConsentId = await AsyncStorage.getItem('ConsentId');
        const Phone = await AsyncStorage.getItem('Phone');

        await AsyncStorage.setItem(Phone,ConsentHandle + '<,>' + ConsentId);

        await AsyncStorage.removeItem('ConsentHandle');
        await AsyncStorage.removeItem('ConsentId');
        await AsyncStorage.removeItem('Data');
        await AsyncStorage.removeItem('Phone');
        setTimeout(()=>{
            Toast.show({
                type: 'success',
                text1: 'Logout Successful!',
              }); 
            
            navigation.navigate('Info')
          },3000);
    }  
    
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Deepak Tiwari</Text>
              <Text style={styles.info}>+91 6387403422</Text>
              <Text style={styles.emailinfo}>deepakait5090@gmail.com</Text>
              
              <TouchableOpacity onPress={HandleButtonClick} style={styles.buttonContainer}>
                {spinloader ? <Image source={loader} style={styles.ButtonLoader}/>:
                <Text style={{'color':'white'}}>Logout</Text>}
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  ButtonLoader:{
        width:70,
        height:50,
    },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  emailinfo:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10,
    marginBottom:20
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});