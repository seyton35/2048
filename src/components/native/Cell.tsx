import { View, StyleSheet, Dimensions } from 'react-native'
import Txt from '../custom/Txt'

interface Props {
    // children: React.ReactNode,
    count: number
}

export default function Cell({ count }: Props) {
    const Width = Dimensions.get('window').width;


    function getStyle() {
        const style = {
            width: (Width - 62) / 5,
            height: (Width - 62) / 5,

        }
        return style
    }

    return (
        <View style={[styles.cell, getStyle()]}>
            <Txt style={styles.cellTxt}>{count}</Txt>
        </View>
    )
}

const styles = StyleSheet.create({
    cell: {
        backgroundColor: '#80ff80',
        width:10,
        height:10,
        margin:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cellTxt: {
    }
})