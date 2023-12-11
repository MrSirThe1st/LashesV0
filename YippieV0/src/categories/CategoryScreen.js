import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CategoryScreen = ({route}) => {
    const { service } = route.params;
  return (
    <View>
      <Text>{service.name}</Text>
      {/* Render additional details based on the 'service' object */}
    </View>
  );
}

export default CategoryScreen

const styles = StyleSheet.create({})