import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Stars = () => {
  return (
    <View style={styles.headerRow}>
        <View style={styles.headerStars}>
            <FontAwesome color="#1e90ff" name="star" solid={true} size={14} />

            <FontAwesome color="#1e90ff" name="star" solid={true} size={14} />

            <FontAwesome color="#1e90ff" name="star" solid={true} size={14} />

            <FontAwesome color="#1e90ff" name="star" solid={true} size={14} />

            <FontAwesome color="#1e90ff" name="star" size={14} />

            
        </View>
    </View>
  )
}

export default Stars
const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
      },
      headerStars: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerStarsText: {
        marginLeft: 8,
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 20,
        color: '#7b7c7e',
      },
})