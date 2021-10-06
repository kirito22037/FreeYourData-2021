import React , { useState } from 'react';
import {StyleSheet , View , StatusBar, SafeAreaView} from 'react-native';

//Components
import NavBar from '../components/navbar';
import Category from './Category';
import DashboardScreen from './DashboardScreen';
import Profile from './Profile';
import GoalScreen from './GoalScreen';

export default function Dashboard( {navigation,route} ) {
    const [Route , setRoute] = useState(0);
    const getChildView = (idx) => {
      switch(idx) {
        case 0 : return <DashboardScreen navigation = {navigation}/>
        case 1 : return <Category navigation = {navigation} />
        case 2 : return <GoalScreen navigation = {navigation}/>
        case 4 : return <Profile navigation = {navigation} />
      }
    }
    return(
        <SafeAreaView style = {styles.container}>
            <StatusBar
              animated={true}
              backgroundColor="#61dafb"
            />
            <SafeAreaView style = {styles.containerBody}>
              <NavBar setIndex = {setRoute} />
            </SafeAreaView>
            <SafeAreaView style = {styles.containerFooter}>
              { getChildView(Route) }
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse',
        top:-20
    },
    containerBody: {
      margin:10,
      bottom:-10
    },
    containerFooter: {
      flex: 1,
      padding:10,
      alignSelf: 'stretch',
      overflow: 'hidden'
    }
  });