import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';

function Travel({ navigation, id }) {
    return (
        <View>
            <Text>{id}</Text>
            <Button
                title="Back to home"
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )
}

export default Travel