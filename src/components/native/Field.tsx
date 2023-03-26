import { View, StyleSheet, Dimensions } from 'react-native'

interface Props {
    children: React.ReactNode
}

export default function Field({ children }: Props) {
    const Width = Dimensions.get('window').width;
    return (
        <View style={[styles.field, { width: Width - 50, height: Width - 50 }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        backgroundColor: '#ddd',
        padding:1,
        display:'flex',
        flexDirection:'row'
    }
})