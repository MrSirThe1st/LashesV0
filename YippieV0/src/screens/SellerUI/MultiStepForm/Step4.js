import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity,Image, ScrollView} from "react-native";
import { WizardStore } from "../../../Store";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
  Button, 
  ProgressBar,
  Portal,
  Dialog,
} from "react-native-paper";
import { FIREBASE_AUTH } from "../../../config/firebase";
import { FIRESTORE_DB } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore"; 
import { thumbnailsRef, profileRef, storageRef} from "../../../config/firebase";
import { uploadBytes,ref } from "firebase/storage";
import { storage, } from "../../../config/firebase";
import * as ImagePicker from 'expo-image-picker';
import LottieView from "lottie-react-native";


const Step4 = ({ navigation,route }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;
  const { role } = route.params;
  const information = WizardStore.useState();

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // const clearAndReset = () => {
  //   WizardStore.replace({
  //     UserName: "",
  //     termsAccepted: "",
  //     privacyAccepted: "",
  //     email: "",
  //     cellphoneNumber: "",
  //     password: "",
  //     confirmPassword: "",
  //     overview:"",
  //     country: null,
  //     city: null,
  //     state: null,
  //     item:null,
  //     progress: 0,
  //   });
  //   setVisible(false);
  //   navigation.replace("Step1");
  // };

  const [loading, setLoading] = useState(false)
  const email = WizardStore.getRawState().email;
  const password = WizardStore.getRawState().password;
  const confirmPassword = WizardStore.getRawState().confirmPassword;
  const username = WizardStore.getRawState().UserName;
  const cellphoneNumber = WizardStore.getRawState().cellphoneNumber;
  const item = WizardStore.getRawState().item;
  const overview = WizardStore.getRawState().overview;
  const brief = WizardStore.getRawState().brief;

  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedUris = result.assets.map(asset => asset.uri);
        setSelectedImages([...selectedImages, ...selectedUris]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
 
  const uploadImagesToFirebase = async () => {
    setUploading(true);

    try {
      const uploadPromises = selectedImages.map(async (imageUri, index) => {
        const imageName = `thumbnail_${Date.now()}_${index}`;
        const storageReference = ref(storage, `thumbnails/${imageName}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageReference, blob);

        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(storageReference);
        return downloadURL;
      });

      // Wait for all uploadPromises to complete
      const imageUrls = await Promise.all(uploadPromises);

      return imageUrls;
    } catch (error) {
      console.error("Error uploading images: ", error);
      alert("Error uploading images: " + error.message);
      throw error; // Rethrow the error so the submit process can be stopped.
    } finally {
      setUploading(false);
    }
  };


  

  const signUp = async () => {
    
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        alert('Signed up successfully');
        
        const uploadedImageUrls = await uploadImagesToFirebase();

        await addDoc(collection(db, "users"), {
          username: username,
          role: role,
          email: email,
          cellphoneNumber: cellphoneNumber,
          overview :overview,
          item: item,
          brief: brief,
          thumbnails: uploadedImageUrls,
        }).then(()=>{console.log('data submitted')})
  
      } catch (error) {
        console.log(error);
        alert('Sign up failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Passwords do not match');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />
      <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.useState().progress / 100}
      color="#1e90ff" 
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.FormContainer}>
        <View>
        <View style={{alignItems:'center', justifyContent:'center', marginBottom:10,}}>
          <Text style={styles.title}>Take a last look at your <Text style={{ color: '#1e90ff' }}>Profile</Text></Text>
        </View>
          <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Looking Good</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">Ready to publish your profile</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Cancel</Button>
                  {/* <Button onPress={clearAndReset}>Yes</Button> */}
                </Dialog.Actions>
              </Dialog>
          </Portal>

          <View style={styles.summaryEntriesContainer}>
          <View style={styles.photos}>
              <Swiper
                renderPagination={(index, total) => (
                  <View style={styles.photosPagination}>
                    <Text style={styles.photosPaginationText}>
                      {index + 1} of {total}
                    </Text>
                  </View>
                )}>
                {selectedImages.map((imageUri, index) => (
                  <Image
                    alt=""
                    key={index}
                    source={{ uri: imageUri }}
                    style={styles.photosImg}
                  />
                ))}
              </Swiper>
            </View>
            <TouchableOpacity onPress={pickImage}>
            <View style={styles.addProduct}>
              <Text style={styles.addText}>Add thumbnails</Text>
              <FeatherIcon color="#fff" name="plus" size={16} />
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.picker}>
              <View style={styles.pickerDates}>
                <Text style={[styles.pickerDatesText, { marginBottom: 2 }]}>
                  {information.UserName}
                </Text>
                <Text style={styles.pickerDatesText}>
                  {information.city}
                </Text>
                <Text style={styles.pickerDatesText}>
                  {information.country}
                </Text>
                <Text style={styles.pickerDatesText}>
                  {information.state}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Tesla Model S 2022</Text>

              <View style={styles.infoRating}>
                <Text style={styles.infoRatingLabel}>5.0</Text>

                <FeatherIcon color="#4c6cfd" name="star" size={15} />

                <Text style={styles.infoRatingText}>(7 ratings)</Text>
              </View>

              <Text style={styles.infoDescription}>
              {information.overview}
              </Text>
            </View>
            <View style={styles.stats}>
              {[
                [
                  { label: 'label', value: information.email },
                  { label: 'label', value: information.cellphoneNumber },
                ],
                [
                  { label: 'label', value: information.item },
                  { label: 'label', value: information.role },
                ],
              ].map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={[
                    styles.statsRow,
                    rowIndex === 0 && { borderTopWidth: 0 },
                  ]}>
                  {row.map(({ label, value }, index) => (
                    <View
                      key={index}
                      style={[
                        styles.statsItem,
                        index === 0 && { borderLeftWidth: 0 },
                      ]}>
                      <Text style={styles.statsItemText}>{label}</Text>

                      <Text style={styles.statsItemValue}>{value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.BottomContainer}>
          <TouchableOpacity
            style={styles.button}
            mode="outlined"
            onPress={() => navigation.navigate("Step3")}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
  
      </View>
      </ScrollView>
      
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}>
            <Text style={styles.overlayContentPrice}>$56/day</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={signUp}
          mode="outlined"
          >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit Profile</Text>

            <MaterialCommunityIcons
              color="#fff"
              name="arrow-right-circle"
              size={18}
              style={{ marginLeft: 12 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
  )
}

export default Step4;

export const SummaryEntry = ({ name, label }) => {
  return (
    <View style={styles.SummaryEntry}>
      <Text style={{ marginBottom: 4, fontWeight: "700" }}>{label}</Text>
      <Text style={{ marginBottom: 4}}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf5ff',
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  SummaryEntry: {
    marginBottom: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  FormContainer: {
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "space-between",
  },
  BottomContainer: {
    alignItems: "center",
    marginBottom: "auto",
    marginTop:'auto',
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  addProduct: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderRadius: 12,
  },
  addText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  photos: {
    marginTop: 12,
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    borderRadius: 12,
  },


  photosPagination: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  photosPaginationText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fbfbfb',
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    height: 240,
  },
  picker: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  pickerDates: {
    marginLeft: 12,
  },
  pickerDatesText: {
    fontSize: 13,
    fontWeight: '500',
  },
  info: {
    marginTop: 12,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
    color: '#000000',
    marginBottom: 6,
  },
  infoRating: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRatingLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 2,
  },
  infoRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8e8e93',
    marginLeft: 2,
  },
  infoDescription: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: '#8e8e93',
  },
  stats: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  statsItem: {
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 0,
    paddingVertical: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: '#fff',
  },
  statsItemText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: '#8e8e93',
    marginBottom: 4,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#000',
  },
  overlayContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  overlayContentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  overlayContentPrice: {
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '700',
    color: '#000',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
