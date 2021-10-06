import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native'
import logo from '../assets/FinBud-icon.png'
import loader from '../assets/loader-balls.gif';
import uuid from 'uuid'
import rs from 'jsrsasign'
import {CLIENT_API_KEY,SIGNING_PRIVATE_KEY} from '@env'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({navigation}) {
    const [phone,SetPhone] = useState("");
    const [spinloader,SetLoader] = useState(false);
    
    const makeDetachedJWS = (header, body, privateKey) => { 
        let jwt =  rs.KJUR.jws.JWS.sign(null, header, body, privateKey); 
        let splittedJWS = jwt.split("."); 
        splittedJWS[1] = ""; 
        return splittedJWS.join("."); 
    }

    const HandleButtonClick = async () =>{
        SetLoader(true);
        const dateNow= new Date();
        /*
            Check if consent with number is already there
        */
        const data = await AsyncStorage.getItem(phone);
        if(data!=null)
        {
            console.log('Already Consent Present');
            setTimeout(()=>{
                navigation.navigate('Fetch',{Phone:phone,ConsentHandle:data.split('<,>')[0],ConsentId:data.split('<,>')[1]});
            },2000);
        }
        else{
            /*
                Create Consent Request Body
            */
            const header = {"alg" : "RS256", "typ" : "JWT"};
            const privateKey = SIGNING_PRIVATE_KEY;
            const body = {
                "ver": "1.0",
                "timestamp": dateNow.toISOString(),
                "txnid": uuid.v4(),
                "ConsentDetail": {
                    "consentStart": dateNow.toISOString(),
                    "consentExpiry": "2021-12-31T11:39:57.153Z",
                    "consentMode": "STORE",
                    "fetchType": "PERIODIC",
                    "consentTypes": [
                        "TRANSACTIONS",
                        "PROFILE",
                        "SUMMARY"
                    ],
                    "fiTypes": [
                        "DEPOSIT",
                        "BONDS",
                        "INSURANCE_POLICIES",
                        "TERM_DEPOSIT",
                        "RECURRING_DEPOSIT",
                        "CREDIT_CARD",
                        "SIP",
                        "ETF",
                        "ULIP"
                    ],
                    "DataConsumer": {
                        "id": uuid.v4()
                    },
                    "Customer": {
                        "id": phone + "@setu-aa"
                    },
                    "Purpose": {
                        "code": "101",
                        "refUri": "https://api.rebit.org.in/aa/purpose/101.xml",
                        "text": "Personal Finance Management",
                        "Category": {
                            "type": "string"
                        }
                    },
                    "FIDataRange": {
                        "from": "2021-01-01T11:39:57.153Z",
                        "to": dateNow.toISOString()
                    },
                    "DataLife": {
                        "unit": "MONTH",
                        "value": 1
                    },
                    "Frequency": {
                        "unit": "HOUR",
                        "value": 99
                    },
                }
            }

            const detachedJWS = await makeDetachedJWS(header, body, privateKey) 
            
            /*
                POST Create Consent Request
            */
            try{
                let response = await fetch('https://aa-sandbox.setu.co/Consent',{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'client_api_key':CLIENT_API_KEY,
                        'x-jws-signature':detachedJWS
                    },
                    body: JSON.stringify(body)
                })
                let res = await response.json();
                
                console.log("Constent Id is",res["ConsentHandle"]);

                if(response.status != 200) //Error
                {
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to send Consent Request',
                        text2: 'Try Again'
                    });    
                }else{ //Consent Creation Successful
                    Toast.show({
                        type: 'success',
                        text1: 'Consent Request Sent Successfully',
                        text2: 'Approve the request to continue'
                    });
                    console.log("Consent Request Sent Successfully")
                    navigation.navigate('Approve',{Phone:phone,ConsentHandle:res["ConsentHandle"]}); //Move to Approval Screen
                }
                SetLoader(false);
            } catch(error){ //Error
                Toast.show({
                    type: 'error',
                    text1: 'Failed to send Consent Request',
                    text2: 'Try Again'
                });
                console.log(error);
                SetLoader(false);
            }
        }       
    }
    
    return (
        <View style={style.LoginScreenStyle} >
            <Image source={logo} style={style.LogoStyle} fadeDuration={1000} />
            
            <TextInput keyboardType={'phone-pad'} style={style.InputStyle} placeholder="Enter your Mobile Number" onChangeText={phone => SetPhone(phone)}></TextInput>
            {spinloader ? <Image source={loader} style={style.Loader} fadeDuration={1000}/> : <TouchableOpacity style={style.ButtonStyle} onPress={HandleButtonClick}><Text style={style.buttonTextStyle}>Continue</Text></TouchableOpacity>}
        </View>
    )
}

const style = StyleSheet.create({
    LoginScreenStyle: {
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
    InputStyle:{
        height:45,
        width:300,
        margin:12,
        borderWidth: 1.5,
        borderRadius:12,
        padding: 10,
        borderColor:'#0cb1f2'
        
    },
    Loader:{
      width:70,
      height:50,
    },
    ButtonStyle:{
        backgroundColor:'#05c7f2',
        width:110,
        alignItems:'center',
        padding:10,
        borderRadius:15
    },
    buttonTextStyle:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
    }
});


