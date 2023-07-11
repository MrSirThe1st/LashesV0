import React from "react";
import {StyleSheet, Text, View, TouchableWithoutFeedback, Image} from 'react-native';
import Animated,{
    useAnimatedStyle,
    withSpring,
    withTiming,
}
from "react-native-reanimated";

const CustomButton = ({flatListRef, flatListIndex, dataLength}) => {
    const buttonAnimationStyle = useAnimatedStyle(() => {
        return{
            width: flatListIndex.value === dataLength -1 ? withSpring(140) : withSpring(60),
            height: 60, 
        };
    });

    const arrowAnimationStyle = useAnimatedStyle (()=> {
        return{
            width: 30,
            height: 30,
            opacity: flatListIndex.value === dataLength -1 ? withTiming(0) : withTiming(1),
            transform: [{translateX: flatListIndex.value === dataLength -1 ? withTiming(100): withTiming(0)}]
        }
    })

    const textAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
            transform: [{translateX: flatListIndex.value === dataLength -1 ? withTiming(0): withTiming(-100)}]
        }
    })
    return (
        <TouchableWithoutFeedback
        onPress={() => {
            if(flatListIndex.value < dataLength -1){
                flatListRef.current.scrollToIndex({index: flatListIndex.value +1})
            }else {
                console.log("navigate to the next screen")
            }
        }}
        >
            <Animated.View style= {[styles.container, buttonAnimationStyle]}>
                <Animated.Text style = {[styles.textButton, textAnimationStyle]}>Get started</Animated.Text>
                <Animated.Image source = {require('../assets/icons/ArrowIcon.png')} style={[styles.arrow, arrowAnimationStyle]}/>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    arrow: {
        position: 'absolute'
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        position: 'absolute'
    }

});

export default CustomButton