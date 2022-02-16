import React from "react";
import { ActivityIndicator, View } from 'react-native'

const Loader = () => {
    return (
        <View style={{
            justifyContent: "center",
            height: '100%',
            width: '100%'
        }}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}
export default Loader;