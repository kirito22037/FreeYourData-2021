import React , { useState } from 'react';
import {StyleSheet , StatusBar, SafeAreaView, View} from 'react-native';

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
            <View style = {styles.container}>
              <StatusBar
                animated={true}
                backgroundColor="#61dafb"
              />
              <View style = {styles.containerBody}>
                <NavBar setIndex = {setRoute} />
              </View>
              <View style = {styles.containerFooter}>
                { getChildView(Route) }
              </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse',
        top:-20,
        backgroundColor: "green",
        padding: 0,
        margin: 0
    },
    containerBody: {
      marginBottom: 10,
      bottom:-10
    },
    containerFooter: {
      flex: 1,
      //padding:10,
      alignSelf: 'stretch',
      overflow: 'hidden'
    }
  });