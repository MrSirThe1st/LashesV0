import React from "react";
import Animated, { useSharedValue,
useAnimatedScrollHandler,
useAnimatedRef,
useAnimatedStyle,
interpolate,
Extrapolate } from "react-native-reanimated";

import {StyleSheet,
     Text, 
     View, 
     SafeAreaView, 
     FlatList, 
     useWindowDimensions,
     Image
    } from 'react-native';
import {data} from "../../props/data/data"
import Pagination from "../../componets/Pagination";
import CustomButton from "../../componets/CustomButton";



const Onboarding = () => {
    //constants
    const {width: SCREEN_WIDTH} = useWindowDimensions();
    const flatListRef = useAnimatedRef(null);
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);

    const onViewableItemsChanged = ({viewableItems}) => {
        flatListIndex.value = viewableItems[0].index;
    };

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });
    const RenderItem = ({item,index}) => {
            const imageAnimationStyle = useAnimatedStyle(() => {
            const opacitynaimation = interpolate(
                x.value,
                [
                    (index -1) *SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH,
                ],
                [0, 1, 0],
                Extrapolate.CLAMP,
            );
            const translateYAnimation = interpolate(
                x.value,
                [
                    (index -1) *SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH,
                ],
                [100, 0, 100],
                Extrapolate.CLAMP,
            )
            return{
                opacity: opacitynaimation,
                width: SCREEN_WIDTH * 0.8, 
                height: SCREEN_WIDTH * 0.8,
                transform: [{translateY: translateYAnimation}]
            };
        });
        const textAnimationStyle = useAnimatedStyle(() => {
            const opacitynaimation = interpolate(
                x.value,
                [
                    (index -1) *SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH,
                ],
                [0, 1, 0],
                Extrapolate.CLAMP,
            );
            const translateYAnimation = interpolate(
                x.value,
                [
                    (index -1) *SCREEN_WIDTH,
                    index * SCREEN_WIDTH,
                    (index + 1) * SCREEN_WIDTH,
                ],
                [100, 0, 100],
                Extrapolate.CLAMP,
            )
            return{
                opacity: opacitynaimation, 
                transform: [{translateY: translateYAnimation}],
            };
        });
        return(
            <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
                <Animated.Image 
                    source={item.image} 
                    style={imageAnimationStyle}
                />
                <Animated.View style = {textAnimationStyle}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemText}>{item.text}</Text>
                </Animated.View>               
            </View>
        )
    }
    //code
    return(
        <SafeAreaView style={styles.container}>
            <Animated.FlatList 
                ref = {flatListRef}
                onScroll={onScroll}
                data={data} 
                renderItem={({item, index}) => {
                 return <RenderItem item={item} index={index}/>;
                 }}
                 keyExtractor={item => item.id}
                 scrollEventThrottle={16}
                 horizontal={true}
                 bounces={false}
                 pagingEnabled={true}
                 showsHorizontalScrollIndicator={false}
                 onViewableItemsChanged={onViewableItemsChanged}
            />
            <View style = {styles.bottomContainer}>
                 <Pagination data = {data} x = {x} screenWidth={SCREEN_WIDTH}/>
                 <CustomButton 
                 flatListRef = {flatListRef} 
                 flatListIndex = {flatListIndex} 
                 dataLength = {data.length}  
                 />
            </View>
        </SafeAreaView>
    )
}

export default Onboarding;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#b5c69c'
    },
    itemContainer:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#b5c69c'
    },
    itemTitle: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    itemText: {
        color: 'black',
        textAlign: 'center',
        lineHeight:20,
        marginHorizontal: 35
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 20,
    }
    
})