import React, { useEffect, useState } from 'react';
import suisseIcon from '../../icons/switzerland64.png'
import { View, SafeAreaView, StatusBar, Image, Text, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

function Home({ navigation }) {

    const [startStations, setStartStations] = useState([])
    const [startQuery, setStartQuery] = useState("")
    const [endStations, setEndStations] = useState([])
    const [endQuery, setEndQuery] = useState("")

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

    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
        <TouchableWithoutFeedback 
            onPress = {() => { Keyboard.dismiss() }}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    height: '100%',
                    paddingTop: 16,
                }}
            >
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
                                data={startStations.length === 1 && comp(startQuery, startStations[0].name) ? [] : startStations}
                                defaultValue={startQuery}
                                onChangeText={text => setStartQuery(text)}
                                placeholder="Enter a starting station"
                                renderItem={(item) => (
                                    <TouchableOpacity onPress={() => setStartQuery(item.item.name)}>
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
                                data={endStations.length === 1 && comp(endQuery, endStations[0].name) ? [] : endStations}
                                defaultValue={endQuery}
                                onChangeText={text => setEndQuery(text)}
                                placeholder="Enter a destination station"
                                renderItem={(item) => (
                                    <TouchableOpacity onPress={() => {setEndQuery(item.item.name)
                                    }}>
                                        <Text style={styles.itemText}>
                                            {item.item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <Button
                            title="Travel"
                            onPress={() => navigation.navigate('Travel', { id: "prova id" })}
                        />
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
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