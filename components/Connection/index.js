import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Section from '../Section';

function Connection({ connection }) {

    const [expand, setExpand] = useState(false)

    const c = connection

    const parseDuration = (d) => {
        let result = ""
        const [days, rest] = d.split('d')
        if(days != "00") result+= days + " d "
        const [hours, mins, secs] = rest.split(':')
        if(hours != "00") result+= hours + " h "
        if(mins != "00") result+= mins + " m "
        if(secs != "00") result+= secs + " s "
        return result
    }

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
                    <Text>{c.products}</Text>
                    <Text>{parseDuration(c.duration)}</Text>
            </TouchableOpacity>
        )
    }
}

export default Connection