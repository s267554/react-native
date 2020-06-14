import * as React from 'react';
import Connection from '../Connection';
import { ScrollView } from 'react-native-gesture-handler';

function Search({ route }) {
    const travels = route.params
    return (
      <ScrollView>
        {travels.map((travel) => {
            return <Connection connection={travel} />
        })}
      </ScrollView>
    );
  }

  export default Search;