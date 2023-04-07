import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'
import Txt from './Txt'

interface Props {
    style: {},
    data:
    {
        string: string,
        value: number,
        src: string
    }[]
    ,
    start: number
    current: (index: number) => void
    src: (src: string) => void
}

export default function Slider({ data, start, current, src, style }: Props) {
    const [el, setEl] = useState(start)
    function nextEl() {
        let index = el + 1
        const length = data.length
        if (length <= index) {
            setEl(index - length)
            current(data[index - length].value)
            src(data[index - length].src)
        } else {
            setEl(index)
            current(data[index].value)
            src(data[index].src)
        }
    }
    function prevEl() {
        const length = data.length
        if (el == 0) {
            setEl(length - 1)
            current(data[length - 1].value)
            src(data[length - 1].src)
        } else {
            setEl(el - 1)
            current(data[el - 1].value)
            src(data[el - 1].src)
        }
    }

    return (
        <View style={[styles.slider, style]}>
            <TouchableOpacity style={styles.arrowIconBtn}
                onPress={prevEl}
            >
                <MaterialIcon style={styles.arrowIcon} name='keyboard-arrow-left' />
            </TouchableOpacity>
            <Txt style={styles.text}>{data[el].string}</Txt>
            <TouchableOpacity style={styles.arrowIconBtn}
                onPress={nextEl}
            >
                <MaterialIcon style={styles.arrowIcon} name='keyboard-arrow-right' />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    slider: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%'
    },
    arrowIconBtn: {
    },
    arrowIcon: {
        fontSize: 40,
        color: '#000',
    },
    text: {
        fontSize: 23
    }
})