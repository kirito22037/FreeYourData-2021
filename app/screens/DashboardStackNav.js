import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './DashboardScreen';
import BankAccList from './BankAccList';
import AccountDetails from './AccountDetails';

export default function DashboardStackNav() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
            headerStyle: {
                backgroundColor: "#34a4eb"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white'
            },
          }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="BankAccList" component={BankAccList} />
            <Stack.Screen name="AccountDetails" component={AccountDetails} />
        </Stack.Navigator>
    );
}