import React from "react";
import { ActivityIndicator, View,Modal } from 'react-native'

const ModalLoader = ({visible}) => {
    return (
        <Modal transparent={false} visible={visible}>
        <View style={{
            justifyContent: "center",
            height: '100%',
            width: '100%'
        }}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
        </Modal>
    )
}
export default ModalLoader;