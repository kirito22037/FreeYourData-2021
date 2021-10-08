import React , { useState } from "react";
import { View , Text , StyleSheet, Dimensions , ScrollView,TouchableOpacity , StatusBar} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function GoalDetails({serial,data , closeModal}) {

    const BarGraphdata = [{
        labels: ["May", "June", "July","Aug", "Sept", "Oct"],
        datasets: [
          {
            data: [0, 20, 20, 25, 25, 20]
          }]
    },{
        labels: ["May", "June", "July","Aug", "Sept", "Oct"],
        datasets: [
          {
            data: [0, 0, 0, 0, 25, 25]
          }]
    },{
        labels: ["May", "June", "July","Aug", "Sept", "Oct"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0]
          }]
    }];
    const goal = [27.5,2.5,0]

    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#2679ff",
        backgroundGradientTo: "#2679ff",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#f7f7f7"
        }
    };

    return(
        <ScrollView style = {{flexDirection: 'column' , backgroundColor : 'white' , flex : 1, overflow: 'scroll'}}>
            <StatusBar
            animated={true}
            backgroundColor="#05c7f2"
            />
            <View style = {{flexDirection : 'row'}}>
                <Text style = {styles.headline}> 
                    {data.GoalName}
                </Text>
            </View>
            <View style = {{ flexDirection: 'column'}}>
                <View style = {{flexDirection : 'row'}}>
                    <Text style = {styles.box}> Start Date: {data.startDate} </Text>
                    <Text style = {styles.box}> End Date: {data.endDate} </Text>
                </View>
                <Text
                    style = {{fontSize: 20 , textAlign: 'center' , padding: 10 , backgroundColor: '#f29950' , margin: 5 ,  borderRadius: 5}}
                >Goal Amount - ₹{data.Amount} </Text>
            </View>
            <View style = {{flexDirection : 'column' , marginTop: 7 , flex: 1}}>
                <Text style = {{fontSize: 15 , color: 'black' , marginLeft: 10 , marginBottom: 5}}> Deposit Analysis </Text>
                <BarChart
                        style={{borderRadius: 15 , alignSelf: 'center'}}
                        data={BarGraphdata[serial > 2 ? 2 : serial ]}
                        width={Dimensions.get('window').width - 20}
                        height={220}
                        yAxisLabel="₹ "
                        yAxisSuffix="k"
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                    />
            </View>
            <View style = {{flex : 1 , flexDirection: 'column' , padding : 10}}>
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.box2}> Total Amount{'\n'} ₹ {data.Amount} </Text>
                    <Text style = {styles.box2}> Amount Deposited{'\n'} ₹ {data.AmountSubmitted} </Text>
                </View>
                <View style = {{flex: 1}}>
                    <Text style = {styles.box2}> Goal Achieved - {goal[serial > 2 ? 2 : serial]} % </Text>
                </View>
                <TouchableOpacity style={styles.ButtonStyle}><Text style={styles.buttonTextStyle}>Add Money{' >>'}</Text></TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center',
        fontSize: 30,
        backgroundColor: '#05c7f2',
        flex:1,
        color: 'white',
        padding: 10
    },
    box: {
        backgroundColor: '#f29950',
        marginTop: 10, 
        flex: 1,
        fontSize: 14,
        textAlignVertical: 'center',
        borderRadius: 5,
        textAlign: 'center', 
        marginLeft: 5, marginRight: 5,
        padding: 5
    }, 
    box2: {
        flex: 1 ,
        textAlign: 'center' , 
        padding: 10, 
        fontSize: 15 , 
        backgroundColor: "#f29950" , 
        color: 'black' , 
        margin: 5,
        borderRadius: 5,
        // borderBottomWidth: 2
    },
    ButtonStyle:{
        backgroundColor:'#05c7f2',
        width:Dimensions.get("window").width-40,
        alignItems:'center',
        padding:10,
        borderRadius:15,
        marginTop:25,
        alignSelf: 'center'
    },
    buttonTextStyle:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
    }
});