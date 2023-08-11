import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity} from "react-native";
import UserAvatar from 'react-native-user-avatar';
import { WizardStore } from "../../../Store";
import { 
  Button, 
  ProgressBar,
  Portal,
  Dialog,
} from "react-native-paper";


const Step4 = ({ navigation,}) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

 
  const information = WizardStore.useState();

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const clearAndReset = () => {
    WizardStore.replace({
      UserName: "",
      termsAccepted: "",
      privacyAccepted: "",
      email: "",
      cellphoneNumber: "",
      password: "",
      confirmPassword: "",
      overview:"",
      country: null,
      city: null,
      state: null,
      item:null,
      progress: 0,
    });
    setVisible(false);
    navigation.replace("Step1");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />
      <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.useState().progress / 100}
      color="#1e90ff" 
      />
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
                  <Button onPress={clearAndReset}>Yes</Button>
                </Dialog.Actions>
              </Dialog>
          </Portal>

            <View style={styles.summaryEntriesContainer}>

              <View style={styles.summaryEntryContainer1}>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <View >
                      <UserAvatar size={50} /*name={route.params.username}*/ bgColor='#1e90ff' borderRadius={50}/>
                    </View>
                    <View >
                      <SummaryEntry
                        name={information.UserName}
                        label={"UserName"}
                      />
                      <View style={{flexDirection:'row'}}>
                        <SummaryEntry 
                          name={information.city} 
                          label={"city"}/>
                        <SummaryEntry 
                          name={information.state} 
                          label={"state"}/>
                        <SummaryEntry 
                          name={information.country} 
                          label={"country"}/>
                      </View>  
                    </View>
                  </View>
                  <View>
                    <SummaryEntry
                      name={information.item} 
                      label={"item"} />
                    <SummaryEntry
                      name={information.overview} 
                      label={"overview"} />
                  </View>
                </View>
              </View>

              <View style={styles.summaryEntryContainer}>
                <SummaryEntry
                  name={information.cellphoneNumber}
                  label={"cellphoneNumber"}
                />
                <SummaryEntry
                  name={information.email}
                  label={"email"}
                />
                <TouchableOpacity
                  style={styles.button}
                  mode="outlined"
                  onPress={() => setVisible(true)}
                >
                  <Text style={styles.buttonText}>Submit Profile</Text>
                </TouchableOpacity>
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
    backgroundColor:'white'
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  summaryEntriesContainer: {
    alignItems:'center',
    justifyContent:'center',
  },
  SummaryEntry: {
    marginBottom: 5,
    flexDirection:'row',
    marginHorizontal:10
  },
  summaryEntryContainer:{
    width:"100%",
    marginBottom:20,
    borderRadius:10,
    padding:15,
    backgroundColor:'#eaf5ff'
  },
  summaryEntryContainer1:{
    width:"100%",
    marginBottom:20,
    borderRadius:10,
    padding:10,
    backgroundColor:'#eaf5ff',
    flexDirection:'row'
  },
  button:{
    backgroundColor:"#1e90ff",
    borderRadius:5,
    padding:10,
    margin:10,
    alignItems:'center',
  },
  buttonText: {
    color: 'white', 
    fontWeight:'bold',
  },
  FormContainer:{
    paddingHorizontal: 16,
    height:"100%",
    justifyContent:'space-between',
  },
  BottomContainer:{
    alignItems:'center',
    marginBottom:50,
    justifyContent:'space-between',
    flexDirection:'row',
  },
  title:{
    fontSize: 30,
    fontWeight:'bold'
  },
})