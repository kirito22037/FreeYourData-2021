import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Category from './Category';
import InnerCategory from './Innercategory';

export default function StackCategNavigation() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator 
        initialRouteName="category"
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
            <Stack.Screen name="category" component={Category} />
            <Stack.Screen name="InnerCategory" component={InnerCategory} options={{ headerShown: true, title: "Category"}}/>
        </Stack.Navigator>
    );
}