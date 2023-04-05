import { StyleSheet, Animated, View } from 'react-native'
import Txt from '../custom/Txt'
import { useEffect, useRef, useState } from 'react';
import { FONT_SIZES, PADDING_SIZES, WEIGHT_COLORS } from '../../consts/field';

interface Props {
    grid: number,
    fieldSize: number,
    count: number,
    x: number,
    y: number,
    nx: number,
    ny: number,
}



export default function Cell({ grid, fieldSize, count, x, y, nx, ny }: Props) {
    const PADDING = PADDING_SIZES[grid]
    const CELL_SIZE = (fieldSize - PADDING) / grid
    const posX = useRef(new Animated.Value(x * CELL_SIZE)).current
    const posY = useRef(new Animated.Value(y * CELL_SIZE)).current
    const scale = useRef(new Animated.Value(1)).current

    const [counter, setCounter] = useState(count)

    useEffect(() => {
        // bulgingCell()
        setCounter(count)
    }, [count])

    useEffect(() => {
        move(posX, x, nx)
    }, [nx])
    useEffect(() => {
        move(posY, y, ny)
    }, [ny])


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

    function move(direction: Animated.Value, pos: number, newPos: number) {
        Animated.sequence([
            Animated.timing(
                direction,
                {
                    toValue: pos * CELL_SIZE,
                    useNativeDriver: true,
                    duration: 0
                }),
            Animated.timing(
                direction,
                {
                    toValue: newPos * CELL_SIZE,
                    useNativeDriver: true,
                    duration: 200
                })
        ]).start()
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
            width: CELL_SIZE,
            height: CELL_SIZE,
        }
        return style
    }
    function getCellBackgroundStyle() {
        const color = WEIGHT_COLORS[count]
        const style = {
            width: CELL_SIZE - PADDING,
            height: CELL_SIZE - PADDING,
            backgroundColor: color
        }
        return style
    }

    return (
        <Animated.View style={[styles.cell, getSize(), animation(),]}>
            <View style={[styles.cellBackground, getCellBackgroundStyle()]}>
                <Txt style={[styles.cellTxt, { fontSize: FONT_SIZES[grid] }]}>{counter}</Txt>
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
        borderRadius: 5
    },
    cellTxt: {
        fontWeight: '900'
    }
})