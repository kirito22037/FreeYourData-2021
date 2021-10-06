import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import logo from '../assets/FinBud-icon.png'
import loader from '../assets/loader-balls.gif';
import {CLIENT_API_KEY,SIGNING_PRIVATE_KEY} from '@env'
import rs from 'jsrsasign'
import Toast from 'react-native-toast-message';

export default function ApproveScreen({navigation,route}) {
    const [spinloader,SetLoader] = useState(false);
    
    const makeDetachedJWS = (header, body, privateKey) => { 
        let jwt =  rs.KJUR.jws.JWS.sign(null, header, body, privateKey); 
        let splittedJWS = jwt.split("."); 
        splittedJWS[1] = ""; 
        return splittedJWS.join("."); 
    }
    
    const HandleButtonClick = async () =>{
        SetLoader(true);    
        /*
            Check Consent Artefact Status
        */
        const header = {"alg" : "RS256", "typ" : "JWT"};
        const privateKey = SIGNING_PRIVATE_KEY;
        const body = "/Consent/handle/" + route.params.ConsentHandle
        const detachedJWS = await makeDetachedJWS(header, body, privateKey) 
        
        try{
            let response = await fetch('https://aa-sandbox.setu.co/Consent/handle/'+route.params.ConsentHandle,{
                method: 'GET',
                headers: {
                    'client_api_key':CLIENT_API_KEY,
                    'x-jws-signature':detachedJWS
                },
            })
            let res = await response.json();
            //console.log("1.Consent Artefact Status :",res);
            
            if(response.status != 200)
            {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Fetch Data',
                    text2: 'Try Again'
                  });    
            }else if(res["ConsentStatus"]["status"]=="READY"){ //Consent is Approved by User
                
                console.log("Consent Artefact is Ready")
                //Move to Fetch Data screen and start data fetching
                navigation.navigate('Fetch',{Phone:route.params.Phone,ConsentHandle:res["ConsentHandle"],ConsentId:res["ConsentStatus"]["id"]});
            }
            else{
                Toast.show({
                    type: 'error',
                    text1: 'Consent not approved by User',
                    text2: 'Approve it, then Try Again'
                  });
            }
            SetLoader(false);
        } catch(error){
            Toast.show({
                type: 'error',
                text1: 'Failed to Fetch Data',
                text2: 'Try Again'
              });
            console.log(error);
            SetLoader(false);
        }
    }
    return (
        <View style={style.ApproveScreenStyle} >
            <Image source={logo} style={style.LogoStyle} fadeDuration={1000} />
            <Text numberOfLines={2} style={style.TextStyle}>Consent Request Sent Approve it to continue</Text>
            <Image source={loader} style={style.Loader} fadeDuration={1000}/>
            {spinloader ? <Image source={loader} style={style.ButtonLoader} fadeDuration={1000}/>:<TouchableOpacity style={style.ButtonStyle} onPress={HandleButtonClick}><Text style={style.buttonTextStyle}>Click Here after Approving</Text></TouchableOpacity>}
        </View>
    )
}

const style = StyleSheet.create({
    ApproveScreenStyle: {
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
        top:160,
        textAlign: 'center',

    },
    Loader:{
        width:100,
        height:150,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 350,
    },
    ButtonLoader:{
        width:70,
        height:50,
        position:'absolute',
        bottom:230
    },
    ButtonStyle:{
        backgroundColor:'#05c7f2',
        width:310,
        alignItems:'center',
        padding:10,
        borderRadius:15,
        position:'absolute',
        bottom:230
    },
    buttonTextStyle:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
    }
});    
