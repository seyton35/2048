import { View, StyleSheet, Dimensions, Button } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBestScore } from '../store/slices/stateReducer'

import Txt from '../components/custom/Txt'
import Container from '../components/reusable/Container'
import Field from '../components/native/Field'
import Cell from '../components/native/Cell'
import ButtonJoystick from '../components/native/ButtonJoystick'
import Score from '../components/native/Score'

export default function Game() {
    const FIELD_SIZE = Dimensions.get('window').width / 10 * 9

    const [fieldGrid, setFieldGrid] = useState(2)
    const cellWeight = useRef(2)

    const [cells, setCells] = useState<{ c: number, x: number, y: number }[][]>([])
    const [score, setScore] = useState(0)
    const { bestScore } = useSelector((s: any) => s.state)

    const dispatch = useDispatch()

    useEffect(() => {
        fillCells()
    }, [])

    function fillCells() {
        for (let i = 0; i < fieldGrid; i++) {
            cells.push([])
            for (let j = 0; j < fieldGrid; j++) {
                cells[i].push({ c: 0, x: j, y: i })
            }
        }
        console.log('fiiled');
    }

    function setRandomCell() {
        const arr = Array()
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells.length; j++) {
                const cell = cells[i][j];
                if (cell.c == 0) arr.push(cell)
            }
        }
        if (arr.length == 0) {
            console.log('full field')
            return
        }

        const randomCell = arr[Math.floor(Math.random() * arr.length)]
        const { x, y } = randomCell
        cells[y][x] = { c: cellWeight.current, x, y }
        setCells(cells.map(el => el))
    }

    function swipeTo(move: string) {

        const arr = cells
        let localScore = 0
        console.log('cells before:')
        // arr.map(row => {
        //     console.log(row)
        // })

        function horizontalFold(i: number, j: number, prev: { c: number, pos: number }) {
            const cur = arr[i][j];
            if (prev.c === cur.c) {
                console.log(arr[i][prev.pos])
                localScore += arr[i][prev.pos].c * 2
                arr[i][prev.pos].c *= 2
                arr[i][j].c = 0
                prev = { c: -1, pos: -1 }
            } else if (cur.c != 0) {
                prev = { c: cur.c, pos: j }
            }
            return prev
        }
        function verticalFold(i: number, j: number, prev: { c: number, pos: number }) {
            const cur = arr[j][i];
            if (prev.c === cur.c) {
                localScore += arr[j][i].c * 2
                arr[prev.pos][i].c *= 2
                arr[j][i].c = 0
                prev = { c: -1, pos: -1 }
            } else if (cur.c != 0) {
                prev = { c: cur.c, pos: j }
            }
            return prev
        }

        function sortHorizontal(i: number,) {
            const newArrJ = []
            const newEmptyArrJ = []
            for (let j = 0; j < arr[i].length; j++) {
                const cell = arr[i][j];
                if (cell.c > 0) newArrJ.push(cell)
                else newEmptyArrJ.push({ c: 0, y: i, x: j }) // added xy
            }
            if (move == 'left') {
                arr[i] = newArrJ.concat(newEmptyArrJ)
            } else arr[i] = newEmptyArrJ.concat(newArrJ)
        }

        function sortVertical() {
            const map = new Map
            for (let i = 0; i < arr.length; i++) {
                map.set(i, [])
                for (let j = 0; j < arr[i].length; j++) {
                    const cell = arr[j][i]
                    if (cell.c > 0) {
                        map.get(i).push(cell)
                    }
                }
            }
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (move == 'up') {
                        const cell = map.get(i)[j]
                        if (cell) {
                            arr[j][i] = cell
                        }
                        else arr[j][i] = { c: 0, x: j, y: i }
                    }
                    else {
                        const cell = map.get(i).pop()
                        if (cell) {
                            arr[arr.length - j - 1][i] = cell
                        }
                        else arr[arr.length - j - 1][i] = { c: 0, x: j, y: i }
                    }
                }
            }
        }

        switch (move) {
            case 'left':
                for (let i = 0; i < arr.length; i++) {
                    let prev = { c: -1, pos: -1 }
                    for (let j = 0; j < arr.length; j++) {
                        prev = horizontalFold(i, j, prev)
                    }
                    sortHorizontal(i)
                }
                break;
            case 'right':
                for (let i = 0; i < arr.length; i++) {
                    let prev = { c: -1, pos: -1 }
                    for (let j = arr.length - 1; j >= 0; j--) {
                        prev = horizontalFold(i, j, prev)
                    }
                    sortHorizontal(i)
                }
                break;
            case 'up':
                for (let i = 0; i < arr.length; i++) {
                    let prev = { c: -1, pos: -1 }
                    for (let j = 0; j < arr.length; j++) {
                        prev = verticalFold(i, j, prev)
                    }
                }
                sortVertical()
                break;
            case 'down':
                for (let i = 0; i < arr.length; i++) {
                    let prev = { c: -1, pos: -1 }
                    for (let j = arr.length - 1; j >= 0; j--) {
                        prev = verticalFold(i, j, prev)
                    }
                }
                sortVertical()
                break;
        }
        setScore(score + localScore)
        if (bestScore < score + localScore) {
            dispatch(setBestScore(score + localScore))
        }
        // console.log('cells after:')
        // arr.map(row => {
        //     console.log(row)
        // })
        setCells(cells.map(el => el))
        setRandomCell();
    }

    function drawCells() {
        const cellDom = []
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                const { c, x, y } = cells[i][j];
                if (c > 0) {
                    cellDom.push(<Cell key={i * 10 + j}
                        size={FIELD_SIZE / fieldGrid}
                        count={c}
                        x={j} y={i}
                    />)
                }
            }
        }
        return cellDom
    }

    return (
        <Container>
            <View style={styles.wrapper}>
                <View style={styles.titleBlock}>
                    <Txt style={styles.titleTxt}>2048</Txt>
                    <View style={styles.scoreBlock}>
                        <Score title='счет'>{score}</Score>
                        <Score style={styles.scoreBox} title='рекорд'>{bestScore}</Score>
                    </View>
                </View>
                <Field style={styles.field} size={FIELD_SIZE}>
                    {drawCells()}
                </Field>
                <View style={{ flexDirection: 'row' }}>
                    <Button title='2' onPress={() => { setFieldGrid(2) }} />
                    <Button title='3' onPress={() => { setFieldGrid(3) }} />
                    <Button title='4' onPress={() => { setFieldGrid(4) }} />
                    <Button title='5' onPress={() => { setFieldGrid(5) }} />
                    <Button title='10' onPress={() => { setFieldGrid(10) }} />
                    <Button title='clear' onPress={() => { setCells([]) }} />
                    <Button title='fill' onPress={() => { fillCells() }} />
                    <Button title='random cell' onPress={setRandomCell} />
                </View>
                <ButtonJoystick style={styles.joystick}
                    swipe={swipeTo}
                />

            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        alignItems: 'center'
    },
    titleBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    titleTxt: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    scoreBlock: {
        flexDirection: 'row'
    },
    scoreBox: {
        marginLeft: 10
    },


    field: {
        marginTop: 20
    },
    joystick: {
        marginTop: 40
    }
})