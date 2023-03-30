import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Txt from '../custom/Txt';

interface Props {
    swipe: (move:string) => void,
    style: object
}

export default function ButtonJoystick({ style, swipe }: Props) {
    return (
        <View style={[styles.joystick, style]}>

            <TouchableOpacity style={[styles.btn, styles.btnUp]}
                onPress={()=>swipe('up')}>
                <Icon style={[styles.btnIcon, styles.btnIconUp]} name="arrowleft" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnRight]}
                onPress={()=>swipe('right')}>
                <Icon style={[styles.btnIcon, styles.btnIconRight]} name="arrowleft" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnDown]}
                onPress={()=>swipe('down')}>
                <Icon style={[styles.btnIcon, styles.btnIconDown]} name="arrowleft" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.btnLeft]}
                onPress={()=>swipe('left')}>
                <Icon style={[styles.btnIcon, styles.btnIconLeft]} name="arrowleft" />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    joystick: {
        width: 160,
        height: 160,
        borderRadius: 40,
        transform: [{ rotate: '45deg' }],
        backgroundColor: '#666',
    },
    btn: {
        width: 80,
        height: 80,
        position: 'absolute'
    },
    btnUp: {
    },
    btnRight: {
        left: 80,
    },
    btnDown: {
        left: 80,
        top: 80
    },
    btnLeft: {
        top: 80
    },

    btnIcon: {
        color: '#fff',
        fontSize: 45,
        position: 'relative',
        width: 45,
        height: 45
    },
    btnIconUp: {
        transform: [
            { rotate: '45deg' },
            { translateX: 20 },
        ],

    },
    btnIconRight: {
        transform: [
            { rotate: '135deg' },
            { translateY: -20 },
        ]
    },
    btnIconDown: {
        transform: [
            { rotate: '225deg' },
            { translateX: -20 },
        ]
    },
    btnIconLeft: {
        transform: [
            { rotate: '315deg' },
            { translateY: 20 }
        ]
    },

})