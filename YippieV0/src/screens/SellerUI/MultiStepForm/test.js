// import React from 'react';
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   StatusBar,
//   SafeAreaView,
//   TouchableOpacity,
//   Text,
//   Image,
// } from 'react-native';
// import Swiper from 'react-native-swiper';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const IMAGES = [
//   'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
//   'https://images.unsplash.com/photo-1639358336404-b847ac2a3272?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
//   'https://images.unsplash.com/photo-1652509525608-6b44097ea5a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlc2xhJTIwbW9kZWwlMjBzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
// ];

// export default function Example() {
//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#eaf5ff' }}>
//         <View style={styles.container}>
//           <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>


//             <View style={styles.photos}>
//               <Swiper
//                 renderPagination={(index, total) => (
//                   <View style={styles.photosPagination}>
//                     <Text style={styles.photosPaginationText}>
//                       {index + 1} of {total}
//                     </Text>
//                   </View>
//                 )}>
//                 {IMAGES.map((src, index) => (
//                   <Image
//                     alt=""
//                     key={index}
//                     source={{ uri: src }}
//                     style={styles.photosImg}
//                   />
//                 ))}
//               </Swiper>
//             </View>
//             <View style={styles.addProduct}>
//               <Text style={styles.addText}>Add a cover image</Text>
//               <FeatherIcon color="#fff" name="plus" size={16} />
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 // handle onPress
//               }}
//               style={styles.picker}>
//               <View style={styles.pickerDates}>
//                 <Text style={[styles.pickerDatesText, { marginBottom: 2 }]}>
//                   {information.UserName}
//                 </Text>
//                 <Text style={styles.pickerDatesText}>
//                   {information.city}
//                 </Text>
//                 <Text style={styles.pickerDatesText}>
//                   {information.country}
//                 </Text>
//                 <Text style={styles.pickerDatesText}>
//                   {information.state}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <View style={styles.info}>
//               <Text style={styles.infoTitle}>Tesla Model S 2022</Text>

//               <View style={styles.infoRating}>
//                 <Text style={styles.infoRatingLabel}>5.0</Text>

//                 <FeatherIcon color="#4c6cfd" name="star" size={15} />

//                 <Text style={styles.infoRatingText}>(7 ratings)</Text>
//               </View>

//               <Text style={styles.infoDescription}>
//               {information.overview}
//               </Text>
//             </View>
//             <View style={styles.stats}>
//               {[
//                 [
//                   { label: 'label', value: information.email },
//                   { label: 'label', value: information.cellphoneNumber },
//                 ],
//                 [
//                   { label: 'label', value: information.item },
//                   { label: 'label', value: information.role },
//                 ],
//               ].map((row, rowIndex) => (
//                 <View
//                   key={rowIndex}
//                   style={[
//                     styles.statsRow,
//                     rowIndex === 0 && { borderTopWidth: 0 },
//                   ]}>
//                   {row.map(({ label, value }, index) => (
//                     <View
//                       key={index}
//                       style={[
//                         styles.statsItem,
//                         index === 0 && { borderLeftWidth: 0 },
//                       ]}>
//                       <Text style={styles.statsItemText}>{label}</Text>

//                       <Text style={styles.statsItemValue}>{value}</Text>
//                     </View>
//                   ))}
//                 </View>
//               ))}
//             </View>

            

//           </ScrollView>
//         </View>
//       </SafeAreaView>

//       <View style={styles.overlay}>
//         <View style={styles.overlayContent}>
//           <View style={styles.overlayContentTop}>
//             <Text style={styles.overlayContentPrice}>$56/day</Text>
//           </View>
//         </View>
//         <TouchableOpacity
//           onPress={signup}
//           mode="outlined"
//           >
//           <View style={styles.btn}>
//             <Text style={styles.btnText}>Submit Profile</Text>

//             <MaterialCommunityIcons
//               color="#fff"
//               name="arrow-right-circle"
//               size={18}
//               style={{ marginLeft: 12 }}
//             />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 0,
//     paddingHorizontal: 16,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingTop: 12,
//     paddingHorizontal: 16,
//     paddingBottom: 48,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
//     elevation: 3,
//   },
//   photos: {
//     marginTop: 12,
//     position: 'relative',
//     height: 240,
//     overflow: 'hidden',
//     borderRadius: 12,
//   },


//   photosPagination: {
//     position: 'absolute',
//     bottom: 12,
//     right: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     backgroundColor: '#000',
//     borderRadius: 12,
//   },
//   photosPaginationText: {
//     fontWeight: '600',
//     fontSize: 14,
//     color: '#fbfbfb',
//   },
//   photosImg: {
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//     width: '100%',
//     height: 240,
//   },
//   picker: {
//     marginTop: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#f5f5f5',
//   },
//   pickerDates: {
//     marginLeft: 12,
//   },
//   pickerDatesText: {
//     fontSize: 13,
//     fontWeight: '500',
//   },
//   info: {
//     marginTop: 12,
//     backgroundColor: '#fff',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   infoTitle: {
//     fontSize: 20,
//     lineHeight: 25,
//     fontWeight: '600',
//     letterSpacing: 0.38,
//     color: '#000000',
//     marginBottom: 6,
//   },
//   infoRating: {
//     marginBottom: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   infoRatingLabel: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     color: '#000',
//     marginRight: 2,
//   },
//   infoRatingText: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#8e8e93',
//     marginLeft: 2,
//   },
//   infoDescription: {
//     fontWeight: '400',
//     fontSize: 13,
//     lineHeight: 18,
//     letterSpacing: -0.078,
//     color: '#8e8e93',
//   },
//   stats: {
//     marginTop: 12,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   statsRow: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderColor: '#fff',
//   },
//   statsItem: {
//     flexGrow: 2,
//     flexShrink: 1,
//     flexBasis: 0,
//     paddingVertical: 12,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderLeftWidth: 1,
//     borderColor: '#fff',
//   },
//   statsItemText: {
//     fontSize: 13,
//     fontWeight: '400',
//     lineHeight: 18,
//     color: '#8e8e93',
//     marginBottom: 4,
//   },
//   statsItemValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     lineHeight: 20,
//     color: '#000',
//   },
//   overlayContent: {
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//   },
//   overlayContentTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginBottom: 2,
//   },
//   overlayContentPrice: {
//     fontSize: 21,
//     lineHeight: 26,
//     fontWeight: '700',
//     color: '#000',
//   },
//   btn: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     backgroundColor: '#007aff',
//     borderColor: '#007aff',
//   },
//   btnText: {
//     fontSize: 18,
//     lineHeight: 26,
//     fontWeight: '600',
//     color: '#fff',
//   },
// });