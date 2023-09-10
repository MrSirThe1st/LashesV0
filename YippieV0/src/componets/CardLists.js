import { StyleSheet, 
    Text, 
    TouchableOpacity,
    View,
    Image,
    FlatList
 } from 'react-native'
import React from 'react'


const CardItem = ({ seller }) => {

  const renderCardItem = () => {
    return (
      <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
    >
      <View style={styles.card}>
        <Image
          alt=""
          resizeMode="cover"
          source={{ uri: seller.image }} 
          style={styles.cardImg}
        />
  
        <View style={styles.cardBody}>
          <Text>
            <Text style={styles.cardTitle}>{seller.city}</Text>
            <Text style={styles.cardAirport}>{seller.country}</Text>
            <Text style={styles.cardAirport}>{seller.state}</Text> 
          </Text>
  
          <View style={styles.cardRow}>
            <View style={styles.cardRowItem}>      
              <Text style={styles.cardRowItemTextName}>{seller.username}</Text>
            </View>
  
            <View style={styles.cardRowItem}>     
              <Text style={styles.cardRowItemText}>{seller.title}</Text>
            </View>
          </View>
  
          <Text style={styles.cardPrice}>
            <Text>from </Text>
            <Text style={styles.cardPriceValue}>R{seller.price}</Text>
          </Text>
  
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>message</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {seller ? renderCardItem() : <Text>No seller data available</Text>}
    </View>
  );
};

const CardLists = ({ sellerData }) => {
  return (
    <FlatList
      data={sellerData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <CardItem seller={item} />}
      contentContainerStyle={styles.cardListContainer}
    />
  );
};


export default CardLists

const styles = StyleSheet.create({
    cardListContainer: {
      paddingHorizontal: 16,
    },
    container: {
        paddingHorizontal: 8,
        paddingBottom:10,
        paddingTop:40
      },
      card: {
        flexDirection: 'row',
        alignItems: 'stretch',
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#fafdff',
        padding:8
      },
      cardImg: {
        width: 120,
        height: 154,
        borderRadius: 12,
      },
      cardBody: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#173153',
        marginRight: 8,
      },
      cardAirport: {
        fontSize: 13,
        fontWeight: '600',
        color: '#5f697d',
      },
      cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: -8,
        flexWrap: 'wrap',
      },
      cardRowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
      },
      cardRowItemText: {
        marginLeft: 4,
        fontSize: 12,
        color: 'black',
      },
      cardRowItemTextName: {
        marginLeft: 4,
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
      },
      cardPrice: {
        fontSize: 13,
        fontWeight: '500',
        color: '#5f697d',
      },
      cardPriceValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#173153',
      },
      cardPriceCurrency: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1e90ff',
      },
      btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#1e90ff',
        
      },
      btnText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '600',
        color: 'white',
      },
})