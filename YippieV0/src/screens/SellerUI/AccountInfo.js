import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Swiper from 'react-native-swiper';
import { useRoute } from '@react-navigation/native';
import Stars from "../../componets/Stars";

export default function AccountInfo({navigation}) {
  const route = useRoute();
  const { seller } = route.params;
  const { thumbnails } = route.params;
  const [selectedImages, setSelectedImages] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>     
      <ScrollView style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.avatarImg}
              />

              <View style={styles.avatarNotification} />
            </View>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle}>{seller.username}</Text>

              <Text style={styles.profileSubtitle}>
                category
                {' · '}
                <Text style={{ color: '#266EF1' }}>{seller.email}</Text>
              </Text>
            </View>
          </View>

          <Text style={styles.profileDescription}>
            {seller.brief}
          </Text>
          <View style={styles.about}>
            <Text style={styles.aboutTitle}>About</Text>

            <Text style={styles.aboutDescription}>
            {seller.overview}
            </Text>
        </View>
        </View>

        <View style={styles.stats}>
          {[
            { label: 'Location', value: seller.city },
            { label: 'country', value: seller.country},
            { label: '20 Reviews', value: <Stars/> },
          ].map(({ label, value }, index) => (
            <View
              key={index}
              style={[styles.statsItem, index === 0 && { borderLeftWidth: 0 }]}>
              <Text style={styles.statsItemText}>{label}</Text>

              <Text style={styles.statsItemValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Follow</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={{ flex: 1, paddingHorizontal: 6 }}>
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Message</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.photos}>
              <Swiper
                renderPagination={(index, total) => (
                  <View style={styles.photosPagination}>
                    <Text style={styles.photosPaginationText}>
                      {index + 1} / {total}
                    </Text>
                  </View>
                )}>
                {thumbnails.map((thumbnail, index) => (
                  <Image
                    alt=""
                    key={index}
                    source={{ uri: thumbnail }}
                    style={styles.photosImg}
                  />
                ))}
              </Swiper>
            </View>
      </ScrollView >
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1e90ff',
    
  },
  container: {
    paddingVertical: 5,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#778599',
  },
  profileDescription: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 18,
    
  },

  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
   
  
    borderColor: '#1e90ff',
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#778599',
 
  },
  
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },

  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    borderWidth:2,
    borderColor:'#1e90ff'
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
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
  about: {
    marginHorizontal: 20,
  },
  aboutTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 32,
    color: '#242329',
    marginBottom: 4,
  },
  aboutDescription: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },

});