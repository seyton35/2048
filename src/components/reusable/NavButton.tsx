import { TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

import Txt from "../custom/Txt"

interface Props {
    title: string,
    route: string
}

export default function NavButton({ title, route }: Props) {
    const { navigate } = useNavigation()
    return (
        <TouchableOpacity style={styles.btn} onPress={() => navigate(route)}>
            <Txt style={styles.btnTxt}>{title}</Txt>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor:'#bae1f8',
        padding:10,
        borderRadius:5,
        alignItems:'center',
        width:'50%',
        alignSelf:'center'
    },
    btnTxt: {
        fontSize:20
    }
})