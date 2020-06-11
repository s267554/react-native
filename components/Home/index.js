import React, { useEffect, useState } from 'react';
import suisseIcon from '../../icons/switzerland64.png'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, SafeAreaView, StatusBar, Image, Text, Button, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { ScrollView } from 'react-native-gesture-handler';

function Home({ navigation }) {

    const [startStations, setStartStations] = useState([])
    const [startQuery, setStartQuery] = useState("")
    const [endStations, setEndStations] = useState([])
    const [endQuery, setEndQuery] = useState("")
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [startFlag, setStartFlag] = useState(false)
    const [endFlag, setEndFlag] = useState(false)


    const API = "http://transport.opendata.ch/v1/locations?type=stations&query="

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

    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
        <TouchableWithoutFeedback
            onPress={() => { Keyboard.dismiss() }}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    height: '100%',
                    paddingTop: 16,
                }}
            >
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
                    <View
                        style={{
                            backgroundColor: '#FDFDFE',
                        }}
                    >
                        <SafeAreaView>
                            <View
                                style={{
                                    padding: 16,
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
                                    style={{
                                        fontFamily: 'Montserrat-Medium',
                                        fontSize: 16,
                                        lineHeight: 24,
                                        letterSpacing: 0.1
                                    }}
                                >Switzerland travel system</Text>
                            </View>
                        </SafeAreaView>
                    </View>
                    <SafeAreaView
                        style={{
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'stretch',
                                padding: 20,
                            }}
                        >
                            <Text>Starting station: </Text>
                            <View style={styles.container}>
                                <Autocomplete
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    containerStyle={styles.autocompleteContainer}
                                    data={(startStations.length > 0 && comp(startQuery, startStations[0].name)) && startFlag ? [] : startStations}
                                    onFocus={() => setStartFlag(false)}
                                    onBlur={() => setStartFlag(true)}
                                    defaultValue={startQuery}
                                    onChangeText={text => setStartQuery(text)}
                                    placeholder="Enter a departing station"
                                    renderItem={(item) => (
                                        <TouchableOpacity onPress={() => { Keyboard.dismiss(); setStartFlag(true); setStartQuery(item.item.name) }}>
                                            <Text style={styles.itemText}>
                                                {item.item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <Text>Ending station:</Text>
                            <View style={styles.container}>
                                <Autocomplete
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    containerStyle={styles.autocompleteContainer}
                                    data={(endStations.length > 0 && comp(endQuery, endStations[0].name)) && endFlag ? [] : endStations}
                                    onFocus={() => setEndFlag(false)}
                                    onBlur={() => setEndFlag(true)}
                                    defaultValue={endQuery}
                                    onChangeText={text => setEndQuery(text)}
                                    placeholder="Enter an arrival station"
                                    renderItem={(item) => (
                                        <TouchableOpacity onPress={() => { Keyboard.dismiss(); setEndFlag(true); setEndQuery(item.item.name) }}>
                                            <Text style={styles.itemText}>
                                                {item.item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
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
                            <View>
                                <Button
                                    title="Vai a Travel"
                                    onPress={() => navigation.navigate('Travel', { id: "prova id" })}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingBottom: 25
    },
    autocompleteContainer: {
        left: 0,
        right: 0,
        top: 0
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 25
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    },

});

export default Home