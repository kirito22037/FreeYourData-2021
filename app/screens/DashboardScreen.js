import React from 'react';
import { StyleSheet, Text, View, Dimensions,ScrollView, TouchableOpacity } from 'react-native';
import AccountDetail from '../components/accountDetail';
import BarGraph from '../components/bargraph';

const Earningdata = [{
    bankName: "SBI",
    address: "4/1290, 785th Cross, 13rd Main, 7th Block, Bangalore - 569911",
    dob: "24-07-1970",
    email: "ram.sapan@gmail.com",
    mobile: "91729391923",
    name: "Ramkrishna Sapan",
    income: {
        labels: ["April", "May", "June", "July", "Aug", "Sept"],
        datasets: [{
            data: [45, 43, 42, 40, 42, 45]
        }]
    },
    outgoing: {
        labels: ["April", "May", "June", "July", "Aug", "Sept"],
        datasets: [{
            data: [10, 15, 28, 8, 9, 23]
        }]
    },
    transactions: [{
            "amount": "1239",
            "currentBalance": "62289.25",
            "mode": "UPI",
            "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
            "reference": "RFN00013383",
            "transactionTimestamp": "2021-04-01T13:20:14+05:30",
            "txnId": "M3258741",
            "type": "DEBIT",
            "valueDate": "2021-04-01"
    }, {
        "amount": "342",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258742",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "2000",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258743",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "987",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258744",
        "type": "DEBIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "7777",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258745",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "7651",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258746",
        "type": "DEBIT",
        "valueDate": "2021-04-01"
      }]
  },
  {
    bankName: "Axis Bank",
    address: "4/1290, 785th Cross, 13rd Main, 7th Block, Bangalore - 569911",
    dob: "24-07-1970",
    email: "ram.sapan@gmail.com",
    mobile: "91729391923",
    name: "Ramkrishna Sapan",
    income: {
        labels: ["April", "May", "June", "July", "Aug", "Sept"],
        datasets: [{
            data: [56, 82, 70, 38, 77, 60]
        }]
    },
    outgoing: {
        labels: ["April", "May", "June", "July", "Aug", "Sept"],
        datasets: [{
            data: [34, 42, 33, 51, 39, 44]
        }]},
    transactions: [{
            "amount": "1239",
            "currentBalance": "62289.25",
            "mode": "UPI",
            "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
            "reference": "RFN00013383",
            "transactionTimestamp": "2021-04-01T13:20:14+05:30",
            "txnId": "M3258747",
            "type": "DEBIT",
            "valueDate": "2021-04-01"
    }, {
        "amount": "342",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258748",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "2000",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258749",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "987",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258751",
        "type": "DEBIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "7777",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258752",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "7651",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258753",
        "type": "DEBIT",
        "valueDate": "2021-04-01"
      }]
  },
  {
    bankName: "ICIC Bank",
    address: "4/1290, 785th Cross, 13rd Main, 7th Block, Bangalore - 569911",
    dob: "24-07-1970",
    email: "ram.sapan@gmail.com",
    mobile: "91729391923",
    name: "Ramkrishna Sapan",
    income: {
        labels: ["April", "May", "June", "July", "Aug", "Sept"],
        datasets: [{
            data: [97, 67, 32, 56, 47, 66]
        }]
    },
    outgoing: {
        labels: ["April", "May", "June", "July", "Aug", "Sept"],
        datasets: [{
            data: [32, 44, 34, 55, 32, 41]
        }]},
    transactions: [{
            "amount": "1239",
            "currentBalance": "62289.25",
            "mode": "UPI",
            "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
            "reference": "RFN00013383",
            "transactionTimestamp": "2021-04-01T13:20:14+05:30",
            "txnId": "M3258761",
            "type": "DEBIT",
            "valueDate": "2021-04-01"
    }, {
        "amount": "342",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258763",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "2000",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258762",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "987",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258764",
        "type": "DEBIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "7777",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258765",
        "type": "CREDIT",
        "valueDate": "2021-04-01"
      },
      {
        "amount": "7651",
        "currentBalance": "62289.25",
        "mode": "UPI",
        "narration": "UPI/935314560764/getsimpl/simpl@axisbank/Axis Bank",
        "reference": "RFN00013383",
        "transactionTimestamp": "2021-04-01T13:20:14+05:30",
        "txnId": "M3258766",
        "type": "DEBIT",
        "valueDate": "2021-04-01"
      }]
  }];

export default function DashboardScreen({ navigation }) {

    const screenWidth = Dimensions.get("window").width-20;
    const oldDateObj = new Date();
    const timenow = new Date(oldDateObj.getTime() + 328*60000).toISOString().split('T')[1].substring(0,5);
    
    // const Spentdata = [{
    //     bankName: "SBI",
    //     address: "4/1290, 785th Cross, 13rd Main, 7th Block, Bangalore - 569911",
    //     dob: "24-07-1970",
    //     email: "ram.sapan@gmail.com",
    //     mobile: "91729391923",
    //     name: "Ramkrishna Sapan",
    //     labels: ["April", "May", "June", "July", "Aug", "Sept"],
    //     datasets: [
    //       {
    //         data: [10, 15, 28, 8, 9, 23]
    //       }
    //     ]
    //   },{
    //     bankName: "Axis Bank",
    //     address: "4/1290, 785th Cross, 13rd Main, 7th Block, Bangalore - 569911",
    //     dob: "24-07-1970",
    //     email: "ram.sapan@gmail.com",
    //     mobile: "91729391923",
    //     name: "Ramkrishna Sapan",
    //     labels: ["April", "May", "June", "July", "Aug", "Sept"],
    //     datasets: [
    //     {
    //         data: [34, 42, 33, 51, 39, 44]
    //     }
    //     ]
    //   },{
    //     bankName: "ICIC Bank",
    //     address: "4/1290, 785th Cross, 13rd Main, 7th Block, Bangalore - 569911",
    //     dob: "24-07-1970",
    //     email: "ram.sapan@gmail.com",
    //     mobile: "91729391923",
    //     name: "Ramkrishna Sapan",
    //     labels: ["April", "May", "June", "July", "Aug", "Sept"],
    //     datasets: [
    //     {
    //         data: [32, 44, 34, 55, 32, 41]
    //     }
    //     ]
    //   }];

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            
            <View style={{...styles.container, paddingBottom: 10 }}>
                <TouchableOpacity onPress={ ()=>{ navigation.navigate('BankAccList', { data: Earningdata }); } } >
                    <View style={ {...styles.card, padding: 20, marginTop:15, marginHorizontal: 10} }>
                        <View style = {styles.header}>
                            <Text style={styles.heading} >Account Balances</Text>
                            <Text style = {{ flex: 2 , textAlign: 'right',fontSize:10}}>Last Refreshed Today @ {timenow}</Text>
                        </View>
                        <View style={styles.details}>
                            <AccountDetail type="current" />
                            <AccountDetail type="credit" />
                            <AccountDetail type="savings" />
                        </View>
                    </View>
                </TouchableOpacity>

                <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                    {
                        Earningdata.map( data=>{
                            return (
                                <TouchableOpacity 
                                key={ data.bankName }
                                onPress={ ()=>{ navigation.navigate('AccountDetails', data )} }>
                                    <View key={`income-${data.bankName}`}>
                                        <BarGraph 
                                        data={data.income} 
                                        width={screenWidth} 
                                        barColor='rgba(50, 168, 82, 1)' 
                                        title={`Money Coming In ${data.bankName}`} 
                                        labelColor="rgba(1, 122, 205, 1)" />
                                    </View> 
                                </TouchableOpacity>
                                );
                        })
                    }
                </ScrollView>
                    
                <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                    {
                        Earningdata.map( data=>{
                            return (
                            <TouchableOpacity 
                            key={ data.bankName }
                            onPress={ ()=>{ navigation.navigate('AccountDetails', data )} }>
                                <View key={`expense-${data.bankName}`}>
                                    <BarGraph
                                    data={data.outgoing} 
                                    width={screenWidth} 
                                    barColor='rgba(189, 58, 58, 1)' 
                                    title={`Money Going Out from ${data.bankName}`} 
                                    labelColor="rgba(1, 122, 205, 1)" />
                                </View>
                            </TouchableOpacity> );
                        })
                    }
                </ScrollView>
            </View>

        </ScrollView>
        
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },      
    header: {
        //padding: 3,
        borderBottomRightRadius: 20,
        flexDirection: 'row'
    },
    card: {
        //width: Dimensions.get("window").width-10,
        borderStyle: 'dotted',
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: "#dcdee0"
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18
    },
    details: {
        marginTop: 20
    },
});