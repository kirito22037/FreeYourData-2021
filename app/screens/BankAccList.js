import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Card, Title, Paragraph, List } from 'react-native-paper';

export default function BankAccList({navigation, route}) {
    const { data } = route.params;
    return (
        <View style={styles.p10}>
        { data.map( bankDetail => {
            return (
                <TouchableOpacity 
                key={ bankDetail.bankName }
                onPress={()=>{ navigation.navigate('AccountDetails', bankDetail ); }}>
                    <View style={styles.bottomLine}>
                        <List.Item
                        id={ bankDetail.bankName }
                        title={ bankDetail.bankName }
                        // description="Item description"
                        left={props => <List.Icon {...props} icon="bank" />} />
                    </View> 
                </TouchableOpacity> 
            ) } ) }
        </View>
    );
}

const styles = StyleSheet.create({
    p10 : {
        padding: 10
    },
    bottomLine:{
        borderStyle: "dashed",
        borderBottomWidth: 1,
        borderBottomColor: "#c2c2c2"
    }
})