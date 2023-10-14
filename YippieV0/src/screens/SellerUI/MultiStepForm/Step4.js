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
import { collection, addDoc} from "firebase/firestore"; 
import { uploadBytes,ref, getDownloadURL } from "firebase/storage";
import { storage, } from "../../../config/firebase";
import * as ImagePicker from 'expo-image-picker';



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



  const [loading, setLoading] = useState(false)
  const email = WizardStore.getRawState().email;
  const password = WizardStore.getRawState().password;
  const confirmPassword = WizardStore.getRawState().confirmPassword;
  const username = WizardStore.getRawState().UserName;
  const cellphoneNumber = WizardStore.getRawState().cellphoneNumber;
  const item = WizardStore.getRawState().item;
  const overview = WizardStore.getRawState().overview;
  const brief = WizardStore.getRawState().brief;
  const city = WizardStore.getRawState().city;
  const country = WizardStore.getRawState().country;
  const state = WizardStore.getRawState().state;

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
      return []; // Return an empty array to avoid issues with the subsequent code.
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
        const UserUID = response.user.uid;

        await addDoc(collection(db, "users"), {
          username: username,
          role: role,
          email: email,
          cellphoneNumber: cellphoneNumber,
          overview :overview,
          item: item,
          brief: brief,
          thumbnails: uploadedImageUrls,
          city:city,
          country:country,
          state:state,
          uid: UserUID
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
                      {index + 1} / {total}
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
            
            <View style={styles.picker}>
              <View style={styles.pickerDates}>
                <Text style={[styles.pickerDatesText, { marginBottom: 2 }]}>
                  {information.UserName}
                </Text>
                <Text style={styles.pickerDatesText}>
                    {information.city}
                  </Text>
                <View style={styles.innerpicker}>
                  <Text style={styles.pickerDatesText}>
                    {information.country}
                  </Text>
                  <Text style={styles.pickerDatesText}>
                    {information.state}
                  </Text>                  
                      
                </View>                          
              </View>
            </View>
            <View style={styles.picker}>
              <View style={styles.pickerDates}>
                <Text style={[styles.pickerDatesText, { marginBottom: 2 }]}>
                <Text style={{ color: '#1e90ff' }}>email: </Text>{information.email}
                </Text>
                <Text style={styles.pickerDatesText}>
                  {information.cellphoneNumber}
                </Text>
                <Text style={styles.pickerDatesText}>
                  {information.item}
                </Text>                         
              </View>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoTitle}>{information.brief}</Text>
              <Text style={styles.infoDescription}>
              {information.overview}
              </Text>
            </View>            
          </View>
        </View>
      </View>
      </ScrollView>
      
      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}>
            <Text style={styles.overlayContentPrice}>All <Text style={{ color: '#1e90ff' }}>Good?</Text></Text>
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
  FormContainer: {
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "space-between",
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
    marginVertical:10
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
    paddingBottom: 12,
    shadowColor: '#000',
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
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
    backgroundColor: '#1e90ff',
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
    marginRight:6
  },
  innerpicker:{
    flexDirection:'row',

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
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#fff',
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
    backgroundColor: '#1e90ff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
