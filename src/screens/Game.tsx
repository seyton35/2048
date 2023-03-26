import { View, StyleSheet } from 'react-native'
import Txt from '../components/custom/Txt'
import Container from '../components/reusable/Container'
import Field from '../components/native/Field'
import Cell from '../components/native/Cell'

export default function Game() {
    return (
        <Container>
            <View style={styles.wrapper}>
                <Txt>My game</Txt>
                <Field>
                    <Cell count={2}/>
                    <Cell count={2}/>
                    <Cell count={2}/>
                    <Cell count={2}/>
                    <Cell count={2}/>
                </Field>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        alignItems: 'center'
    }
})