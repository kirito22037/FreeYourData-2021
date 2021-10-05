import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Dashboard from './screens/dashboard.js';

export default function App() {
  return (
    <View >
      <Dashboard/>
      <StatusBar style="auto" />
    </View>
  );
}