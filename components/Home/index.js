import React, { useEffect, useState } from 'react';
import suisseIcon from '../../icons/switzerland64.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, SafeAreaView, ActivityIndicator, StatusBar, Image, Text, Button, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, ColorPropType } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

function Home({ navigation, route }) {

    const [startStationName, setStartStationName] = useState('')
    const [endStationName, setEndStationName] = useState('')

    const [startStationId, setStartStationId] = useState(undefined)
    const [endStationId, setEndStationId] = useState(undefined)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const [loading, setLoading] = useState(false)

    const API_CONNECTIONS = "http://transport.opendata.ch/v1/connections?"

    useEffect(() => {
        if (route.params?.startStationId) {
            setStartStationId(route.params?.startStationId)
        }
    }, [route.params?.startStationId]);

    useEffect(() => {
        if (route.params?.endStationId) {
            setEndStationId(route.params?.endStationId)
        }
    }, [route.params?.endStationId]);

    useEffect(() => {
        if (route.params?.startStationName) {
            setStartStationName(route.params?.startStationName)
        }
    }, [route.params?.startStationName]);

    useEffect(() => {
        if (route.params?.endStationName) {
            setEndStationName(route.params?.endStationName)
        }
    }, [route.params?.endStationName]);

    const onChangeDateTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const findTravels = () => {
        const day = (format(date, "yyyy-MM-dd"))
        const time = (format(date, "HH:mm"))
        setLoading(true)
        fetch(`${API_CONNECTIONS}from=${startStationId}&to=${endStationId}&date=${day}&time=${time}`).then(res => res.json()).then((json) => {
            const { connections } = json;
            setLoading(false)
            navigation.navigate('Search', connections)
        });
    }

    const cancelTravels = () => {
        setDate(new Date())
        setStartStationName('')
        setEndStationName('')
        setStartStationId(undefined)
        setEndStationId(undefined)
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: 'white',
                flex: 1,
                padding: 10
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    margin: 10
                }}
            >
                <Image
                    style={{
                        width: 24,
                        height: 24,
                        marginHorizontal: 8
                    }}
                    source={suisseIcon}
                />
                <Text
                    style={styles.headText}
                >Switzerland travel system</Text>
            </View>
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "space-evenly"
                }}
            >
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Station', {pos: 'start'})}>
                    <IconMaterialCommunity
                        name="arrow-top-right"
                        size={40}
                    />
                <Text style={styles.stations}>{startStationName}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        const [a, b] = [endStationName, startStationName]; setStartStationName(a); setEndStationName(b)
                        const [c, d] = [endStationId, startStationId]; setStartStationId(c); setEndStationId(d)
                    }}
                    style={{
                        width: 40,
                        height: 40
                    }}
                >
                    <IconMaterialCommunity
                        name="swap-vertical"
                        size={40}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Station', {pos: 'end'})}>
                    <IconMaterialCommunity
                        name="arrow-bottom-right"
                        size={40}
                    />
                <Text style={styles.stations}>{endStationName}</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        marginBottom: 20
                    }}
                >
                    <TouchableOpacity
                        onPress={showDatepicker}
                        style={styles.textInputContainer}
                    >
                        <IconMaterialCommunity
                            name="calendar"
                            size={40}
                        />
                        <Text
                            placeholder="Date:"
                        >
                            {format(date, "dd/MM")}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={showTimepicker}
                        style={styles.textInputContainer}
                    >
                        <Text
                            placeholder="Time:"
                        >
                            {format(date, "HH:mm")}
                        </Text>
                        <IconMaterialCommunity
                            name="clock"
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDateTime}
                        />
                    )}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>
                    <TouchableOpacity
                        onPress={cancelTravels}
                        style={{
                            ...styles.bigButton,
                            backgroundColor: '#D52B1E'
                        }}
                    >
                        <IconMaterial
                            name="cancel"
                            color="white"
                            size={30}
                        />
                        <Text style={styles.textButton}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={findTravels}
                        style={{
                            ...styles.bigButton,
                            backgroundColor: startStationId == undefined || endStationId == undefined ? 'lightgrey' : 'black'
                        }}
                        disabled={startStationId == undefined || endStationId == undefined}
                    >
                        <IconMaterial
                            name="search"
                            size={30}
                            color="white"
                        />
                        <Text style={styles.textButton}>SEARCH</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        marginVertical: 10
                    }}
                >
                    {loading && <ActivityIndicator color="#D52B1E" size="small" />}
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headText: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0.2,
    },
    stations: {
        marginHorizontal: 20,
        flex: 1,
        padding: 8,
        borderWidth: 1,
        borderRadius: 5
    },
    textInputContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20
    },
    bigButton: {
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center"
    },
    textButton: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: "bold",
        fontSize: 15,
        color: "white",
        lineHeight: 24,
        letterSpacing: 0.1,
        marginHorizontal: 10
    }
});

export default Home