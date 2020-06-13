import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toDate, parseISO } from 'date-fns'

function Section({ section }) {

    const [expand, setExpand] = useState(false)

    const s = section

    const parseTime = (time) => {
        let date = toDate(parseISO(time))
        return date.toLocaleTimeString()
    }

    let walk = false

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
                <Text>{s.departure.station.name} {parseTime(s.departure.departure)} platform {s.departure.platform} {(s.departure.delay != null) ? (" +" + s.departure.delay + "'") : ""}</Text>
                <Text>{s.journey.name}</Text>
                <Text>{s.arrival.station.name} {parseTime(s.arrival.arrival)} platform {s.arrival.platform}</Text>
            </TouchableOpacity>
        )
    }
    else {
        if(s.journey == null) walk = true
        return (
            <TouchableOpacity
                style={{
                    padding: 5,
                    margin: 5,
                    backgroundColor: 'lightgrey',
                    borderRadius: 1
                }}
                onPress={() => {if(walk) ; else setExpand(true)}}
            >
                <Text>{s.departure.station.name} - {walk ? ("walk") : s.journey.name} - {s.arrival.station.name}</Text>
            </TouchableOpacity>
        )
    }
}

export default Section