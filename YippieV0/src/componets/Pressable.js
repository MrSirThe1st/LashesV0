import React from "react";
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';

const Pressable = () => {
    return(
        <Pressable
        style={({ pressed }) => [
          styles.button,
          { borderColor: pressed ? "gray" : "black" },
        ]}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        marginVertical: 5,
        backgroundColor:'#1e90ff'
      },
      buttonText: {
        fontSize: 18,
        fontWeight:'bold',
        color:'white'
      },
})

export default Pressable