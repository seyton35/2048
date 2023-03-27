import { View, StyleSheet } from 'react-native'
import Txt from '../components/custom/Txt'
import Container from '../components/reusable/Container'
import Field from '../components/native/Field'
import Cell from '../components/native/Cell'
import ButtonJoystick from '../components/native/ButtonJoystick'
import { useState } from 'react'

export default function Game() {

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    function up() {
        setY(y - 50)
    }
    function right() {
        setX(x + 50)
    }
    function down() {
        setY(y + 50)
    }
    function left() {
        setX(x - 50)
    }

    return (
        <Container>
            <View style={styles.wrapper}>
                <Txt>2048</Txt>
                <Field>
                    <Cell count={2} x={0} y={0} newX={x} newY={y} />
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
    joystick: {
        marginTop: 40
    }
})