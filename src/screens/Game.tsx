import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, Button, Alert, Share } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setBestCell, setBestScore, setScore } from '../store/slices/stateReducer'

import Txt from '../components/custom/Txt'
import Container from '../components/reusable/Container'
import Field from '../components/native/Field'
import Cell from '../components/native/Cell'
import ButtonJoystick from '../components/native/ButtonJoystick'
import Score from '../components/native/Score'
import IconButton from '../components/native/IconButton'
import { useNavigation } from '@react-navigation/native'

const EMPTY_CELL = { c: 0, x: 0, nx: 0, y: 0, ny: 0, shouldDouble: false, shouldClear: false }
const CLEAR_CELL = { ...EMPTY_CELL, c: -1, x: -1, y: -1, nx: -1, ny: -1 }
const FIELD_SIZE = Dimensions.get('window').width / 20 * 19

interface Cell {
    c: number,
    x: number,
    y: number,
    nx: number,
    ny: number,
    shouldDouble: boolean,
    shouldClear: boolean,
}

export default function Game() {
    const {
        fieldGrid,
        score,
        bestScore,
        bestCell
    } = useSelector((s: any) => s.state)
    const [cells, setCells] = useState<Cell[][]>([])

    const dispatch = useDispatch()
    const nav = useNavigation()

    useEffect(() => {
        fillCells()
    }, [])

    useEffect(() => {
        if (bestCell[fieldGrid] == 2048) {
            console.log('congrad') // TODO: make congradulation
        }
    }, [bestCell[fieldGrid]])

    function fillCells() {
        const emptyArr: Cell[][] = []
        for (let i = 0; i < fieldGrid; i++) {
            emptyArr.push([])
            for (let j = 0; j < fieldGrid; j++) {
                emptyArr[i].push({ ...EMPTY_CELL, x: j, y: i })
            }
        }
        setCells(emptyArr)
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
        cells[y][x] = { ...EMPTY_CELL, c: getCellWeight(), x, y, nx: x, ny: y }

        // cells[0][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 0, nx: 0, ny: 0 }
        // cells[1][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 1, nx: 0, ny: 1 }
        // cells[2][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 2, nx: 0, ny: 2 }
        // cells[3][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 3, nx: 0, ny: 3 }
        // cells[4][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 4, nx: 0, ny: 4 }
        // cells[5][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 5, nx: 0, ny: 5 }
        // cells[6][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 6, nx: 0, ny: 6 }
        // cells[7][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 7, nx: 0, ny: 7 }
        // cells[8][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 8, nx: 0, ny: 8 }
        // cells[9][0] = { ...EMPTY_CELL, c: 2, x: 0, y: 9, nx: 0, ny: 9 }
        setCells(cells.map(el => el))
    }

    function getCellWeight() {
        // TODO: random weight, smaller in early-game and higher in late-game
        const weight = [
            2,
            // 4, 8,
        ]
        return weight[Math.floor(Math.random() * weight.length)]
    }

    function swipeTo(move: string) {
        let swipeScore = 0

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
            }, 200);
        }

        function foldHorizontal() {
            setCells(cells.map(row => {
                for (let x = 0; x < row.length; x++) {
                    const cell = row[x];
                    if (cell.shouldDouble) {
                        cell.c *= 2
                        swipeScore += cell.c
                        if (cell.c > bestCell[fieldGrid]) dispatch(setBestCell({ grid: fieldGrid, weight: cell.c }))
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
            matchScore(swipeScore)
            orderCells()
        }

        function moveVertical() {
            for (let x = 0; x < cells.length; x++) {
                let prevCell = CLEAR_CELL
                let posSubstract = 0
                if (move == 'up') {
                    for (let y = 0; y < cells.length; y++) {
                        const cell = cells[y][x];
                        if (cell.c == prevCell.c) {
                            posSubstract++
                            cell.y = cell.ny
                            cell.ny = y - posSubstract
                            prevCell.shouldClear = true
                            cell.shouldDouble = true
                            prevCell = CLEAR_CELL
                        } else if (cell.c == 0) {
                            posSubstract++
                        } else {
                            cell.ny = y - posSubstract
                            prevCell = cell
                        }
                    }
                } else {
                    for (let y = cells.length - 1; y >= 0; y--) {
                        const cell = cells[y][x];
                        if (cell.c == prevCell.c) {
                            posSubstract++
                            cell.y = cell.ny
                            cell.ny = y + posSubstract
                            prevCell.shouldClear = true
                            cell.shouldDouble = true
                            prevCell = CLEAR_CELL
                        } else if (cell.c == 0) {
                            posSubstract++
                        } else {
                            cell.ny = y + posSubstract
                            prevCell = cell
                        }
                    }
                }
            }
            setCells(cells.map(row => row))
            setTimeout(() => {
                foldVertical()
            }, 200);
        }

        function foldVertical() {
            for (let y = 0; y < cells.length; y++) {
                for (let x = 0; x < cells.length; x++) {
                    const cell = cells[y][x];
                    if (cell.shouldDouble) {
                        cell.c *= 2
                        if (cell.c > bestCell[fieldGrid]) dispatch(setBestCell({ grid: fieldGrid, weight: cell.c }))
                        swipeScore += cell.c
                        cell.y = cell.ny
                        cell.shouldDouble = false
                    } else if (cell.shouldClear) {
                        cell.c = 0
                        cell.shouldClear = false
                    } else if (cell.c > 0) {
                        cell.y = cell.ny
                    }
                }
            }
            matchScore(swipeScore)
            orderCells()
        }

        function orderCells() {
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
            setTimeout(() => {
                setCells(nCells)
            }, 200);
        }

        function matchScore(swipeScore: number) {
            const s = score[fieldGrid]
            const b = bestScore[fieldGrid]
            dispatch(setScore({ grid: fieldGrid, score: swipeScore + s }))
            if (b < swipeScore + s) {
                dispatch(setBestScore({ grid: fieldGrid, score: swipeScore + s }))
            }
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
        // setRandomCell();
    }

    function restart() {
        Alert.alert(
            'Сбосить игру?',
            'Вы действительно хотите сбросить игру??',
            [
                { text: 'отмена', onPress: () => null, },
                {
                    text: 'сброс',
                    onPress: () => {
                        setScore(0)
                        fillCells()
                    },
                },
            ]
        )
    }

    function drawCells() {
        const cellDom = []
        for (let i = 0; i < cells.length; i++) {
            for (let j = 0; j < cells[i].length; j++) {
                const { c, x, y, nx, ny } = cells[i][j];
                if (c != 0) {
                    cellDom.push(<Cell key={i * 10 + j}
                        grid={fieldGrid}
                        fieldSize={FIELD_SIZE}
                        count={c}
                        x={x} y={y}
                        nx={nx} ny={ny}
                    />)
                }
            }
        }
        return cellDom
    }

    const onShare = async () => {
        try {
            const result = await Share.share({ message: 'Сможешь ли ты собрать плитку в 2048? Докажи это своим друзьям https://apps.rustore.ru/app/com.2K48' }); //TODO: check url to my app in store
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('1', 1)
                } else {
                    // shared
                    console.log('2', 2)
                    Alert.alert('спасибо');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('3', 3)
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <Container>
            <View style={styles.wrapper}>
                <View style={styles.titleBlock}>
                    <Txt style={styles.titleTxt}>2048</Txt>
                    <View style={styles.scoreBlock}>
                        <Score title='счет'>{score[fieldGrid]}</Score>
                        <Score style={styles.scoreBox} title='рекорд'>{bestScore[fieldGrid]}</Score>
                    </View>
                </View>
                <View style={styles.titleBlock}>
                    <View style={styles.iconBox}>
                        <IconButton name={'home'}
                            onPress={() => nav.goBack()} />
                        <IconButton name={'share'}
                            onPress={onShare} />
                    </View>
                    <View style={styles.iconBox}>
                        <IconButton name={'undo'}
                            onPress={() => { console.log('not today') }} />
                        <IconButton name={'sync'}
                            onPress={restart} />
                    </View>
                </View>
                <Field style={styles.field} size={FIELD_SIZE} grid={fieldGrid}>
                    {drawCells()}
                </Field>
                <View style={{ flexDirection: 'row' }}>
                    {/* <Button title='3' onPress={() => { setFieldGrid(3) }} />
                    <Button title='4' onPress={() => { setFieldGrid(4) }} />
                    <Button title='5' onPress={() => { setFieldGrid(5) }} />
                    <Button title='6' onPress={() => { setFieldGrid(6) }} />
                    <Button title='8' onPress={() => { setFieldGrid(8) }} /> */}
                    <Button title='random cell' onPress={setRandomCell} />
                    <Button title='clo 0' onPress={() => {
                        // console.log(cells)
                        console.log(bestCell[fieldGrid])

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
        alignItems: 'center',
        justifyContent: 'center',
        flex: .85
    },
    titleBlock: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    titleTxt: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    iconBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '25%'
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
        position: 'absolute',
        bottom: -100,
        left: 0
    }
})