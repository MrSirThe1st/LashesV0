import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";
import { useRoute } from "@react-navigation/native";
import Stars from "../../componets/Stars";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import FeatherIcon from "react-native-vector-icons/Feather";
import BottomSheetReview from "../../componets/BottomSheets/BottomSheetReview";
import { MaterialIcons } from "@expo/vector-icons";
import Review from "./Review";
import StarRatingDisplay from "../../componets/StarRatingDisplay";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";

export default function AccountInfo() {
  const db = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;
  const route = useRoute();
  const { seller } = route.params;
  const profileImageUrl = seller?.profile?.[0] || "";
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const { thumbnails } = route.params;
  const [selectedImages, setSelectedImages] = useState([]);
  const [input, setInput] = useState(seller?.username || "");
  const [reviews, setReviews] = useState([]);
  const navigation = useNavigation();
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const isDeliveryAvailable = seller?.delivery ?? false;
  const isPickupAvailable = seller?.pickup ?? false;
  const isWebsiteAvailable = seller?.website ?? false;
  const isWhatsappAvailable = seller?.whatsapp ?? false;

  const openImageFullscreen = (index) => {
    setSelectedImageIndex(index);
    setImageModalVisible(true);
  };

  const closeImageFullscreen = () => {
    setImageModalVisible(false);
  };

  const openWhatsAppChat = async () => {
    const sellerPhoneNumber = seller.cellphoneNumber;

    const message = "Hello, I am interested in your product.";

    const deepLink = `https://wa.me/${sellerPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    try {
      await Linking.openURL(deepLink);
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    if (seller) {
    }
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(FIRESTORE_DB, "reviews");
        const querySnapshot = await getDocs(reviewsCollection);

        const reviewsData = [];
        let totalRating = 0;

        querySnapshot.forEach((doc) => {
          const review = {
            id: doc.id,
            ...doc.data(),
          };

          if (review.sellerId === seller.uid) {
            reviewsData.push(review);
            totalRating += review.rating;
          }
        });

        setReviews(reviewsData);
        setReviewsCount(reviewsData.length);

        const averageRating =
          reviewsData.length > 0 ? totalRating / reviewsData.length : 0;
        setAverageRating(averageRating.toFixed(1)); // Set the average rating state
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, [seller.uid]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.photos}>
          <Swiper
            renderPagination={(index, total) => (
              <View style={styles.photosPagination}>
                <Text style={styles.photosPaginationText}>
                  {index + 1} / {total}
                </Text>
              </View>
            )}
          >
            {thumbnails.map((thumbnail, index) => (
              <Pressable
                key={index}
                onPress={() => openImageFullscreen(index)}
                style={styles.imageContainer}
              >
                <Image
                  alt=""
                  source={{ uri: thumbnail }}
                  style={styles.photosImg}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </Swiper>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.stats}>
            {[
              {
                label: (
                  <MaterialIcons
                    name="location-city"
                    size={20}
                    color="#48496c"
                  />
                ),
                value: seller.city,
              },
              {
                label: <Stars />,
                value: averageRating > 0 ? <Text>{averageRating}</Text> : null,
              },
              {
                label: (
                  <FeatherIcon
                    name="map-pin"
                    size={15}
                    color="#48496c" // Adjust the color as needed
                  />
                ),
                value: seller.country,
              },
            ].map(({ label, value }, index) => (
              <View
                key={index}
                style={[
                  styles.statsItem,
                  index === 0 && { borderLeftWidth: 0 },
                ]}
              >
                <Text style={styles.statsItemText}>{label}</Text>

                <Text style={styles.statsItemValue}>{value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              {profileImageUrl ? (
                <Image
                  alt=""
                  source={{ uri: profileImageUrl }}
                  style={styles.avatarImg}
                />
              ) : (
                <Image style={styles.avatarImgEmpty} />
              )}
            </View>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle}>{seller.username}</Text>
              <Text style={styles.profileSubtitle}>
                {seller.category.label}
              </Text>
              <Text style={{ color: "#48496c" }}>{seller.address}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.profileDescription}>{seller.brief}</Text>
            <View style={styles.about}>
              <Text style={styles.aboutDescription}>{seller.overview}</Text>
            </View>
          </View>

          {/* delivery */}
          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            {isDeliveryAvailable && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Feather name="truck" size={18} color="#1e90ff" />
                  <Text
                    style={{
                      paddingLeft: 4,
                      color: "#48496c",
                      fontWeight: "bold",
                    }}
                  >
                    Delivery available
                  </Text>
                </View>
              </View>
            )}
            {isPickupAvailable && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="home" size={24} color="#1e90ff" />
                  <Text
                    style={{
                      paddingLeft: 4,
                      color: "#48496c",
                      fontWeight: "bold",
                    }}
                  >
                    Pickup available
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* delivery */}

          {/* chat */}

          <View style={styles.ChatContainer}>
            {isWebsiteAvailable && (
              <View style={styles.Websitebtn}>
                <FontAwesome name="globe" size={18} color="#1e90ff" />
                <Text>{seller.website}</Text>
              </View>
            )}
            {isWhatsappAvailable && (
              <Pressable style={styles.Chat} onPress={openWhatsAppChat}>
                <View style={styles.Chatbtn}>
                  <Text style={styles.ChatbtnText}>Chat</Text>
                  <FontAwesome name="whatsapp" size={16} color="#25D366" />
                </View>
              </Pressable>
            )}
          </View>
          {/* chat */}
        </View>
        <View style={styles.SeeAll}>
          {reviewsCount > 0 && (
            <View>
              <Text style={styles.arrowTextR}>{reviewsCount} Reviews</Text>
            </View>
          )}
          {reviewsCount > 0 && (
            <Pressable
              onPress={() => {
                navigation.navigate("Review", { reviews });
              }}
            >
              <Text style={styles.arrowText}>See All</Text>
            </Pressable>
          )}
        </View>

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={reviews.slice(0, 5)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <View style={styles.profileContainerR}>
                  <View style={styles.profileTop}>
                    <View style={styles.profileBody}>
                      <Text style={styles.profileTitle}>{item.username}</Text>
                      <StarRatingDisplay rating={item.rating} starSize={20} />
                      <Text style={{ color: "#48496c" }}>
                        {item.timestamp.toDate().toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <View style={styles.about}>
                      <Text
                        style={styles.aboutDescription}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                      >
                        {item.reviewText}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <Modal
        visible={isImageModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeImageFullscreen}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          {/* Display the selected image in full screen */}
          <Image
            source={{ uri: thumbnails[selectedImageIndex] }}
            style={{ flex: 1, resizeMode: "contain" }}
          />
          <TouchableOpacity
            style={{ position: "absolute", top: 20, left: 20 }}
            onPress={closeImageFullscreen}
          >
            <AntDesign name="close" size={30} color="#1e90ff" />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => setShowBottomSheet(!showBottomSheet)}>
          <View style={styles.btnR}>
            <Text style={styles.btnTextR}>write a Review</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Catalogue", { seller });
            }}
            style={{ marginRight: 4 }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Products</Text>
              <FeatherIcon color="white" name="shopping-bag" size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Catalogue1", { seller });
            }}
            style={{ marginLeft: 4 }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Services</Text>
              <FeatherIcon color="white" name="shopping-bag" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheetReview
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
        seller={seller}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#1e90ff",
  },
  btnR: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#1e90ff",
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#fff",
    flex: 1,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  profileContainer: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  profileContainerR: {
    marginHorizontal: 15,
    marginBottom: 80,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
    width: 300,
    height: 200,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#121a26",
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#778599",
  },
  profileDescription: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 18,
    paddingVertical: 5,
  },

  stats: {
    backgroundColor: "#fff",
    flexDirection: "row",
    backgroundColor: "white",
    elevation: 1,
    borderRadius: 12,
    margin: 10,
    padding: 3,
  },
  statsItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: "#1e90ff",
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#778599",
  },

  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#fff",
    marginRight: 4,
    fontSize: 13,
  },
  btnTextR: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#1e90ff",
    marginRight: 4,
    fontSize: 13,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#1e90ff",
    borderColor: "#1e90ff",
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#fff",
  },

  avatar: {
    position: "relative",
    marginRight: 8,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  avatarImgR: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
  avatarImgEmpty: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    backgroundColor: "#fafdff",
  },
  avatarNotification: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: "#22C55E",
  },
  photos: {
    position: "relative",
    height: 300,
    overflow: "hidden",
  },
  photosPagination: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1e90ff",
    borderRadius: 12,
  },
  photosPaginationText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#fbfbfb",
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: "100%",
    height: "250",
  },

  aboutDescription: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 20,
    color: "#7b7c7e",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  Chatbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#25D366",
    marginVertical: 4,
  },
  Websitebtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#1e90ff",
    marginRight: 5,
  },
  ChatbtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    marginRight: 4,
    fontSize: 13,
    color: "#25D366",
  },
  ChatContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  SeeAll: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  arrowText: {
    fontWeight: "bold",
    color: "#1e90ff",
    fontSize: 15,
  },
  arrowTextR: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
