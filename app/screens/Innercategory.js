import React, { useState } from 'react';
import {ScrollView, StyleSheet, Text, View , Dimensions,Image, FlatList , Switch, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import {
    LineChart
} from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';


export default function InnerCategory ({navigation,route}) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [LabelIndex,setLabelIndex] = useState(0);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if(!isEnabled)
        {
            Toast.show({
                type: 'success',
                text1: 'Alert Activated for '+route.params.Name+' expenses!',
            });
        }else
        {
            Toast.show({
                type: 'success',
                text1: 'Alert Deactivated for '+route.params.Name+' expenses!',
            });
        }
    }
    const oldDateObj = new Date();
    const timenow = new Date(oldDateObj.getTime() + 328*60000).toISOString().split('T')[1].substring(0,5);
    
    
    const getLabel = (idx) => {
        switch(idx) {
            case 0: return ["2020-Q3","2020-Q4","2021-Q1","2021-Q2","2021-Q3","2021-Q4"]
            case 1: return ["Jan","Feb","March","Apr","May","June","July","Aug","Sept"]
            case 2: return ["Apr","May","June","July","Aug","Sept"]
            case 3: return ["Week 1","Week 2","Week 3","Week 4"]
            case 4: return ["Mon","Tues","Wed","Thurs","Fri","Sat","Sun"]
        }
    }

    const getTransactionRows = () => {
        return(
            <View style = {{flex: 1 , flexDirection: 'column'}}>
                { 
                    dummyData[route.params.Type].map((txn , idx) => {
                        return(
                            <TouchableHighlight 
                                key = {idx}
                                style = {styles.txnRows}
                            >
                                <>
                                    <Image source={ txn.icon.length !=0 ? {uri:txn.icon}:{uri:'https://logo.clearbit.com/questionpro.com'}} style = {{ height: 50,width:50}}></Image>
                                    <View style = {{ flexDirection: 'column' , flex: 3}}>
                                        <Text style = {{textAlignVertical: 'center' , marginLeft: 10 , flex: 1,fontWeight:'bold'}}> {txn.recipent} </Text>
                                        <Text style = {{textAlignVertical: 'center' , marginLeft: 10 , flex: 1}}> {txn.txnDate} </Text>
                                    </View> 
                                    {
                                        txn.txnType === 'Credit' ? 
                                        <Text style = {{textAlignVertical: 'center' , color: 'green' , paddingRight: 30}}>+ ₹ {txn.txnAmount} </Text>
                                        :
                                        <Text style = {{textAlignVertical: 'center' , color: 'red' , paddingRight: 30}}>- ₹ {txn.txnAmount} </Text>
                                    }
                                </>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        )
    }
    
    return(
        <View style = {styles.container}>
            <Text style = {styles.headline}> {route.params.Name} </Text>
            <ScrollView style = {{ overflow: 'scroll' , flex: 1}}>
                <View style = {styles.body}>
                    <Text style = {{ flex: 1}}> Period </Text>
                    <Text style = {{ flex: 2 , textAlign: 'right'}}>Last Refreshed Today @ {timenow}</Text>
                </View>
                <View style = {{flexDirection: 'row' , marginTop : 10}}>
                    <TouchableOpacity style = {styles.token} onPress = {() => setLabelIndex(0)} ><Text style={ LabelIndex == 0 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}>All</Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.token} onPress = {() => setLabelIndex(1)}><Text style={ LabelIndex == 1 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}> 1 Yr </Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.token} onPress = {() => setLabelIndex(2)}><Text style={ LabelIndex == 2 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}> 6 Mon </Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.token} onPress = {() => setLabelIndex(3)}><Text style={ LabelIndex == 3 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}> 1 Mon </Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.token} onPress = {() => setLabelIndex(4)}><Text style={ LabelIndex == 4 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}> 1 week </Text></TouchableOpacity>
                </View>
                <LineChart
                data={{
                labels: getLabel(LabelIndex),
                datasets: [
                    {
                    data: [
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 20,
                        Math.random() * 20,
                        Math.random() * 50,
                        Math.random() * 50
                    ]
                    }
                ]
                }}
                width={Dimensions.get('window').width - 10}// from react-native
                height={220}
                yAxisLabel="₹ "
                yAxisSuffix="k"
                yAxisInterval={2} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16,
                    elevation: 10
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier 
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
            <View style = {{ flexDirection: 'column' , backgroundColor: '#3AB9A9' , padding: 2 , borderRadius: 15}}>
                <Text style = {{ fontSize: 15 }}> Monthly Budget </Text>
                <View style = {{ flexDirection: 'row' , marginTop: 10 , backgroundColor: '#3AB9A9'}}>
                    <Text style = {styles.textChild}> Min Spend {'\n'} ₹ {Math.floor(Math.random() * 1000)+100} </Text>
                    <Text style = {styles.textChild}> Max Spend {'\n'} ₹ {Math.floor(Math.random() * 10000)+2000} </Text>
                    <Text style = {styles.textChild}> Avg Spend {'\n'} ₹ {Math.floor(Math.random() * 5000)+2500} </Text>
                </View>
                <View style = {{ flexDirection: 'row' , marginTop: 5}}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style = {{ marginTop: 4}}> Send Alert when Spending Exceeds ₹</Text>
                    <TextInput
                        placeholder = '100'
                        keyboardType = 'numeric'
                        style = {{ marginLeft:5 }}
                    />
                </View>
            </View>
            {getTransactionRows()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top:25,
        padding: 5,
        flex: 1,
        backgroundColor : '#85dcbb'
    },
    headline: {
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        marginBottom: 10,
        backgroundColor: '#3AA5A9',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '90%',
        alignSelf: 'center',
        elevation: 7
    },
    body: {
        backgroundColor: '#f7f7f7',
        padding: 3,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        elevation: 5
    },
    token: {
        flex: 1 , 
        textAlign: "center",
        backgroundColor: '#05c7f2',
        marginLeft: 2,
        marginRight: 2,
        padding: 5,
        borderBottomRightRadius: 10
    },
    textChild: {
        flex: 1,
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#05c7f2',
        borderRadius: 10,
        elevation: 5
    },
    txnRows: {
        backgroundColor: '#def2f1',
        marginTop: 10,
        flexDirection: 'row',
        borderTopRightRadius: 30,
        padding: 10,
        elevation: 5
    }
});

const dummyData = [[
    {
        'recipent'  : 'HP Gas Service',
        'txnDate'   : '4 Oct, 2021',
        'txnType'   : 'Debit',
        'txnAmount' : '948',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/hp-gas.in'

    },
    {
        'recipent' : 'Anil Hardware',
        'txnDate'  : '24 Sept,2021',
        'txnType'  : 'Debit ',
        'txnAmount': '2450',
        'txnthrough': 'Debit Card',
        'icon':''
    },
    {
        'recipent' : 'BigBasket',
        'txnDate'  : '21 Sept,2021',
        'txnType'  : 'Debit',
        'txnAmount': '2930',
        'txnthrough': 'UPI Payment',
        'icon':'https://logo.clearbit.com/bigbasket.com'
    },
    {
        'recipent' : 'Godrej Furnitures',
        'txnDate'  : '1 Sept, 2021',
        'txnType'  : 'Debit',
        'txnAmount': '5930',
        'txnthrough': 'UPI Payment',
        'icon':'https://logo.clearbit.com/godrej.com'
    }],
    [{
        'recipent'  : 'StarBucks',
        'txnDate'   : '4 Oct, 2021',
        'txnType'   : 'Debit',
        'txnAmount' : '2000',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/starbucks.com'

        },
        {
        'recipent' : 'Dominos',
        'txnDate'  : '4 Oct,2021',
        'txnType'  : 'Debit ',
        'txnAmount': '2450',
        'txnthrough': 'Dredit Card',
        'icon':'https://logo.clearbit.com/dominos.com'
        },
        {
        'recipent' : 'McDonalds',
        'txnDate'  : '1 Oct,2021',
        'txnType'  : 'Debit',
        'txnAmount': '1930',
        'txnthrough': 'UPI Payment',
        'icon':'https://logo.clearbit.com/mcdonalds.com'
        },
        {
        'recipent' : 'McDonalds',
        'txnDate'  : '24 Sept, 2021',
        'txnType'  : 'Debit',
        'txnAmount': '1930',
        'txnthrough': 'UPI Payment',
        'icon':'https://logo.clearbit.com/mcdonalds.com'
    }],
    [
    {
        'recipent'  : 'BBQ Nation',
        'txnDate'   : '23 Sept, 2021',
        'txnType'   : 'Debit',
        'txnAmount' : '7500',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/bbqnation.ca'

    },
    {
        'recipent' : 'BBQ Nation',
        'txnDate'  : '19 July,2021',
        'txnType'  : 'Debit ',
        'txnAmount': '2450',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/bbqnation.ca'
    },
    {
        'recipent' : 'Apna Restaurent',
        'txnDate'  : '23 June,2021',
        'txnType'  : 'Debit',
        'txnAmount': '930',
        'txnthrough': 'UPI Payment',
        'icon':''
    },
    {
        'recipent' : 'McDonalds Restaurent',
        'txnDate'  : '22 June, 2021',
        'txnType'  : 'Debit',
        'txnAmount': '230',
        'txnthrough': 'UPI Payment',
        'icon':'https://logo.clearbit.com/mcdonalds.com'
    }],
    [{
        'recipent'  : 'Amazon Prime',
        'txnDate'   : '4 Oct, 2021',
        'txnType'   : 'Debit',
        'txnAmount' : '399',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/amazon.com'
    },
    {
        'recipent' : 'Amazon Prime',
        'txnDate'  : '4 July,2021',
        'txnType'  : 'Debit ',
        'txnAmount': '399',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/amazon.com'
    },
    {
        'recipent' : 'Amazon Prime',
        'txnDate'  : '4 Apr,2021',
        'txnType'  : 'Debit',
        'txnAmount': '399',
        'txnthrough': 'UPI Payment',
        'icon':'https://logo.clearbit.com/amazon.com'
    },
    {
        'recipent' : 'Amazon Prime',
        'txnDate'  : '4 Jan, 2021',
        'txnType'  : 'Debit',
        'txnAmount': '399',
        'txnthrough': 'UPI Payment',
        'icon':'https://logo.clearbit.com/amazon.com'
    }],
    [{
        'recipent'  : 'Dog Clinic',
        'txnDate'   : '2 Oct, 2021',
        'txnType'   : 'Debit',
        'txnAmount' : '2900',
        'txnthrough': 'Debit Card',
        'icon':''

    },
    {
        'recipent' : 'Dog Clnic',
        'txnDate'  : '2 Sept,2021',
        'txnType'  : 'Debit ',
        'txnAmount': '2900',
        'txnthrough': 'Debit Card',
        'icon':''
    }],
    [{
        'recipent'  : 'IRCTC Rail',
        'txnDate'   : '24 Sept, 2021',
        'txnType'   : 'Debit',
        'txnAmount' : '5200',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/irctc.co.in'

    },
    {
        'recipent' : 'Indigo Flight',
        'txnDate'  : '24 Aug,2021',
        'txnType'  : 'Debit ',
        'txnAmount': '4550',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/goindigo.in'
    },
    ],
    [{
        'recipent'  : 'V-Mart',
        'txnDate'   : '4 Oct, 2021',
        'txnType'   : 'Debit',
        'txnAmount' : '1200',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/vmartretail.com'

    },
    {
        'recipent' : 'V-Mart',
        'txnDate'  : '23 Sept,2021',
        'txnType'  : 'Debit ',
        'txnAmount': '2450',
        'txnthrough': 'Debit Card',
        'icon':'https://logo.clearbit.com/vmartretail.com'
    }],
    [{
        'recipent'  : 'Home Building',
        'txnDate'   : '1 Jan, 2021',
        'txnType'   : 'Debit',
        'txnAmount' : '12000',
        'txnthrough': 'Debit Card',
        'icon':''

    },
    {
        'recipent' : 'Home Building',
        'txnDate'  : '23 Sept,2020',
        'txnType'  : 'Debit ',
        'txnAmount': '12450',
        'txnthrough': 'Debit Card',
        'icon':''
    }]        
]
//<a href="https://clearbit.com">Logos provided by Clearbit</a>