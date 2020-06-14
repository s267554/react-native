import React from 'react';
import { View, Button, Text } from 'react-native';

function Travel({ route, navigation }) {
    const { id } = route.params
    return (
        <View>
            <Text>{id}</Text>
            <Button
                title={id.toString()}
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )
}

export default Travel