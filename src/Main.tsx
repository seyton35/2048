import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "./screens/Home"
import Game from "./screens/Game"
import { Provider } from "react-redux"
import store from "./store"

export default function Main() {
    const Stack = createNativeStackNavigator()

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>

                    <Stack.Screen name="home" component={Home} />
                    <Stack.Screen name="game" component={Game} />

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}