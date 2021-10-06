import React ,  { useState } from 'react';
import { StyleSheet, View , StatusBar , Text, ScrollView , TouchableOpacity,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Category({ navigation }) {
    const [LabelIndex,setLabelIndex] = useState(0);
    const numberofTxn = [[110,90,53,23,5],[192,153,89,38,12],[43,21,16,7,1],[15,12,8,3,1],[52,22,18,11,6],[21,11,8,3,0],[97,65,34,12,3],[6,5,4,2,1]];
    const TxnAmount = [[4700,4500,2300,1200,230],[1920,1530,890,380,120],[2100,1210,816,126,100],[3000,1800,1500,300,100],[520,220,180,110,60],[12000,11000,8000,3000,0],[9700,5500,2300,1100,300],[2000,1100,700,500,230]];

    let categories = [
        {
            'Type'     : 'Retail',
            'iconName' : 'storefront'
        },
        {
            'Type'     : 'Food',
            'iconName' : 'tapas'
        },
        {
            'Type'     : 'Restaurant',
            'iconName' : 'restaurant'
        },
        {
            'Type'     : 'Online Entertainment',
            'iconName' : 'sports-esports'
        },
        {
            'Type'     : 'Pets',
            'iconName' : 'pets'
        },
        {
            'Type'     : 'Travel',
            'iconName' : 'flight'
        },
        {
            'Type'     : 'Cloths',
            'iconName' : 'shopping-cart'
        },
        {
            'Type'     : 'Home Improvement',
            'iconName' : 'house'
        }
    ]
    return(
        <SafeAreaView style = {Styles.container}>
            <Text style = {Styles.headline}>
                Categories
            </Text>
            <View style = {{flexDirection: 'row' , marginTop : 10}}>
                <TouchableOpacity style = {Styles.token} onPress = {() => setLabelIndex(0)} ><Text style={ LabelIndex == 0 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}>All</Text></TouchableOpacity>
                <TouchableOpacity style = {Styles.token} onPress = {() => setLabelIndex(1)}><Text style={ LabelIndex == 1 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}> 1 Yr </Text></TouchableOpacity>
                <TouchableOpacity style = {Styles.token} onPress = {() => setLabelIndex(2)}><Text style={ LabelIndex == 2 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}> 6 Mon </Text></TouchableOpacity>
                <TouchableOpacity style = {Styles.token} onPress = {() => setLabelIndex(3)}><Text style={ LabelIndex == 3 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}> 1 Mon </Text></TouchableOpacity>
                <TouchableOpacity style = {Styles.token} onPress = {() => setLabelIndex(4)}><Text style={ LabelIndex == 4 ? {'color':'#ffff','fontWeight':'bold'}: {'color':'black' }}> 1 week </Text></TouchableOpacity>
            </View>
            <ScrollView style = {Styles.content}>
                {
                    categories.map((category , idx) => {
                        return(
                            <TouchableOpacity
                                key = {idx}
                                style = {Styles.categoryName}
                                onPress = {() => {navigation.navigate('InnerCategory',{'Type':idx,'Name':category.Type})}}
                            >
                                <>
                                    <Icon name = {category.iconName} size = {40} color = "black"/>
                                    <View style = {{flexDirection : 'column' , flex: 3.5}}>
                                        <Text style = {{textAlignVertical:'center' , marginLeft: 10 , fontSize: 20}}> {category.Type} </Text>
                                        <Text style = {{textAlignVertical:'center' , marginLeft: 10 , fontSize: 10, fontWeight:'bold', color:'#89898C'}}> {numberofTxn[idx][LabelIndex]} Transaction </Text>
                                    </View>
                                    <Text style = {{color: 'red' , flex: 1 , textAlignVertical: 'center'}}>
                                        - ₹ {TxnAmount[idx][LabelIndex]}    
                                    </Text>
                                </>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%'
    },
    headline: {
        // flex: 1,
        backgroundColor: '#05c7f2',
        height: '7%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    content: {
        // flex: 1,
        backgroundColor: '#f7f7f7',
        // height: '85%',
        marginTop: 5,
        flexDirection: 'column'
    },
    token: {
        flex: 1 , 
        alignItems:'center',
        backgroundColor: '#05c7f2',
        marginLeft: 2,
        marginRight: 2,
        padding: 5,
        borderBottomRightRadius: 10
    },
    categoryName: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.3,
        borderRadius: 20,
    }
});
