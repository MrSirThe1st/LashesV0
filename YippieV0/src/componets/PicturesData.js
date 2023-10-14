import {
    View,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
  } from "react-native";
import { useState,React,useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';

const PicturesData = () => {
    const [datas, setDatas] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
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
          setDatas([...datas, ...selectedUris]);
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
          const imageName = `product_${Date.now()}_${index}`;
          const storageReference = ref(storage, `products/${imageName}`);
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
        return []; 
      } finally {
        setUploading(false);
      }
    };

    const windowWidth = Dimensions.get("window").width;
    const itemWidth = windowWidth / 3;
    const imageWidth = itemWidth - 24; 
    const imageHeight = imageWidth * 0.8;
  return (
    <View>
        <View style={styles.AddInput}>
            <View style={styles.photos}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {datas.map((imageUri, index) => (
                        <Pressable
                            style={[styles.pressable, { width: itemWidth }]}
                            key={index} 
                        >
                            <View style={[styles.pressableImage, { width: imageWidth, height: imageHeight }]}>
                                <Image source={{ uri: imageUri }} style={styles.image} />
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
              <TouchableOpacity style={styles.AddInputInner} onPress={pickImage}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.AddText}>Select pictures</Text>
                  <FeatherIcon color="white" name="file-plus" size={16} />
                </View>   
              </TouchableOpacity>
              {/* <Text>upload pictures of your product:0/5</Text> */}
          </View> 
    </View>
  )
}

export default PicturesData

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius:5,
        
      },
      pressable: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom:30,
        marginTop:5
      },
      pressableImage: {
        backgroundColor: "#f2f2f2",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        
      },
      AddInput:{
        alignItems:'center',
        width:"95%",
        marginBottom:10,
        borderRadius:10,

      },
      AddInputInner:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#1e90ff",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom:10
      },
      AddText:{
        fontSize: 13,
        color:'white'
      },
      photos: {
        position: 'relative',
        height: 130,
        overflow: 'hidden',
        padding:8
      },
})