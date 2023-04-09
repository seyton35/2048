import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"

import { initialization } from "./store/slices/stateReducer"
import store from "./store"
import Home from "./screens/Home"
import Game from "./screens/Game"

export default function Main() {
    const Stack = createNativeStackNavigator()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialization())
    }, [])


    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Group
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="home" component={Home} />
                    <Stack.Screen name="game" component={Game} />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    )
}