import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { toDate, parseISO, format } from 'date-fns'
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';

function Section({ section }) {

    const s = section

    const parseTime = (time) => {
        let date = toDate(parseISO(time))
        return format(date, "HH:mm")
    }

    const parseJourneys = (section) => {
        if (!walk)
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


    let walk = false
    if (s.journey == null) walk = true

    return (
        <View
            style={{
                padding: 5,
                margin: 5,
                borderTopStartRadius: 10,
                borderBottomEndRadius: 10,
                backgroundColor: '#ECEFF1',
                borderRadius: 1,
                borderWidth: 1,
                borderColor: "#CFD8DC"
            }}
        >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}
                >
                    {parseJourneys(s)}
                    <Text style={{
                        fontWeight: 'bold',
                        marginLeft: 8
                    }}>{walk ? '' : s.journey.name}</Text>
                </View>
                {!walk &&
                    <View>
                        <Text style={{
                            fontWeight: 'bold',
                            marginLeft: 8
                        }}>Platform</Text>
                    </View>
                }
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <View>
                    <IconEntypo
                        name={"flow-line"}
                        size={35} />
                </View>
                <View style={{
                    flexDirection: 'column',
                    flexGrow: 1,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>{s.departure.station.name} : {parseTime(s.departure.departure)}</Text>
                        {s.departure.platform &&
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    marginHorizontal: 2
                                }}>
                                    {s.departure.platform < 10 ? "0" + s.departure.platform : s.departure.platform}
                                </Text>
                            </View>
                        }
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>{s.arrival.station.name} : {parseTime(s.arrival.arrival)}</Text>
                        {s.arrival.platform &&
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    marginHorizontal: 2
                                }}>
                                    {s.arrival.platform < 10 ? "0" + s.arrival.platform : s.arrival.platform}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Section