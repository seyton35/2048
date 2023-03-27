import { View, StyleSheet, Dimensions, Animated } from 'react-native'
import Txt from '../custom/Txt'
import { useEffect, useRef } from 'react';

interface Props {
    count: number,
    x: number,
    y: number,
    newX: number,
    newY: number
}

export default function Cell({ count, x, y, newX, newY }: Props) {
    const Width = Dimensions.get('window').width;
    const posX = useRef(new Animated.Value(x)).current
    const posY = useRef(new Animated.Value(y)).current

    useEffect(() => {
        moveX(newX)
    }, [newX])
    useEffect(() => {
        moveY(newY)
    }, [newY])


    function moveX(newX: number) {
        Animated.spring(
            posX,
            {
                toValue: newX,
                useNativeDriver: true
            }
        ).start()
    }
    function moveY(newY: number) {
        Animated.spring(
            posY,
            {
                toValue: newY,
                useNativeDriver: true
            }
        ).start()
    }

    function moveTo() {

        return {
            transform: [
                { translateX: posX },
                { translateY: posY }
            ]
        }
    }

    function getStyle() {
        const style = {
            width: (Width - 62) / 5,
            height: (Width - 62) / 5,

        }
        return style
    }

    return (
        <Animated.View style={[styles.cell, getStyle(), moveTo()]}>
            <Txt style={styles.cellTxt}>{count}</Txt>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cell: {
        backgroundColor: '#80ff80',
        width: 10,
        height: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    cellTxt: {
        fontWeight: '900'
    }
})