import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Section from '../Section';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { toDate, parseISO, format } from 'date-fns'

function Connection({ connection }) {

    const [expand, setExpand] = useState(false)

    const c = connection

    const parseDuration = (d) => {
        let result = ""
        const [days, rest] = d.split('d')
        if (days != "00") result += days + " d "
        const [hours, mins, secs] = rest.split(':')
        if (hours != "00") result += hours + " h "
        if (mins != "00") result += mins + " m "
        if (secs != "00") result += secs + " s "
        return result
    }

    const parseJourneys = (section) => {
        if (section.journey != null)
            return (
                <IconMaterialCommunity
                    name={section.journey.category === 'B' ? "bus" : "train"}
                    size={15} />
            )
        else
            return (
                <IconMaterialCommunity
                    name={"walk"}
                    size={15} />
            )

    }

    const parseTime = (time) => {
        let date = toDate(parseISO(time))
        return format(date, "HH:mm")
    }


    if (expand) {
        return (
            <View
                style={{
                    padding: 10,
                    margin: 10,
                    backgroundColor: '#FFEBEE',
                    borderTopStartRadius: 10,
                    borderBottomEndRadius: 10,
                    borderColor: '#FFCDD2',
                    borderWidth: 1
                }}
            //onPress={() => {setExpand(!expand)}}
            >
                <TouchableOpacity
                    onPress={() => { setExpand(false) }}
                    style={{
                        margin: 2,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text>Collapse</Text>
                    <IconMaterialCommunity
                        name="chevron-up"
                        size={20}
                    />
                </TouchableOpacity>
                {c.sections.map((section) => {
                    return (
                        <Section section={section} />
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
                    backgroundColor: '#FFCDD2',
                    borderTopStartRadius: 10,
                    borderBottomEndRadius: 10
                }}
                onPress={() => { setExpand(true) }}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <Text>{c.from.station.name}: {parseTime(c.from.departure)}</Text>
                        <Text>{c.to.station.name}: {parseTime(c.to.arrival)}</Text>
                    </View>
                    <IconMaterialCommunity
                        name="chevron-down"
                        size={20}
                    />
                </View>
                <View style={{
                    marginTop: 2
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}>{c.sections.map((s) => parseJourneys(s))}</View>
                    <Text>{parseDuration(c.duration)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Connection