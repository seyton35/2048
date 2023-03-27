import { View, StyleSheet, Dimensions, Animated } from 'react-native'

interface Props {
    children: React.ReactNode
}

export default function Field({ children }: Props) {
    const Width = Dimensions.get('window').width;

    function getSize() {
        return {
            width: Width - 50,
            height: Width - 50
        }
    }

    return (
        <View style={[styles.field, getSize()]}>
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