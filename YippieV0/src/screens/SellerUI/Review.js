import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../config/firebase";
import StarRatingDisplay from "../../componets/StarRatingDisplay";
import { useRoute } from "@react-navigation/native";

const Review = () => {
  const route = useRoute();
  const { reviews } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={styles.profileContainer}>
              <View style={styles.profileTop}>
                <View style={styles.profileBody}>
                  <Text style={styles.profileTitle}>{item.username}</Text>
                  <StarRatingDisplay rating={item.rating} starSize={20} />
                  <Text style={{ color: "#48496c" }}>
                    {" "}
                    {item.timestamp.toDate().toLocaleString()}
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.about}>
                  <Text style={styles.aboutDescription}>
                    <Text style={styles.aboutDescription}>
                      {item.reviewText}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "white",
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
    fontSize: 20,
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
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    backgroundColor: "gray",
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
    height: 250,
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
    height: 250,
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    shadowColor: "#000",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  Chatbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    elevation: 1,
    backgroundColor: "#b3d9ff",
  },
  ChatbtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    marginRight: 4,
    fontSize: 13,
    color: "white",
  },
  ChatContainer: {
    alignSelf: "flex-end",
    marginVertical: 15,
  },
});
