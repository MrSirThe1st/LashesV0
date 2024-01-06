import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { ref } from "firebase/storage";
import { Skeleton } from "@rneui/themed";
import Stars from "./Stars";
import FeatherIcon from "react-native-vector-icons/Feather";
import Services from "./Services";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { collection } from "firebase/firestore";
import { FIRESTORE_DB, getDocs, query, where } from "../config/firebase";

const CardItem = ({ seller, navigation }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isFavourite, toggleFavourite] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchImage = async () => {

      const imageRef = ref(storage, seller.thumbnails[0]);
      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Image Load Error: ", error);
      }
    };

    if (seller.thumbnails[0]) {
      fetchImage();
    }
  }, [seller.thumbnails, seller.uid]);

  const renderCardItem = () => {
    return (
      <Pressable
        style={{ paddingHorizontal: 16 }}
        onPress={() =>
          navigation.navigate("AccountInfo", {
            seller,
            thumbnails: seller.thumbnails,
          })
        }
      >
        <View style={styles.card}>
          {imageUrl ? (
            <Image
              alt=""
              resizeMode="cover"
              source={{ uri: imageUrl }}
              style={styles.cardImg}
            />
          ) : (
            <Skeleton
              skeletonStyle={{ backgroundColor: "#eaf5ff" }}
              animation="pulse"
              width={120}
              height={134}
              isLoading={!imageUrl}
              style={styles.cardImg}
            >
              <Image alt="" resizeMode="cover" style={styles.cardImg} />
            </Skeleton>
          )}

          <View style={styles.cardBody}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.cardRowItemTextName}>
                  {seller.username},{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleFavourite(!isFavourite)}
                  style={{
                    backgroundColor: "#b3d9ff",
                    position: "absolute",
                    right: -5,
                    borderRadius: 10,
                    padding: 5,
                  }}
                >
                  <FontAwesome
                    name="heart"
                    size={24}
                    color={isFavourite ? "#FA8072" : "white"}
                  />
                </TouchableOpacity>
                <Text style={styles.cardTitle}>{seller.category.label}</Text>
              </View>
            </View>

            <View style={styles.cardRow}>
              <View style={styles.cardRowItem}>
                <Text style={styles.cardAirport}>{seller.address}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={styles.cardPrice}>
                <Text>From </Text>
                <Text
                  style={styles.cardPriceValue}
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  R{seller.price}
                </Text>
              </View>
              <Stars />
              <Text>{averageRating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {seller ? renderCardItem() : <Text>No seller data available</Text>}
    </View>
  );
};

const CardLists = ({ sellerData, navigation }) => {
  const renderHeader = () => (
    <View>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("SearchPage")}
      >
        <View style={styles.SearchContainer}>
          <Icon name="search" size={28} color="grey" style={styles.icon} />
          <Text style={styles.input}>Search for services</Text>
        </View>
      </TouchableWithoutFeedback>
      <Services navigation={navigation} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        data={sellerData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardItem seller={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.cardListContainer}
      />
    </View>
  );
};

export default CardLists;

const styles = StyleSheet.create({
  cardListContainer: {},
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "white",
    flex: 1,
  },
  card: {
    flexDirection: "row-reverse",
    alignItems: "stretch",
    borderRadius: 12,
    backgroundColor: "#fafdff",
    elevation: 1.5,
  },
  cardImg: {
    width: "50%",
    height: 150,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#173153",
    marginRight: 8,
  },
  cardAirport: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5f697d",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: -8,
    flexWrap: "wrap",
  },
  cardRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    marginLeft: 4,
    fontSize: 12,
    color: "black",
  },
  cardRowItemTextName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5f697d",
    flexDirection: "row",
    alignItems: "center",
  },
  cardPriceValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#173153",
  },
  cardPriceCurrency: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e90ff",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#1e90ff",
  },
  btnText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "white",
  },
  catalogue: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderColor: "white",
    marginRight: 1,
    left: -10,
  },
  catalogueText: {
    marginRight: 4,
    fontSize: 13,
    fontWeight: "600",
    color: "white",
  },
  catalogue1: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderColor: "white",
    marginLeft: 1,
    left: -10,
  },
  catalogueText1: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "600",
    color: "white",
  },
  catalogueS: {
    flexDirection: "row",
  },
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    margin: 12,
    justifyContent: "space-between",
    elevation: 2,
  },
  input: {
    flex: 1,
    color: "grey",
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});
