import { View, StyleSheet } from 'react-native'
import Txt from '../custom/Txt';

type Props = {
    children: number,
    title: string,
    style?: {},
}

export default function Score({ style, title, children }: Props) {
    return (
        <View style={[styles.scoreBox, style]}>
            <Txt style={styles.scoreTxt}>{title}</Txt>
            <Txt style={styles.scoreCountTxt}>{children}</Txt>
        </View>
    )
}

const styles = StyleSheet.create({
    scoreBox: {
        padding: 10,
        backgroundColor: '#999',
        borderRadius: 5,
        alignItems:'center'
    },
    scoreTxt: {
        fontSize: 12,
        color: '#fff'
    },
    scoreCountTxt: {
        fontSize: 17,
        color: '#fff'
    },
})