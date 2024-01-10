import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CategoryScreen = ({ route }) => {
  const { service } = route.params;
  const [sellerData, setSellerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(FIRESTORE_DB, "users"),
          where("role", "==", "seller"),
          where("category.label", "==", service.name)
        );
        const querySnapshot = await getDocs(q);
        const sellers = querySnapshot.docs.map((doc) => doc.data());
        setSellerData(sellers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(
      query(
        collection(FIRESTORE_DB, "users"),
        where("role", "==", "seller"),
        where("category.label", "==", service.name)
      ),
      (snapshot) => {
        const updatedSellers = snapshot.docs.map((doc) => doc.data());
        setSellerData(updatedSellers);
      }
    );

    return () => unsubscribe();
  }, [service]);

  useEffect(() => {
    navigation.setOptions({ title: service.name });
  }, [service]);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("AccountInfo", {
          seller: item,
          thumbnails: item.thumbnails,
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Image
            alt=""
            resizeMode="cover"
            style={styles.cardImg}
            source={{
              uri:
                item.thumbnails && item.thumbnails[0] ? item.thumbnails[0] : "",
            }}
          />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.username}</Text>
          </View>

          <View style={styles.cardStats}>
            <View style={styles.cardStatsItem}>
              <MaterialIcons
                name="face-retouching-natural"
                size={20}
                color="#48496c"
              />
              <Text style={styles.cardStatsItemText}>
                {item.category.label}
              </Text>
            </View>

            <View style={styles.cardStatsItem}>
              <MaterialIcons name="location-city" size={20} color="#48496c" />
              <Text style={styles.cardStatsItemText}>{item.city}</Text>
            </View>

            <View style={styles.cardStatsItem}>
              <FontAwesome5 name="map-marker-alt" size={16} color="#48496c" />
              <Text style={styles.cardStatsItemText}>{item.country}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>{item.address}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.empty}>
      <View style={styles.fake}>
        <View style={styles.fakeCircle} />
        <View style={styles.fakeBlock}>
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
        </View>
      </View>
      <View style={[styles.fake, { opacity: 0.5 }]}>
        <View style={styles.fakeCircle} />
        <View style={styles.fakeBlock}>
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
        </View>
      </View>
      <View style={styles.fake}>
        <View style={styles.fakeCircle} />
        <View style={styles.fakeBlock}>
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
        </View>
      </View>
      <View style={styles.fake}>
        <View style={styles.fakeCircle} />
        <View style={styles.fakeBlock}>
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
        </View>
      </View>
      <View style={[styles.fake, { opacity: 0.5 }]}>
        <View style={styles.fakeCircle} />
        <View style={styles.fakeBlock}>
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
        </View>
      </View>
      <View style={styles.fake}>
        <View style={styles.fakeCircle} />
        <View style={styles.fakeBlock}>
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
          <View style={styles.fakeLine} />
        </View>
      </View>
      <Text style={styles.emptyDescription}>Nothing to show at the moment</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={sellerData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    backgroundColor: "white",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#2d2d2d",
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444",
  },
  cardStats: {
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -12,
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#48496c",
    paddingHorizontal: 5,
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#e9e9e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#909090",
  },
  fake: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  fakeCircle: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#1e90ff",
    marginRight: 16,
  },
  fakeLine: {
    width: 200,
    height: 8,
    borderRadius: 12,
    backgroundColor: "#1e90ff",
    marginBottom: 8,
  },
  fakeBlock: {
    flexDirection: "column",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyDescription: {
    fontSize: 19,
    lineHeight: 22,
    fontWeight: "500",
    color: "#8c9197",
    textAlign: "center",
  },
});
