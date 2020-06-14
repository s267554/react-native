import * as React from 'react';
import { SafeAreaView } from 'react-native';
import Connection from '../Connection';

function Search({ route }) {
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