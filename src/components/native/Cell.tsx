import { StyleSheet, Animated, View } from 'react-native'
import Txt from '../custom/Txt'
import { useEffect, useRef, useState } from 'react';

interface Props {
    size: number,
    count: number,
    x: number,
    y: number,
}

const WEIGHT_COLORS: { [key: number]: string } = {
    2: '#f1e9e2',
    4: '#ebdfc8',
    8: '#f1b177',
    16: '#f49663',
    32: '#f57a5f',
    64: '#f45f3a',
    128: '#ebcf72',
    256: '#ebcd61',
    512: '#ebc84e',
    1024: '#ebc63e',
    2048: '#ebc12d',
}

export default function Cell({ size, count, x, y }: Props) {
    const posX = useRef(new Animated.Value(x * size)).current
    const posY = useRef(new Animated.Value(y * size)).current
    const scale = useRef(new Animated.Value(1)).current

    const [counter, setCounter] = useState(count)

    useEffect(() => {
        bulgingCell()
        setCounter(count)
    }, [count])

    useEffect(() => {
        riseCell()
    }, [])
    useEffect(() => {
        move(posX, x)
    }, [x])
    useEffect(() => {
        move(posY, y)
    }, [y])


    function bulgingCell() {
        Animated.sequence([
            Animated.timing(
                scale,
                {
                    toValue: 1.2,
                    useNativeDriver: true,
                    duration: 100
                }),
            Animated.timing(
                scale,
                {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 100
                })
        ]).start()
    }

    function riseCell() {
        Animated.sequence([
            Animated.timing(
                scale,
                {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 0
                }),
            Animated.timing(
                scale,
                {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 100
                })
        ]).start()
    }

    function move(direction: Animated.Value, newPos: number) {
        Animated.timing(
            direction,
            {
                toValue: newPos * size,
                useNativeDriver: true,
                duration: 500
            }).start()
    }

    function animation() {
        return {
            transform: [
                { translateX: posX },
                { translateY: posY },
                { scale }
            ]
        }
    }

    function getSize() {
        const style = {
            width: size,
            height: size,
        }
        return style
    }
    function getCellBackgroundStyle() {
        const color = WEIGHT_COLORS[count]
        const style = {
            width: size - 4,
            height: size - 4,
            backgroundColor: color
        }
        return style
    }

    return (
        <Animated.View style={[styles.cell, getSize(), animation(),]}>
            <View style={[styles.cellBackground, getCellBackgroundStyle()]}>
                <Txt style={styles.cellTxt}>{counter}</Txt>
                {/* <Txt style={styles.cellTxt}>{`x:${x} y:${y}`}</Txt> */}
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
        // backgroundColor: '#80ff80',
        borderRadius: 10
    },
    cellTxt: {
        fontWeight: '900'
    }
})