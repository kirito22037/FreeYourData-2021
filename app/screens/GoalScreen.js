import React , { useState , useEffect } from 'react';
import {View , Text , StyleSheet, FlatList , SafeAreaView, TouchableOpacity, Modal, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GoalDetails from '../components/goalDetails';


const data = [
    {
        'GoalName'  : 'Car Loan',
        'startDate' : '20/20/20',
        'endDate'   : '30/20/20',
        'Amount'    : '20000',
        'AmountLeft': '11000',
        'Status'    : 'On-Going'
    },
    {
        'GoalName'  : 'Home Loan',
        'startDate' : '20/20/20',
        'endDate'   : '30/20/20',
        'Amount'    : '20000',
        'AmountLeft': '11000',
        'Status'    : 'Completed'
    },
    {
        'GoalName'  : 'Tuition Fees',
        'startDate' : '20/20/20',
        'endDate'   : '30/20/20',
        'Amount'    : '20000',
        'AmountLeft': '11000',
        'Status'    : 'On-going'
    }
]

const formFields = [
    {
        'ITitle' : 'Goal Name',
        'IPlaceHolder' : 'xyz',
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
        'ITitle' : 'Start Date',
        'IPlaceHolder' : '00/00/00',
        'IKeyBoardType': 'default',
        'Iname': 'startDate'
    },
    {
        'ITitle' : 'End Date',
        'IPlaceHolder' : '00/00/00',
        'IKeyBoardType': 'default',
        'Iname': 'endDate'
    }
]

export default function GoalScreen({ navigation }) {

    const [goalData , setGoalData] = useState(data);
    const [goalIndex , setGoalIndex] = useState(0);
    const [modalVisible , setModalVisible] = useState(false);
    const [goalInDetail , setGoalInDetail] = useState(false);

    //Form-Data
    const [goal , setGoal] = useState({'GoalName':'','startDate':'','endDate':'','Amount':'','Status':'On-going'});
    const HandleSubmit = () => {
        setGoalData(oldGoalData => [...oldGoalData , goal]);
        setGoal({'GoalName':'','startDate':'','endDate':'','Amount':''});
        
        setModalVisible(false);
    }

    const HandleChange = async (name , text) => {
        await setGoal({...goal , [name]: text});
    }

    const openDetailGoalModal = (index) => {
        setGoalInDetail(true);
        setGoalIndex(index);        
    }

    useEffect(() => {
        setGoalData(data);
      }, []);
    return (
        <View style = {styles.container}>
            <Text style = {styles.headline}> Your Goal's! </Text>
            <SafeAreaView style = {{ marginTop: 10 , borderBottomWidth: 1 , paddingBottom: 10 , borderRadius: 40}}>
                <FlatList
                    data = {goalData}
                    renderItem={({item , index}) => (
                        <TouchableOpacity style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 1,
                            padding: 5,
                            borderWidth: 2,
                            borderTopRightRadius: 40
                            }} 
                            key = {index}
                            onPress = {() => openDetailGoalModal(index)}
                        >
                            <View style = {{flexDirection:'row'}}>
                                <Text style = {styles.goalBlock}> 
                                    {item.GoalName} 
                                </Text>
                                <View style = {{flex: 1}}>
                                {
                                    item.Status === 'Completed' ? 
                                    <Icon name = "verified" size = {22} color = 'green' style = {styles.icons}/>
                                    :
                                    <Icon name = "pending-actions" size = {22} color = 'blue' style = {styles.icons}/>
                                }
                                </View>
                            </View>
                            <View style = {{ flexDirection: 'row'}}>
                                <Text style = {{ flex: 1 , textAlign: 'center'}}> Goal Amount <Text style = {{color : 'red'}}> {item.Amount} </Text>  </Text>
                                <Text style = {{ flex: 1 , textAlign: 'center'}}>  Goal Completed <Text style = {{color : 'green'}}> {item.Amount} </Text></Text>
                            </View>
                            <View style = {{ flexDirection: 'row'}}>
                                <Text style = {{ flex: 1 , textAlign: 'center'}}> Start Date <Text style = {{color : 'red'}}> {item.startDate} </Text></Text>
                                <Text style = {{ flex: 1 , textAlign: 'center'}}> End Date <Text style = {{color : 'green'}}> {item.endDate} </Text></Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    numColumns={1}
                    keyExtractor={(index) => index}
                />
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
                                        <View style = {{flexDirection: 'row' , padding: 10 , borderBottomWidth : 2 , borderRadius: 50}} key = {idx}>
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
                        <Text 
                            style = {[styles.createButton , {padding: 10}]}
                            onPress = {() => HandleSubmit()}
                        >
                            Submit
                        </Text> 
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
                <GoalDetails data = {goalData[goalIndex]} closeModal = {setGoalInDetail}/>
            </Modal>
            <TouchableOpacity 
                style = {styles.createButton}
                onPress = {() => setModalVisible(true)}
            >
                <Text 
                    style = {{ textAlign: 'center' , padding: 10 }}
                > Create a New Goal! </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'green',
        flex: 1,
        flexDirection: 'column'
    },
    headline: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20
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
        width: '50%',
        alignSelf: 'center',
        backgroundColor : '#05c7f2',
        marginTop: 10,
        borderRadius: 25,
        textAlign: 'center', 
        fontSize: 20
    },
    modalContainer: {
        flexDirection: 'column'
    },
    icons: {
        
    }
});
