import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Text, View, Image } from 'react-native';

const BackButton = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.goBack()}
        >
            <View style={[styles.container]}>
                <Image
                    source={require('../assets/icons/ArrowIcon.png')}
                    style={[styles.arrow]}
                    resizeMode="contain" // Ensures the image fits within the Image component
                />
                <Text style={styles.text}>Go Back</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',
        width: 110,
        marginLeft: 5,
        marginTop: 10
    },
    arrow: {
        tintColor: '#1e90ff',
        marginRight: 5, 
        width: 20, 
        height: 20, 
        transform: [{ scaleX: -1 }],
    },
    text: {
        color: '#1e90ff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default BackButton;
