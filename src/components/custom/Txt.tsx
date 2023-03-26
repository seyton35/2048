import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
    children: string,
    style?: {},
}

const Txt: React.FC<Props> = ({ children, style }) => {
    return (
        <Text style={[styles.text, style]}>
            {children}
        </Text >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Ubuntu-Regular',
    },
})

export default Txt