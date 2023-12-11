import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { ref } from "firebase/storage";
import { Skeleton } from "@rneui/themed";
import Stars from "./Stars";
import FeatherIcon from "react-native-vector-icons/Feather";

const CardItem = ({ seller, navigation }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      console.log("Fetching image for:", seller.thumbnails[0]);
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
  }, [seller.thumbnails]);

  const renderCardItem = () => {
    return (
      <TouchableOpacity
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
              height={154}
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
              <View style={styles.catalogueS}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Catalogue",{seller});
                  }}
                >
                  <View style={styles.catalogue}>
                    <Text style={styles.catalogueText}>Catalog</Text>
                    <FeatherIcon color="white" name="shopping-bag" size={16} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Catalogue", { seller });
                  }}
                >
                  <View style={styles.catalogue1}>
                    <FeatherIcon color="white" name="shopping-bag" size={16} />
                    <Text style={styles.catalogueText1}>Services</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.cardRowItemTextName}>
                  {seller.username},{" "}
                </Text>
                <Text style={styles.cardTitle}>{seller.city} </Text>
              </View>
            </View>

            <View style={styles.cardRow}>
              <View style={styles.cardRowItem}>
                <Text style={styles.cardAirport}>{seller.brief}</Text>
              </View>
              <View style={styles.cardRowItem}>
                <Text style={styles.cardRowItemText}>{seller.title}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Stars />
              <Text style={styles.cardPrice}>
                <Text>From </Text>
                <Text style={styles.cardPriceValue}>R150{seller.price}</Text>
              </Text>
            </View>
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

const CardLists = ({ sellerData, navigation }) => {
  return (
    <FlatList
      data={sellerData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <CardItem seller={item} navigation={navigation} />
      )}
      contentContainerStyle={styles.cardListContainer}
    />
  );
};

export default CardLists;

const styles = StyleSheet.create({
  cardListContainer: {
    paddingHorizontal: 16,
  },
  container: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  card: {
    flexDirection: "row-reverse",
    alignItems: "stretch",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#fafdff",
    // padding:8
  },
  cardImg: {
    width: "50%",
    height: 160,
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
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderColor: "#1e90ff",
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
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderColor: "white",
    marginRight: 1,
  },
  catalogueText: {
    marginRight: 4,
    fontSize: 13,
    fontWeight: "600",
    color: "white",
  },
  catalogue1: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderColor: "white",
    marginLeft: 1,
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
});
