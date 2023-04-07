import { useEffect, useState } from 'react'
import { StyleSheet, View, Image, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { initialization } from "../store/slices/stateReducer";

import Container from "../components/reusable/Container";
import NavButton from "../components/reusable/NavButton";
import Slider from '../components/custom/Slider';
import { setFieldGrid } from '../store/slices/stateReducer';
import { fieldIcons } from '../../assets/fieldIcons/fieldIcons';
import { adds } from '../../assets/adds/adds';

const sliderArr = [
    { string: 'маленький - 3х3', value: 3, src: '3x3' },
    { string: 'классический - 4х4', value: 4, src: '4x4' },
    { string: 'большой - 5х5', value: 5, src: '5x5' },
    { string: 'Большой - 6х6', value: 6, src: '6x6' },
    { string: 'огромныый - 8х8', value: 8, src: '8x8' },
]

export default function Home() {
    const [imageSrc, setImageSrc] = useState(sliderArr[0].src)

    const dispatch = useDispatch()
    useEffect(() => {
        //   dispatch(initialization()) TODO: add RootState midleware
    }, [])

    const { fieldGrid } = useSelector((s: any) => s.state)

    return (
        <Container>
            <View style={styles.wrapper}>
                <View>
                    <Image style={styles.fieldIcon} source={fieldIcons[imageSrc]}></Image>
                </View>

                <Slider style={styles.slider} data={sliderArr} index={fieldGrid}
                    current={(res) => dispatch(setFieldGrid(res))}
                    src={setImageSrc}
                />

                <NavButton style={styles.navBtn} title="НАЧАТЬ ИГРУ" route="game" />

            </View>
            <View style={styles.addBox}>
                <Image style={styles.addImage} source={adds.blank}></Image>
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: .85
    },
    fieldIcon: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    slider: {
        marginTop: 20
    },
    navBtn: {
        marginTop: 20
    },
    addBox: {

        position: 'absolute',
        alignSelf: 'center',
        transform: [
            { scaleX: .8, },
        ],
        bottom: 0
    },
    addImage: {}
})