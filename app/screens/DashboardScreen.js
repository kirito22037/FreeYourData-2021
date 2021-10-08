import React from 'react';
import { StyleSheet, Text, View, Dimensions,ScrollView } from 'react-native';
import AccountDetail from '../components/accountDetail';
import BarGraph from '../components/bargraph';
//import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
export default function DashboardScreen() {

    const screenWidth = Dimensions.get("window").width-20;
    const oldDateObj = new Date();
    const timenow = new Date(oldDateObj.getTime() + 328*60000).toISOString().split('T')[1].substring(0,5);
    

    const Earningdata = {
        labels: ["April", "May", "June", "July", "Aug", "Sept"],
        datasets: [
          {
            data: [45, 43, 42, 40, 42, 45]
          }
        ]
      };
    
    const Spentdata = {
        labels: ["April", "May", "June", "July", "Aug", "Sept"],
        datasets: [
          {
            data: [10, 15, 28, 8, 9, 23]
          }
        ]
      };

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{...styles.container, paddingBottom: 10 }}>
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

                <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                        <BarGraph data={Earningdata} width={screenWidth} barColor='rgba(50, 168, 82, 1)' title="Money Coming In Account A" labelColor="rgba(1, 122, 205, 1)" />
                        <BarGraph data={Earningdata} width={screenWidth} barColor='rgba(50, 168, 82, 1)' title="Money Coming In Account B" labelColor="rgba(1, 122, 205, 1)" />
                        <BarGraph data={Earningdata} width={screenWidth} barColor='rgba(50, 168, 82, 1)' title="Money Coming In Account C" labelColor="rgba(1, 122, 205, 1)" />
                </ScrollView>
            
                <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                    <BarGraph data={Spentdata} width={screenWidth} barColor='rgba(189, 58, 58, 1)' title="Money Going Out from Account A" labelColor="rgba(1, 122, 205, 1)" />
                    <BarGraph data={Spentdata} width={screenWidth} barColor='rgba(189, 58, 58, 1)' title="Money Going Out from Account B" labelColor="rgba(1, 122, 205, 1)" />
                    <BarGraph data={Spentdata} width={screenWidth} barColor='rgba(189, 58, 58, 1)' title="Money Going Out from Account C" labelColor="rgba(1, 122, 205, 1)" />
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
    // headline: {
    //     // flex: 1,
    //     backgroundColor: '#05c7f2',
    //     height: 50,
    //     textAlign: 'center',
    //     textAlignVertical: 'center',
    //     fontSize: 20,
    //     //borderTopLeftRadius: 30,
    //     //borderTopRightRadius: 30
    //     borderRadius: 30,
    //     color:'white',
    //     marginTop:10
    // },
    
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