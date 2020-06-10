import React, { useEffect, useState } from 'react';
import suisseIcon from '../../icons/switzerland64.png'
import { View, SafeAreaView, StatusBar, Image, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

function Home({ navigation }) {

    const [stations, setStations] = useState([])
    const [query, setQuery] = useState("")

    function renderStation(station) {
        const { name } = station;
        return (
            <View>
                <Text style={styles.titleText}>{name}</Text>
            </View>
        );
    }

    const API = "http://transport.opendata.ch/v1/locations?type=stations&query="

    useEffect(() => {
        fetch(`${API}${query}`).then(res => res.json()).then((json) => {
            const { stations } = json;
            setStations(stations);
        });
    }, [query])

    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
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
                    {/*qua ficca le varie cose*/}
                    <View style={styles.container}>
                        <Text>Starting stations</Text>
                        <Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            containerStyle={styles.autocompleteContainer}
                            data={stations.length === 1 && comp(query, stations[0].name) ? [] : stations}
                            defaultValue={query}
                            onChangeText={text => setQuery(text)}
                            placeholder="Enter "
                            renderItem={({ name }) => (
                                <TouchableOpacity onPress={() => setQuery(name)}>
                                    <Text style={styles.itemText}>
                                        {name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <View style={styles.descriptionContainer}>
                            {stations.length > 0 ? (
                                renderStation(stations[0])
                            ) : (
                                    <Text style={styles.infoText}>
                                        Enter a starting station
                                    </Text>
                                )}
                        </View>
                    </View>
                    <View style={styles.autocompleteContainer}>
                        <Text>Ending station</Text>
                        {/*<Autocomplete { your props } />*/}
                    </View>
                    <Button
                        title="Vai a Travel"
                        onPress={() => navigation.navigate('Travel', { id: "prova id" })}
                    />
                </View>
            </SafeAreaView>
        </View>
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
    }
});

export default Home