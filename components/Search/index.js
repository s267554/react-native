import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Connection from '../Connection';

function Search({ route, navigation }) {
    const travels = route.params
    return (
      <SafeAreaView>
        {travels.map((travel) => {
            return <Connection connection={travel} />
        })}
      </SafeAreaView>
    );
  }

  export default Search;