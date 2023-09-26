import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Styles from './Styles';
import { FIREBASE_AUTH } from "../../config/firebase";
const auth = FIREBASE_AUTH;

const SECTIONS = [
  
    {
      header: 'preferences',
      icon: 'help-circle',
      items: (
        <View style={Styles.customContent}>
          
        </View>
      ),
    },
    {
      header: 'favorites',
      icon: 'help-circle',
      items: (
        <View style={Styles.customContent}>
          <Text>Custom Content Here</Text>
        </View>
      ),
    },
    {
      header: 'help',
      icon: 'align-center',
      items: (
        <View style={Styles.customContent}>
          <Text>Your Custom Content</Text>
        </View>
      ),
    },
    {
      header: 'account',
      icon: 'settings',
      items: (
        <View style={Styles.customContent}>
          <Text>Your Custom Content</Text>
          <Pressable onPress={()=>auth.signOut()}><Text>Sign Out</Text></Pressable>
        </View>
      ),
    },
  ];

const Profile = () => {
  const [value, setValue] = React.useState(0);
  
  const { tabs } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ header, icon }) => ({
        name: header,
        icon,
      })),
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#f8f8f8', flex: 1 }}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <Image
              alt=""
              source={{
                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
              }}
              style={styles.profileAvatar}
            />

            <View style={styles.profileBody}>
              <Text style={styles.profileName}>Marc im</Text>

              <Text style={styles.profileHandle}>Marc im</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit-3" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
        <View style={styles.tabs}>
          {tabs.map(({ name, icon }, index) => {
            const isActive = index === value;

            return (
              <View
                key={name}
                style={[
                  styles.tabWrapper,
                  isActive && { borderBottomColor: '#1e90ff' },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    setValue(index);
                  }}>
                  <View style={styles.tab}>
                    <FeatherIcon
                      color={isActive ? '#1e90ff' : '#eaf5ff'}
                      name={icon}
                      size={16}
                    />

                    <Text
                      style={[
                        styles.tabText,
                        isActive && { color: '#1e90ff' },
                      ]}>
                      {name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {SECTIONS[value].items}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3d3d3d',
  },
  profileHandle: {
    marginTop: 4,
    fontSize: 15,
    color: '#989898',
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  tabs: {
    padding: 16,
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 5,
  },
  container: {
    paddingTop:24,
    flex:1,
  },
  content: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    flex:1
  },
});
