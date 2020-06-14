import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Station({ route, navigation }) {

    const API = "http://transport.opendata.ch/v1/locations?type=station&query="

    const [stations, setStations] = useState([])
    const [query, setQuery] = useState("")

    const sendBack = (name, id) => {
        if (route.params?.pos == 'start') {
            navigation.navigate('Home', {startStationName: name, startStationId: id})
        }
        else {
            navigation.navigate('Home', {endStationName: name, endStationId: id})
        }
    }

    useEffect(() => {
        fetch(`${API}${query}`).then(res => res.json()).then((json) => {
            let results = []
            const { stations } = json;
            for(let key in stations) {
                if(stations[key].id != null)
                    results.push(stations[key])
            }
            setStations(results);
        });
    }, [query])

    return (
        <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            data={stations}
            defaultValue={query}
            onChangeText={text => {setQuery(text)}}
            placeholder={(route.params?.pos == 'start' ? 'From:' : 'To:')}
            renderItem={(item) => (
                <TouchableOpacity onPress={() => {
                    sendBack(item.item.name, item.item.id)
                }}>
                    <Text style={styles.itemText}>
                        {item.item.name}
                    </Text>
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    autocompleteContainer: {
        margin: 10
    },
    itemText: {
        fontSize: 15,
        margin: 2
    }
});

export default Station;