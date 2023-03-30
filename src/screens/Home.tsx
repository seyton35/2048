import {useEffect} from 'react'
import { StyleSheet, View, } from "react-native";
import { useDispatch } from "react-redux";
import { initialization } from "../store/slices/stateReducer";

import Container from "../components/reusable/Container";
import NavButton from "../components/reusable/NavButton";

export default function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
    //   dispatch(initialization()) TODO: add RootState midleware
    }, [])
    

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