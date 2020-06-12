import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Connection({ connection }) {

    const [expand, setExpand] = useState(false)

    const c = connection

    if (expand) {
        return (
            <TouchableOpacity
                style={{
                    padding: 10,
                    margin: 10,
                    backgroundColor: 'red',
                    borderRadius: 1
                }}
                onPress={() => {setExpand(!expand)}}
            >
                {c.sections.map((section) => {
                    return <Text>{section.journey.name}</Text>
                })}
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity
                style={{
                    padding: 10,
                    margin: 10,
                    backgroundColor: 'lightgrey',
                    borderRadius: 1
                }}
                onPress={() => {setExpand(!expand)}}
            >
                    <Text>{c.from.station.name}</Text>
                    <Text>{c.to.station.name}</Text>
                    <Text>{c.duration}</Text>
            </TouchableOpacity>
        )
    }
}

export default Connection