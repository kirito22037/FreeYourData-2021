import React from 'react';
// import {View, Text} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Dashboard from './Dashboard';
import Profile from './Profile';
import GoalScreen from './GoalScreen';
import DashboardScreen from './DashboardScreen';
// import Category from './Category';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StackCategNavigation from './stackCategScreen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function TabNav() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
        screenOptions={({route})=>({
            //headerShown: true,
            tabBarActiveTintColor: '#222526',
            tabBarInactiveTintColor: '#b6b9ba',
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Dashboard") {
                    iconName = "dashboard";
                } else if (route.name === 'Category') {
                    iconName="category";
                } else if (route.name === 'Your Goals') {
                    iconName="account-balance-wallet";
                }
                else { // for profile
                    iconName = "admin-panel-settings";
                }
                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            headerStyle: {
              backgroundColor: "#34a4eb"
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white"
            }
          })}>
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Category" component={StackCategNavigation} options={{ headerShown: false }} />
            <Tab.Screen name="Your Goals" component={GoalScreen} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}