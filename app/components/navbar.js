import React,{useState} from 'react';
import { StyleSheet, Button , View , Alert, TouchableOpacity,Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NavBar({ setIndex }) {
    const [selected,Setselected] = useState(0);
    return(
        <View style = {styles.container}>
            {
                data.map((item , idx) => {
                    return(
                        <TouchableOpacity
                            key = {idx} 
                            style = {{flex: 1,alignItems: 'center'}} 
                            onPress = {() => {setIndex(idx);Setselected(idx)}}
                        >
                            <View>
                                {item.icon}
                            </View>
                            <Text style={styles.name}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#f7f7f7',
        padding: 10,
        borderWidth:2,
        borderRadius:20,
        borderColor:'#2255F9'

    },
    child: {
        textAlign: 'center'
    },
    name:{
        fontSize:10,
        fontWeight:'bold',
        color:'#A9A9AB'
    }
});

const data = [
    {
        "name" : 'Dashboard',
        "icon" : <Icon name = "dashboard" size = {35} color = "#05c7f2"/>
    },
    {
        "name" : 'Category',
        "icon" : <Icon name = "category" size = {35} color = "#05c7f2"/>
    },
    {
        "name" : 'Goals',
        "icon" : <Icon name = "account-balance-wallet" size = {35} color = "#05c7f2"/>
    },
    /*
    {
        "name" : 'Bank',
        "icon" : <Icon name = "account-balance" size = {35} color = "#05c7f2"/>
    },*/
    {
        "name" : 'Profile',
        "icon" : <Icon name = "admin-panel-settings" size = {35} color = "#05c7f2"/>
    }
];
