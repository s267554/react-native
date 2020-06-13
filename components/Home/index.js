import React, { useEffect, useState } from 'react';
import suisseIcon from '../../icons/switzerland64.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, SafeAreaView, ActivityIndicator, StatusBar, Image, Text, Button, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, ColorPropType } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { ScrollView } from 'react-native-gesture-handler';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Connection from '../Connection';
import { format } from 'date-fns';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';


function Home({ navigation }) {

    const [startStations, setStartStations] = useState([])
    const [startStationId, setStartStationId] = useState(undefined)
    const [endStationId, setEndStationId] = useState(undefined)
    const [startQuery, setStartQuery] = useState("")
    const [endStations, setEndStations] = useState([])
    const [endQuery, setEndQuery] = useState("")
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [travels, setTravels] = useState([])
    const [startFlag, setStartFlag] = useState(false)
    const [endFlag, setEndFlag] = useState(false)
    const [loading, setLoading] = useState(false)

    const API = "http://transport.opendata.ch/v1/locations?type=stations&query="
    const API_CONNECTIONS = "http://transport.opendata.ch/v1/connections?"

    useEffect(() => {
        fetch(`${API}${startQuery}`).then(res => res.json()).then((json) => {
            const { stations } = json;
            setStartStations(stations);
        });
    }, [startQuery])

    useEffect(() => {
        fetch(`${API}${endQuery}`).then(res => res.json()).then((json) => {
            const { stations } = json;
            setEndStations(stations);
        });
    }, [endQuery])

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
            setTravels(connections);
            setLoading(false)
        });
    }

    const cancelTravels = () => {
        setDate(new Date())
        setTravels([])
        setStartQuery("")
        setEndQuery("")
        setStartStationId(undefined)
        setEndStationId(undefined)
        setStartStations([])
        setEndStations([])
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps='handled'
            style={{
                backgroundColor: '#EBEDEF',
                flexDirection: 'column',
                height: '100%',
                //paddingTop: 16,
            }}
        >
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={styles.searchContainer}>
                <View
                    style={{
                        margin: 10,
                        flexDirection: 'row',
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
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        padding: 20,
                    }}
                >
                    <View style={styles.container}>

                        <IconMaterialCommunity
                            name="arrow-top-right"
                            size={40}
                        />
                        <Text
                            placeholder="Date:"
                        >
                            {date.toLocaleDateString()}
                        </Text>
                    </View>
                    <View>
                        <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            containerStyle={styles.autocompleteContainer}
                            inputContainerStyle={{ borderWidth: 0 }}
                            data={startFlag ? [] : startStations}
                            onFocus={() => setStartFlag(false)}
                            onBlur={() => setStartFlag(true)}
                            defaultValue={startQuery}
                            onChangeText={text => setStartQuery(text)}
                            placeholder="From:"
                            renderItem={(item) => (
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss();
                                    setStartFlag(true);
                                    setStartQuery(item.item.name)
                                    setStartStationId(item.item.id)
                                }}>
                                    <Text style={styles.itemText}>
                                        {item.item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            const [a, b] = [endQuery, startQuery]; setStartQuery(a); setEndQuery(b)
                            const [c, d] = [endStationId, startStationId]; setStartStationId(c); setEndStationId(d)
                        }}
                    >
                        <Text
                            placeholder="Time:"
                        >
                            {format(date, "HH:mm")}
                        </Text>
                        <IconMaterialCommunity
                            name="swap-vertical"
                            size={40}
                        />
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <IconMaterialCommunity
                            name="arrow-bottom-right"
                            size={40}
                        />
                        <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            containerStyle={styles.autocompleteContainer}
                            inputContainerStyle={{ borderWidth: 0 }}
                            data={endFlag ? [] : endStations}
                            onFocus={() => setEndFlag(false)}
                            onBlur={() => setEndFlag(true)}
                            defaultValue={endQuery}
                            onChangeText={text => setEndQuery(text)}
                            placeholder="To:"
                            renderItem={(item) => (
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss();
                                    setEndFlag(true);
                                    setEndQuery(item.item.name)
                                    setEndStationId(item.item.id)
                                }}>
                                    <Text style={styles.itemText}>
                                        {item.item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
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
                                {date.toDateString().split(' ').slice(0, 3).join(' ')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={showTimepicker}
                            style={styles.textInputContainer}
                        >
                            <Text
                                placeholder="Time:"
                            >
                                {date.toLocaleTimeString().split(':').slice(0, 2).join(':')}
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
                            onPress={findTravels}
                            style={startStationId == undefined || endStationId == undefined ? styles.searchButtonDisabled : styles.searchButton}
                            disabled={startStationId == undefined || endStationId == undefined}
                        >
                            <IconMaterial
                                name="search"
                                size={30}
                                color="white"
                            />
                            <Text style={styles.textButton}>SEARCH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={cancelTravels}
                            style={styles.cancelButton}
                        >
                            <IconMaterial
                                name="cancel"
                                color="white"
                                size={30}
                            />
                            <Text style={styles.textButton}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                    {loading && <ActivityIndicator color="#D52B1E" size="small" />}
                    {travels.map((travel) => {
                        return <Connection connection={travel} />
                    })}
                </SafeAreaView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10
    },
    headText: {
        fontFamily: 'Montserrat-Medium',
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0.2,
    },
    textInputContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    container: {
        flexDirection: "row",
        paddingTop: 25,
        paddingBottom: 35
    },
    autocompleteContainer: {
        marginLeft: 15,
        left: 0,
        right: 0,
        top: 0,
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
    },
    searchButton: {
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: '#D52B1E',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center"
    },
    searchButtonDisabled: {
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: '#BDBDBD',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center"
    },
    cancelButton: {
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: "center",
        backgroundColor: '#D52B1E',
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