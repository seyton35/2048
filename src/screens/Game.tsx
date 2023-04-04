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

const EMPTY_CELL = { c: 0, x: 0, nx: 0, y: 0, ny: 0, shouldDouble: false, shouldClear: false }
const CLEAR_CELL = { ...EMPTY_CELL, c: -1, x: -1, y: -1, nx: -1, ny: -1 }

export default function Game() {
    const FIELD_SIZE = Dimensions.get('window').width / 10 * 9
    const [fieldGrid, setFieldGrid] = useState(4)
    const cellWeight = useRef(2)

    interface Cell {
        c: number,
        x: number,
        y: number,
        nx: number,
        ny: number,
        shouldDouble: boolean,
        shouldClear: boolean,
    }

    const [cells, setCells] = useState<Cell[][]>([])
    const refCells = useRef<Cell[][]>([])
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
                cells[i].push({ ...EMPTY_CELL, x: j, y: i })
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
            console.log('full field')//TODO: end game, if no way to continue
            return
        }

        const randomCell = arr[Math.floor(Math.random() * arr.length)]
        const { x, y } = randomCell
        // cells[y][x] = { c: getCellWeight(), x, y, }

        cells[0][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 0, nx: 0, ny: 0 }
        cells[1][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 1, nx: 0, ny: 1 }
        cells[2][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 2, nx: 0, ny: 2 }
        cells[3][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 3, nx: 0, ny: 3 }
        cells[4][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 4, nx: 0, ny: 4 }
        cells[5][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 5, nx: 0, ny: 5 }
        cells[6][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 6, nx: 0, ny: 6 }
        cells[7][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 7, nx: 0, ny: 7 }
        cells[8][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 8, nx: 0, ny: 8 }
        cells[9][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 9, nx: 0, ny: 9 }
        setCells(cells.map(el => el))
    }

    function getCellWeight() {
        // TODO: random weight, smaller in early-game and higher in late-game
        const weight = [
            2,
            // 4, 8,
        ]
        return weight[Math.floor(Math.random() * weight.length)]
        return cellWeight.current
    }

    function swipeTo(move: string) {

        const arr = cells
        let swipeScore = 0

        function foldVertical(i: number, j: number, prev: { c: number, pos: number }) {
            const cur = arr[j][i];
            if (prev.c === cur.c) {
                swipeScore += arr[j][i].c * 2
                arr[i][prev.pos] = { ...arr[i][prev.pos], c: cur.c * 2, x: i, y: j }
                // arr[prev.pos][i].c *= 2
                arr[j][i].c = 0
                prev = { c: -1, pos: -1 }
            } else if (cur.c != 0) {
                prev = { c: cur.c, pos: j }
            }
            return prev
        }

        function moveHorizontal() {
            setCells(cells.map((row, y) => {
                let prevCell = CLEAR_CELL
                let posSubstract = 0
                if (move == 'left') {
                    for (let x = 0; x < row.length; x++) {
                        const cell = row[x];
                        if (cell.c == prevCell.c) {
                            posSubstract++
                            cell.x = cell.nx
                            cell.nx = x - posSubstract
                            cell.shouldClear = true
                            prevCell.shouldDouble = true
                            prevCell = CLEAR_CELL
                        } else if (cell.c == 0) {
                            posSubstract++
                        } else if (cell.c != prevCell.c) {
                            cell.nx = x - posSubstract
                            prevCell = cell
                        }
                    }
                } else {
                    for (let x = row.length - 1; x >= 0; x--) {
                        const cell = row[x];
                        if (cell.c == prevCell.c) {
                            posSubstract++
                            cell.x = cell.nx
                            cell.nx = x + posSubstract
                            cell.shouldClear = true
                            prevCell.shouldDouble = true
                            prevCell = CLEAR_CELL
                        } else if (cell.c == 0) {
                            posSubstract++
                        } else {
                            cell.nx = x + posSubstract
                            prevCell = cell
                        }
                    }

                }
                return row
            }))
            setTimeout(() => {
                foldHorizontal()
            }, 500);
        }

        function foldHorizontal() {
            setCells(cells.map(row => {
                for (let x = 0; x < row.length; x++) {
                    const cell = row[x];
                    if (cell.shouldDouble) {
                        cell.c *= 2
                        cell.x = cell.nx
                        cell.shouldDouble = false
                    } else if (cell.shouldClear) {
                        cell.c = 0
                        cell.shouldClear = false
                    } else if (cell.c > 0) {
                        cell.x = cell.nx
                    }
                }
                return row
            }))
            setCells(orderCells())
        }

        function orderCells() {
            // for (let x = 0; x < cells[0].length; x++) {
            //     const cell = cells[0][x];
            //     console.log('cell', cell)
            // }
            const nCells: Cell[][] = []
            for (let y = 0; y < fieldGrid; y++) {
                nCells.push([])
                for (let x = 0; x < fieldGrid; x++) {
                    nCells[y].push({ ...EMPTY_CELL, x, y, nx: x, ny: y })
                }
            }
            for (let y = 0; y < cells.length; y++) {
                for (let x = 0; x < cells[y].length; x++) {
                    const cell = cells[y][x];
                    if (cell.c) {
                        nCells[cell.y][cell.x] = cell
                    }
                }
            }
            return nCells
        }

        function moveVertical() {
            for (let x = 0; x < cells.length; x++) {
                let prevCellVeight = -1
                let posSubstract = 0
                if (move == 'up') {
                    for (let y = 0; y < cells.length; y++) {
                        const cell = cells[y][x];
                        if (cell.c == prevCellVeight) {
                            posSubstract++
                            cell.y = y - posSubstract
                            prevCellVeight = -1
                        } else if (cell.c == 0) {
                            posSubstract++
                        } else {
                            cell.y = y - posSubstract
                            prevCellVeight = cell.c
                        }
                    }
                } else {
                    for (let y = cells.length - 1; y >= 0; y--) {
                        const cell = cells[y][x];
                        if (cell.c == prevCellVeight) {
                            posSubstract++
                            cell.y = y + posSubstract
                            prevCellVeight = -1
                        } else if (cell.c == 0) {
                            posSubstract++
                        } else {
                            cell.y = y + posSubstract
                            prevCellVeight = cell.c
                        }
                    }

                }

            }
            setCells(cells.map(row => row))
        }

        switch (move) {
            case 'left':
                moveHorizontal()
                break;
            case 'right':
                moveHorizontal()
                break;
            case 'up':
                moveVertical()
                break;
            case 'down':
                moveVertical()
                break;
        }
        setScore(score + swipeScore)
        if (bestScore < score + swipeScore) {
            dispatch(setBestScore(score + swipeScore))
        }
        // console.log('cells after:')
        // arr.map(row => {
        //     console.log(row)
        // })
        // logRow(move)// debug

        setCells(cells.map(el => el))
        // setRandomCell();
    }

    function drawCells() {
        const cellDom = []
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                const { c, x, y, nx, ny } = cells[i][j];
                if (c != 0) {
                    cellDom.push(<Cell key={i * 10 + j}
                        size={FIELD_SIZE / fieldGrid}
                        count={c}
                        x={x} y={y}
                        nx={nx} ny={ny}
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
                    <Button title='3' onPress={() => { setFieldGrid(3) }} />
                    <Button title='4' onPress={() => { setFieldGrid(4) }} />
                    <Button title='10' onPress={() => { setFieldGrid(10) }} />
                    <Button title='clear' onPress={() => {
                        setCells([])
                        console.log("clear");
                    }} />
                    <Button title='fill' onPress={() => { fillCells() }} />
                    <Button title='random cell' onPress={setRandomCell} />
                    <Button title='clo 0' onPress={() => {
                        console.log('row 0')
                        cells[0].map(cell => {
                            const { c, x, nx } = cell
                            console.log('c:', c, ' x:', x, ' nx:', nx)
                        })
                    }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
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