import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface Props {
    name: string,
    onPress: () => void
}

export default function IconButton({ name,onPress }: Props) {
    return (
        <TouchableOpacity style={styles.iconBox} onPress={onPress}>
            <MaterialIcons name={name} style={styles.icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconBox: {
        backgroundColor: '#b9aea2',
        padding: 10,
        borderRadius: 10
    },
    icon: {
        color: "#fff",
        fontSize: 20
    }
})