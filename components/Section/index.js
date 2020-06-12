import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Section({ section }) {

    const [expand, setExpand] = useState(false)

    const s = section

    if (expand) {
        return (
            <TouchableOpacity
                style={{
                    padding: 5,
                    margin: 5,
                    backgroundColor: '#ffdddd',
                    borderRadius: 1
                }}
                onPress={() => {setExpand(false)}}
            >
                <Text>{s.departure.departure} {s.departure.station.name} - {s.journey.name} - {s.arrival.station.name} {s.arrival.arrival}</Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity
                style={{
                    padding: 5,
                    margin: 5,
                    backgroundColor: 'lightgrey',
                    borderRadius: 1
                }}
                onPress={() => {setExpand(true)}}
            >
                <Text>{s.departure.station.name} - {s.journey.name} - {s.arrival.station.name}</Text>
            </TouchableOpacity>
        )
    }
}

export default Section