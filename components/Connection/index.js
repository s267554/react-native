import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Section from '../Section';

function Connection({ connection }) {

    const [expand, setExpand] = useState(false)

    const c = connection

    if (expand) {
        return (
            <View
                style={{
                    padding: 10,
                    margin: 10,
                    backgroundColor: '#ffcccc',
                    borderRadius: 1
                }}
                //onPress={() => {setExpand(!expand)}}
            >
                <TouchableOpacity
                    onPress={() => {setExpand(false)}}
                    style={{margin: 2}}
                >
                    <Text>Close</Text>
                </TouchableOpacity>
                {c.sections.map((section) => {
                    return (
                        <Section section={section}/>
                    )
                })}
            </View>
        )
    }
    else {
        return (
            <TouchableOpacity
                style={{
                    padding: 10,
                    margin: 10,
                    backgroundColor: 'grey',
                    borderRadius: 1
                }}
                onPress={() => {setExpand(true)}}
            >
                    <Text>{c.from.station.name}</Text>
                    <Text>{c.to.station.name}</Text>
                    <Text>{c.duration}</Text>
            </TouchableOpacity>
        )
    }
}

export default Connection