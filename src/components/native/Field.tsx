import { View, StyleSheet, Animated } from 'react-native'

interface Props {
    children: React.ReactNode,
    size: number,
    style: {}
}

export default function Field({ children, size, style }: Props) {

    function getSize() {
        return {
            width: size,
            height: size
        }
    }

    return (
        <View style={[styles.field, getSize(), style]}>
            <Animated.View style={styles.joystick}>
                {children}
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        backgroundColor: '#ddd',
    },
    joystick: {
        position: 'absolute',
        zIndex: 100,

        flex: 1,
        backgroundColor: '#fff',
    }
})