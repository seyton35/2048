import { View, StyleSheet } from 'react-native'

interface Props {
    children: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Container

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 5
    }
})