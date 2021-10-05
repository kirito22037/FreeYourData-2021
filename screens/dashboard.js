import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import AccountDetail from '../shared-components/dashboard/accountDetail.js';
import BarGraph from '../shared-components/dashboard/bargraph.js';
export default function Dashboard() {

    const screenWidth = Dimensions.get("window").width-30;

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
      };

    

    return (
        <View style={ {...styles.mt15, ...styles.container} }>
            <View style={ { ...styles.mt15,...styles.card, padding: 20} }>
                <Text style={styles.heading} >Account Balances</Text>
                <View style={styles.details}>
                    <AccountDetail type="current" />
                    <AccountDetail type="credit" />
                    <AccountDetail type="savings" />
                </View>
            </View>

            <BarGraph data={data} width={screenWidth} barColor='rgba(50, 168, 82, 1)' title="Money Coming In" labelColor="rgba(1, 122, 205, 1)" />
            <BarGraph data={data} width={screenWidth} barColor='rgba(189, 58, 58, 1)' title="Money Going Out" labelColor="rgba(1, 122, 205, 1)" />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    card: {
        width: Dimensions.get("window").width-30,
        borderStyle: 'dotted',
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: "#e3e2e1"
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18
    },
    details: {
        marginTop: 20
    },
    mt15: {
        marginTop: 15
    }
});