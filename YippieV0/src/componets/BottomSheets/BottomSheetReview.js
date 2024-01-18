import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MyButton } from "./MyButton";
import BottomSheet from "@gorhom/bottom-sheet";
import { StarRating } from "../StarRating";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../config/firebase";


export function BottomSheetReview({ showBottomSheet, setShowBottomSheet, seller }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["45%"];
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");
  // const [profileImage, setProfileImage] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const handleReviewTextChange = (text) => {
    setReviewText(text);
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewSubmission = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      const userId = user.uid;

      const profileCollection = collection(FIRESTORE_DB, "users");
      const q = query(profileCollection, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);

      let currentUserProfile = {};
      querySnapshot.forEach((doc) => {
        currentUserProfile = doc.data();
      });

      await addDoc(collection(FIRESTORE_DB, "reviews"), {
        userId,
        sellerId: seller.uid, 
        rating,
        reviewText,
        timestamp: serverTimestamp(),
        username: currentUserProfile.username,
        // userProfileImage: currentUserProfile.profile[0],
      });

      // Close the bottom sheet after submission
      setShowBottomSheet(false);
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid;

        const profileCollection = collection(FIRESTORE_DB, "users");
        const q = query(profileCollection, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        const profileData = [];
        querySnapshot.forEach((doc) => {
          console.log("Fetched Document Data: ", doc.data());
          const userData = doc.data();
          setUsername(userData.username);
          // setProfileImage(userData.profile[0]);
        });
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    setShowBottomSheet(index > -1);
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (showBottomSheet) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showBottomSheet]);

  return (
    <BottomSheet
      index={-1}
      enablePanDownToClose={true}
      style={showBottomSheet ? styles.shadow : null}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        <StarRating starRating={rating} onChange={handleRatingChange} />
        <View style={styles.inputOverview}>
          <TextInput
            autoCorrect={false}
            onChangeText={handleReviewTextChange}
            placeholder="Write a Review"
            placeholderTextColor="#6b7280"
            style={styles.inputControlOverview}
            autoCapitalize="none"
            editable
            multiline
            numberOfLines={5}
            maxLength={180}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleReviewSubmission}>
          <Text style={styles.btnText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  btnWrap: {
    padding: 12,
  },
  contentContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.78,
    shadowRadius: 12,
    elevation: 24,
  },
  popupText: {
    fontSize: 44,
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#fff",
    marginRight: 4,
    fontSize: 13,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#1e90ff",
  },
  inputOverview: {
    borderRadius: 12,
    width: "90%",
  },
  inputControlOverview: {
  
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    backgroundColor: "#eaf5ff",
  },
});

export default BottomSheetReview;
