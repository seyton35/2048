import { TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

import Txt from "../custom/Txt"

interface Props {
    style: {},
    title: string,
    route: string
}

export default function NavButton({ title, route, style }: Props) {
    const { navigate } = useNavigation()
    return (
        <TouchableOpacity style={[styles.btn, style]} onPress={() => navigate(route)}>
            <Txt style={styles.btnTxt}>{title}</Txt>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#f5835f',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '65%',
        alignSelf: 'center'
    },
    btnTxt: {
        fontSize: 20,
        color: '#fff'
    }
})