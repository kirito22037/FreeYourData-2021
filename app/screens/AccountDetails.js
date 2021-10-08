import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Card, Title, Paragraph, List } from 'react-native-paper';

export default function AccountDetails( { navigation, route } ) {
    const { bankName ,transactions, name, address, dob, email, mobile } = route.params;
    return (
        <View style={styles.p10}>
            <Card>
                <Card.Content>
                <Title>{ bankName }</Title>
                {/* <Paragraph> */}
                    {/* { JSON.stringify( route.params ) } */}
                    <Text>Name : {name}</Text>
                    <Text>Address : {address}</Text>
                    <Text>Date of Birth : {dob}</Text>
                    <Text>Email : {email}</Text>
                    <Text>Mobile No : {mobile}</Text>
                {/* </Paragraph> */}
                </Card.Content>
            </Card>

            <View style={styles.my10}>
                <Card>
                    <Card.Content>
                    <Title>Transactions</Title>
                    { transactions.map( transaction=>(
                            <List.Item
                            key={ transaction.txnId }
                            title={ `₹ ${transaction.amount}` }
                            titleStyle={ {color: "#4d4949"} }
                            description={`mode: ${transaction.mode}`}
                            right={props => <List.Icon {...props} 
                            icon={ transaction.type==="CREDIT" ? "plus" : "minus" } 
                            color={ transaction.type==="CREDIT" ? "#4ee66a" : "#f75757" } />}
                            />    
                        ))}
                    </Card.Content>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    p10 : {
        padding: 10
    },
    my10: {
        marginVertical: 10
    }
})