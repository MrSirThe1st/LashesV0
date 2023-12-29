// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { StyleSheet, Text, View, Pressable } from "react-native";
// import { MyButton } from "./MyButton";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import FeatherIcon from "react-native-vector-icons/Feather";

// export function BottomSheetEdit({
//   showBottomSheet,
//   setShowBottomSheet,
//   navigation,
//   img,
//   label,
//   price,
//   services,
//   service
// }) {
//   const bottomSheetRef = useRef(null);
//   const snapPoints = ["30%", "30%"];
//   const [currentIndex, setCurrentIndex] = useState(-1);

//   const handleSheetChanges = useCallback((index) => {
//     setShowBottomSheet(index > -1);
//     setCurrentIndex(index);
//   }, []);

//   useEffect(() => {
//     if (showBottomSheet) {
//       bottomSheetRef.current?.snapToIndex(0);
//     } else {
//       bottomSheetRef.current?.close();
//     }
//   }, [showBottomSheet]);

//   return (
//     <BottomSheet
//       index={-1}
//       enablePanDownToClose={true}
//       style={showBottomSheet ? styles.shadow : null}
//       ref={bottomSheetRef}
//       snapPoints={snapPoints}
//       onChange={handleSheetChanges}
//     >
//       <View style={styles.contentContainer}>
//         <Pressable
//           onPress={() =>
//             navigation.navigate("EditService", {
//               img: services[currentIndex].img,
//               label: services[currentIndex].label,
//               ordered: services[currentIndex].ordered,
//               likes: services[currentIndex].likes,
//               price: services[currentIndex].price,
//             })
//           }
//           style={styles.row}
//         >
//           <Text style={styles.rowLabel}>Edit</Text>
//           <View style={[styles.rowIcon]}>
//             <FeatherIcon color="white" name="edit-3" size={22} />
//           </View>
//         </Pressable>
//         <Pressable style={styles.row}>
//           <Text style={styles.rowLabel}>Delete</Text>
//           <View style={[styles.rowIcon]}>
//             <MaterialCommunityIcons
//               name="delete-forever"
//               size={22}
//               color="white"
//             />
//           </View>
//         </Pressable>
//       </View>
//     </BottomSheet>
//   );
// }

// const styles = StyleSheet.create({
//   btnWrap: {
//     padding: 12,
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   shadow: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.78,
//     shadowRadius: 12,
//     elevation: 24,
//   },
//   popupText: {
//     fontSize: 32,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 40,
//     backgroundColor: "#1e90ff",
//     borderRadius: 8,
//     marginBottom: 12,
//     paddingLeft: 12,
//     paddingRight: 12,
//     elevation: 1,
//     width: "80%",
//   },
//   rowIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 9999,
//     marginRight: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   rowLabel: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#fff",
//   },
// });

// export default BottomSheetEdit;
