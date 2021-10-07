import React , { useState , useEffect } from 'react';
import {View , Text , StyleSheet, FlatList , SafeAreaView, TouchableOpacity, Modal, TextInput,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GoalDetails from '../components/goalDetails';
import GestureFlipView from 'react-native-gesture-flip-card';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import PieChart from 'react-native-pie-chart';

const Ongoingdata = [
    {
        'GoalName'  : 'Buy Car',
        'startDate' : '20 Jan,2021',
        'endDate'   : '20 Jan,2023',
        'Amount'    : '4,00,000',
        'AmountSubmitted': '1,10,000',
        'Status'    : 'On-Going'
    },
    {
        'GoalName'  : 'Buy Home',
        'startDate' : '20 Jan,2021',
        'endDate'   : '10 Oct,2024',
        'Amount'    : '20,00,000',
        'AmountSubmitted':'50,000',
        'Status'    : 'On-Going'
    }]

const formFields = [
    {
        'ITitle' : 'Goal Name',
        'IPlaceHolder' : 'Pay fees...',
        'IKeyBoardType': 'default',
        'Iname': 'GoalName'
    },
    {
        'ITitle' : 'Goal Amount',
        'IPlaceHolder' : '0.00',
        'IKeyBoardType': 'numeric',
        'Iname': 'Amount'
    },
    {
        'ITitle' : 'End Date',
        'IPlaceHolder' : '31 Dec 2025',
        'IKeyBoardType': 'default',
        'Iname': 'endDate'
    }
]

export default function GoalScreen({ navigation }) {

    var viewref = [{
        current:null
    },{
        current:null
    },{
        current:null
    }]

    const [goalData , setGoalData] = useState(Ongoingdata);

    const [goalIndex , setGoalIndex] = useState(0);
    const [modalVisible , setModalVisible] = useState(false);
    const [goalInDetail , setGoalInDetail] = useState(false);
    const Month = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    const datenow = new Date();
    const date = datenow.getDate() + ' ' + Month[datenow.getMonth()] + ',' + datenow.getFullYear();
    //Form-Data

    const [goal , setGoal] = useState({'GoalName':'','startDate':date,'endDate':'','Amount':'','Status':'On-going','AmountSubmitted': '0'});
    const HandleSubmit = () => {
        setGoalData(oldGoalData => [...oldGoalData , goal]);
        setGoal({'GoalName':'','startDate':'','endDate':'','Amount':''});
        
        setModalVisible(false);
    }

    const HandleChange = async (name , text) => {
        await setGoal({...goal , [name]: text});
    }

    const openDetailGoalModal = (index) => {
        setGoalIndex(index);
        setGoalInDetail(true);
    }
    const widthAndHeight = 170
    const series = [[28, 100],[3,100],[0,100]]
    const sliceColor = ['#F44336','#2196F3']

    const renderFront = (index) => {
        return (
          <View style = {styles.frontStyle}>
            <TouchableOpacity style={styles.ButtonStyle}><Text style={styles.buttonTextStyle}>Add to this Goal{' >>'}</Text></TouchableOpacity>
          </View>
        );
      };
      
    const renderBack = (index) => {
    return (
        <View style = {styles.backStyle}>
            <Text style={styles.name}>{goalData[index].GoalName}</Text>
            <PieChart style={styles.chart}
                widthAndHeight={widthAndHeight}
                series={series[index]}
                sliceColor={sliceColor}
                doughnut={true}
                coverRadius={0.55}
          />
          <Text style={styles.amount}>₹ {goalData[index].AmountSubmitted} out of ₹{goalData[index].Amount}</Text>
          <Text style={styles.swipe}>Swipe to add money to this goal!</Text>  
        </View>
    );
    };
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };

    return (
        <ScrollView style = {styles.container}>
            {/* <Text style = {styles.headline}> Your Goals </Text> */}
            <SafeAreaView style = {styles.cardContainer}>
                {goalData.map((item,index)=>(
                    <GestureRecognizer key = {index} config={config} onSwipeLeft = {()=>{viewref[index].current.flipLeft()}} onSwipeRight = {()=>{viewref[index].current.flipRight()}}>
                        <TouchableOpacity onPress = {() => openDetailGoalModal(index)} key = {index.toString()} >
                            <GestureFlipView width={350} height={370}  ref= {(ref) => (viewref[index].current = ref)}>
                                {renderBack(index)}
                                {renderFront(index)}
                            </GestureFlipView>
                        </TouchableOpacity>
                    </GestureRecognizer>    
                    ))}
                </SafeAreaView>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style = {styles.modalContainer}>
                    <TouchableOpacity 
                        onPress = {() => setModalVisible(false)}
                    > 
                        <Text style = {{textAlign: 'center' , alignSelf: 'center', fontSize: 25 , marginTop: 10}}>
                            Create your Goal 
                        </Text>
                        <View style = {{ flexDirection: 'column' }}>
                            {
                                formFields.map((field , idx) => {
                                    return(
                                        <View style = {{flexDirection: 'row' , padding: 10 , borderBottomWidth : 2 , borderRadius: 50}} key = {idx.toString()}>
                                            <Text style = {{ flex: 1 , textAlign: 'center' , textAlignVertical: 'center'}}> {field.ITitle}  </Text>
                                            <TextInput
                                                placeholder = {field.IPlaceHolder}
                                                keyboardType = {field.IKeyBoardType}
                                                style = {{ flex: 1 , textAlign: 'center'}}
                                                onChangeText = {(text) => HandleChange(field.Iname , text)}
                                            />
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <TouchableOpacity style={styles.cardContainer}>
                        <Text 
                            style = {[styles.SubmitButton , {padding: 10}]}
                            onPress = {() => HandleSubmit()}>
                            Submit
                        </Text></TouchableOpacity> 
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={false}
                visible={goalInDetail}
                onRequestClose={() => {
                    setGoalInDetail(false)
                }}
            >
                <GoalDetails serial={goalIndex} data = {goalData[goalIndex]} closeModal = {setGoalInDetail}/>
            </Modal>
            <TouchableOpacity 
                style = {styles.createButton}
                onPress = {() => setModalVisible(true)}>
                <Icon name = 'add' size = {40} color = "#05c7f2"/>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'row',
        backgroundColor:'#3AAFA9',
    },
    name:{
        fontSize:25,
        color:"#0D79F7",
        fontWeight:'600',
        position:'absolute',
        top:20
      },
      chart:{
          position:'absolute',
          top:70
      },
    amount:{
        fontSize:20,
        color:"#60A6F7",
        fontWeight:'300',
        position:'absolute',
        bottom:60
      },
      swipe:{
        fontSize:12,
        color:"#97AEF8",
        fontWeight:'300',
        position:'absolute',
        bottom:10
      },
    cardContainer:{
        backgroundColor: '#85dcbb',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
        borderRadius: 20,
        elevation: 100,
        margin: 3.5
    },
    frontStyle: {
        width: 350,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor:'#B2FDF9',
        borderRadius: 20
      },
      backStyle: {
        width: 350,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor:'#B2FDF9'
    },
    headline: {
        backgroundColor: '#3AA5A9',
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        color:'white',
        marginTop:10, 
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 2,
        elevation: 15
    },
    goalBlock: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 5,
        borderBottomWidth: 1.5,
        borderRadius: 50,
        flex:1
    },
    createButton: {
        width: 50,
        height:40,
        alignSelf: 'center',
        backgroundColor : '#A5E7FC',
        marginTop: 10,
        marginBottom:50,
        borderRadius: 25,
        alignItems: 'center',
    },
    SubmitButton:{
        color:'white',
        backgroundColor:'#05c7f2',
        width:210,
        textAlign:'center',
        padding:10,
        borderRadius:15,
    },
    modalContainer: {
        flexDirection: 'column'
    },
    ButtonStyle:{
        backgroundColor:'#05c7f2',
        width:200,
        alignItems:'center',
        padding:10,
        borderRadius:15,
    },
    buttonTextStyle:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
    }
});
