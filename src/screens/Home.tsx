import { StyleSheet, View, } from "react-native";
import { useNavigation, } from "@react-navigation/native";

import Container from "../components/reusable/Container";
import Txt from "../components/custom/Txt";
import NavButton from "../components/reusable/NavButton";

export default function Home() {
    const navigation = useNavigation()

    return (
        <Container>
            <View style={styles.wrapper}>

                <NavButton title="Game" route="game" />
            </View>
        </Container >

    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        flex:1,
        top:40,
        
    }
})