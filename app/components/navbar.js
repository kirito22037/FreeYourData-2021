import React from 'react';
import { StyleSheet, Button , View , Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NavBar({ setIndex }) {
    return(
        <View style = {styles.container}>
            {
                data.map((item , idx) => {
                    return(
                        <TouchableOpacity
                            key = {idx} 
                            style = {styles.childElements} 
                            onPress = {() => setIndex(idx)}
                        >
                            <View>
                                {item.icon}
                            </View>
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
    childElements: {
        flex: 1,
        alignItems: 'center',
        //borderWidth: 1,
    },
    child: {
        textAlign: 'center'
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
