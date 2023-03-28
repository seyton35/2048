import { View, StyleSheet, Dimensions } from 'react-native'
import Txt from '../components/custom/Txt'
import Container from '../components/reusable/Container'
import Field from '../components/native/Field'
import Cell from '../components/native/Cell'
import ButtonJoystick from '../components/native/ButtonJoystick'
import React, { useState, useEffect, useRef } from 'react'

export default function Game() {
    const FIELD_SIZE = Dimensions.get('window').width / 10 * 9

    const [fieldGrid, setFieldGrid] = useState(5)
    const cellWeight = useRef(2)

    const [cells, setCells] = useState(new Array)
    const [emptyCells, setEmptyCells] = useState(new Set)

    useEffect(() => {
        fillEmptyCells()
        console.log('fiiled');
    }, [])

    function fillEmptyCells() {
        const set = new Set
        for (let i = 0; i < fieldGrid; i++) {
            for (let j = 0; j < fieldGrid; j++) {
                set.add(i + '' + j)
            }
        }
        setEmptyCells(set)
    }

    function setRandomCell() {
        const empty = emptyCells
        const arr = Array.from(empty)
        if (arr.length == 0) {
            console.log('game over')
            return
        }
        const rand = arr[Math.floor(Math.random() * arr.length)]
        empty.delete(rand)
        const x = Number(String(rand).slice(0, 1))
        const y = Number(String(rand).slice(1, 2))
        cells.push({ c: cellWeight.current, x, y })
        console.log(cells[cells.length - 1]);

        setCells(cells.map(el => el))
    }

    function up() {
        setRandomCell();
    }
    function right() {
        setRandomCell();
    }
    function down() {
        setRandomCell();
    }
    function left() {
        setRandomCell();
    }

    return (
        <Container>
            <View style={styles.wrapper}>
                <Txt>2048</Txt>
                <Field style={styles.field} size={FIELD_SIZE}>
                    {cells.map((cell, index) =>
                        <Cell key={index}
                            size={FIELD_SIZE / fieldGrid}
                            count={cell.c}
                            x={cell.x} y={cell.y}
                        />
                    )}
                </Field>

                <ButtonJoystick style={styles.joystick} up={up} right={right} down={down} left={left} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        alignItems: 'center'
    },
    field: {
        marginTop: 20
    },
    joystick: {
        marginTop: 40
    }
})