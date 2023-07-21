import React from 'react';
import { View,Image,Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { services } from '../props/data/data2';


const Services = () => {
    return(
        <View>
            <ScrollView>
                {services.map((service) =>(
                    <Pressable key={service.id}>
                        <Image source={service.image} style = {styles.Image}/>
                        <Text>{service.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
   )
}

export default Services

const styles = StyleSheet.create({
    Image:{
        width: 70,
        height: 70
    }
})



