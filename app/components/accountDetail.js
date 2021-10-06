import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

export default function AccountDetail( {type} ) {
    switch( type ){
        case "current":
            return <View style={styles.flexRow}>
            <MaterialIcons name="account-balance-wallet" size={24} color="black" />
            <Text style={ {...styles.highlight, color: "blue"} }> ₹ 53,000 </Text>
            <Text>in your current accounts</Text>            
        </View>

        case "credit":
            return <View style={styles.flexRow}>
            <Ionicons name="md-card" size={24} color="black" />
                <Text style={ {...styles.highlight, color: "red"} }> ₹ 1,23,000 </Text>
                <Text>on your credit card</Text>            
            </View>
        
        default :
            return <View style={styles.flexRow}>
            <MaterialCommunityIcons name="piggy-bank" size={24} color="black" />
            <Text style={ {...styles.highlight, color: "green"} }> ₹ 80,000 </Text>
            <Text>in your savings account</Text>            
        </View>
    }
}

const styles = StyleSheet.create({
    flexRow : {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    highlight: {
        fontWeight: "bold",
        fontSize: 20    
    },
});