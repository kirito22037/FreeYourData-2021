import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import logo from '../assets/FinBud-icon.png'
import loader from '../assets/loader-balls.gif';
import {CLIENT_API_KEY,SIGNING_PRIVATE_KEY} from '@env'
import rs from 'jsrsasign'
import Toast from 'react-native-toast-message';
import uuid from 'uuid';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FetchDataScreen({navigation,route}) {
    const [status, SetStatus] = useState("Checking Consent Status...")

    const makeDetachedJWS = (header, body, privateKey) => { 
        let jwt =  rs.KJUR.jws.JWS.sign(null, header, body, privateKey); 
        let splittedJWS = jwt.split("."); 
        splittedJWS[1] = ""; 
        return splittedJWS.join("."); 
    }

    const fetchData = async() => {    
        /*
            Check Fetched Signed Consent
        */
        const header = {"alg" : "RS256", "typ" : "JWT"};
        const privateKey = SIGNING_PRIVATE_KEY;
        const body = "/Consent/" + route.params.ConsentId
        const detachedJWS = await makeDetachedJWS(header, body, privateKey) 
        
        try{
            let response = await fetch('https://aa-sandbox.setu.co/Consent/'+route.params.ConsentId,{
                method: 'GET',
                headers: {
                    'client_api_key':CLIENT_API_KEY,
                    'x-jws-signature':detachedJWS
                },
            })
            let res = await response.json();
            //console.log("2.Fetched Signed Consent: ",res);
            
            if(response.status != 200)
            {
                Toast.show({
                    type: 'error',
                    text1: 'Consent Expired!',
                    text2: 'Re-approve Consent Request'
                  }); 
                  
                navigation.navigate('Login')

            }
            else if(res["status"]=="ACTIVE"){//If Consent is Active, move onto fetch Data
                console.log("Consent is Active")
                SetStatus("Fetching Data...");
                try{
                    await AsyncStorage.setItem('ConsentHandle', route.params.ConsentHandle);
                    await AsyncStorage.setItem('ConsentId', route.params.ConsentId);
                    await AsyncStorage.setItem('Phone', route.params.Phone);
                }catch(error){
                    console.log("Error in Storing Data in Async: ",error);
                }
                /*
                    Step 1 : Generate Key Material
                */
                
                let keyresponse = await fetch('https://rahasya.setu.co/ecc/v1/generateKey',{
                    method: 'GET',
                })
                
                let keyres = await keyresponse.json();

                //console.log("3.Generated Key:", keyres);
                
                /*
                    Step 2: Request FI Data from FIP
                */
                const dateNow= new Date();
                const fetchbody = {
                    "ver": "1.0",
                    "timestamp": dateNow.toISOString(),
                    "txnid": uuid.v4(),
                    "FIDataRange": {
                        "from": "2021-01-02T11:39:57.153Z",
                        "to": dateNow.toISOString()
                    },
                    "Consent": {
                        "id": route.params.ConsentId  ,
                        "digitalSignature": res["signedConsent"].split('.')[2]
                    },
                    "KeyMaterial": keyres["KeyMaterial"]
                }
                //console.log("Request Data body:",fetchbody)
                let fetchdetachedJWS = await makeDetachedJWS(header, fetchbody, privateKey) 
                //console.log("JWT:",fetchdetachedJWS);
                
                let fetchresponse = await fetch('https://aa-sandbox.setu.co/FI/request',{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                        'client_api_key':CLIENT_API_KEY,
                        'x-jws-signature':fetchdetachedJWS
                    },
                    body: JSON.stringify(fetchbody)
                })
                
                let fetchreqres = await fetchresponse.json();
                //console.log("4.Request FI Data: ",fetchreqres);

                if(typeof fetchreqres["errorCode"] != 'undefined')
                {
                    console.log("Data Fetching Error:");
                    Toast.show({
                        type: 'error',
                        text1: 'Data Fetching Failed!',
                        text2: 'Try Again!'
                      });
                    await AsyncStorage.removeItem('ConsentHandle');
                    await AsyncStorage.removeItem('ConsentId');
                    await AsyncStorage.removeItem('Data');
                    await AsyncStorage.removeItem('Phone');
                    await AsyncStorage.removeItem(route.params.Phone);
                    
                    navigation.navigate('Login')
                }
                else{
                    /*
                        Step 3: Fetch FI Data(Encrypted)
                    */
                    const databody = "/FI/fetch" + fetchreqres["sessionId"];
                    let datadetachedJWS = await makeDetachedJWS(header, databody, privateKey) 
                        
                    let dataresponse = await fetch('https://aa-sandbox.setu.co/FI/fetch/'+fetchreqres["sessionId"],{
                        method: 'GET',
                        headers: {
                            'client_api_key':CLIENT_API_KEY,
                            'x-jws-signature':datadetachedJWS
                        },
                    })
                        
                    let datares = await dataresponse.json();
                    //console.log("5.Fetched Encrypted Data :",datares["FI"][0]["data"][0]["encryptedFI"])
                    
                    SetStatus("Decrypting Data...");
                    
                    /*
                        Step 4: Decrypt Data
                    */
                    
                    const decrypt_data_body = {
                        "base64Data": datares["FI"][0]["data"][0]["encryptedFI"] ,
                        "base64RemoteNonce": datares["FI"][0]["KeyMaterial"]["Nonce"],
                        "base64YourNonce": keyres["KeyMaterial"]["Nonce"] ,
                        "ourPrivateKey": keyres["privateKey"],
                        
                        "remoteKeyMaterial": datares["FI"][0]["KeyMaterial"]
                    } 

                    let decrypt_data_response = await fetch('https://rahasya.setu.co/ecc/v1/decrypt',{
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify(decrypt_data_body)
                    })
                        
                    let decrypt_data = await decrypt_data_response.json();
                    //console.log("6.Final Decrypted Data:",decrypt_data)

                    let final_data = base64.decode(decrypt_data["base64Data"]);
                    
                    try{
                        await AsyncStorage.setItem('Data', final_data);
                        await AsyncStorage.setItem('TimeStamp', dateNow.getTime().toString());
                    }catch(error){
                        console.log("Error in Storing Data in Async: ",error);
                    }

                    //console.log("7.Final Normal data",final_data);
                    SetStatus("Personalizing your Feed...");
                    
                    setTimeout(()=>{
                        navigation.navigate('TabNav');
                    },4000);    
                }    
            }
            else if(res["status"]=="REJECTED")
            {
                Toast.show({
                    type: 'error',
                    text1: 'Consent Request Rejected',
                    text2: 'Please approve it to continue'
                  });
                navigation.navigate('Login')     
            }
            else{
                Toast.show({
                    type: 'error',
                    text1: 'Consent Expired!',
                    text2: 'Re-approve Consent Request'
                  });
            }
            
        } catch(error){
            Toast.show({
                type: 'error',
                text1: 'Failed to Fetch Data!',
                text2: 'Try Again'
              });
            console.log(error);
        }    
    }

    useEffect( () => {
        fetchData();
    },[])   
    
    return (
        <View style={style.FetchDataScreenStyle} >
            <Image source={logo} style={style.LogoStyle} fadeDuration={1000} />
            <Image source={loader} style={style.Loader} fadeDuration={1000}/>
            <Text style={style.TextStyle}>Hang tight!{'\n\n'}{status}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    FetchDataScreenStyle: {
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
    TextStyle:{
        fontSize:25,
        fontWeight:'bold',
        color:'#05c7f2',
        padding:25,
        position:'absolute',
        top:260,
        textAlign: 'center',

    },
    Loader:{
        width:100,
        height:150,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 150,
    },
});    
