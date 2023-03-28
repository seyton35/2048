import { StyleSheet, Animated, View } from 'react-native'
import Txt from '../custom/Txt'
import { useEffect, useRef, useState } from 'react';

interface Props {
    size: number,
    count: number,
    x: number,
    y: number,
}

export default function Cell({ size, count, x, y, }: Props) {
    const posX = useRef(new Animated.Value(x * size)).current
    const posY = useRef(new Animated.Value(y * size)).current

    const [counter, setcounter] = useState(count)

    useEffect(() => {
        move(posX, x * size)
    }, [x])
    useEffect(() => {
        move(posY, y * size)
    }, [y])


    function move(direction: Animated.Value, newPos: number) {
        Animated.spring(
            direction,
            {
                toValue: newPos,
                useNativeDriver: true
            }
        ).start(({ finished }) => {
            if (finished) {
                // doubleCounter()
            }
        })
    }

    function moveTo() {
        return {
            transform: [
                { translateX: posX },
                { translateY: posY }
            ]
        }
    }

    function getCellStyle() {
        const style = {
            width: size,
            height: size,
        }
        return style
    }
    function getCellBackgroundStyle() {
        const style = {
            width: size - 4,
            height: size - 4,
        }
        return style
    }

    return (
        <Animated.View style={[styles.cell, getCellStyle(), moveTo()]}>
            <View style={[styles.cellBackground, getCellBackgroundStyle()]}>

                <Txt style={styles.cellTxt}>{counter}</Txt>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cell: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    cellBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#80ff80',
    },
    cellTxt: {
        fontWeight: '900'
    }
})