import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity} from "react-native";
import { SubmitHandler, useForm, Controller} from "react-hook-form";
import { WizardStore } from "../../../Store";
import { 
  Button, 
  ProgressBar,
  Portal,
  Dialog,
} from "react-native-paper";


const Step4 = ({ navigation }) => {

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
      color="#1e90ff" // Set the color to your primary color
      />
      <View style={styles.FormContainer}>
        <View>
        <View style={{alignItems:'center', justifyContent:'center', marginBottom:10,}}>
          <Text style={styles.title}>Take a last look at your<Text style={{ color: '#1e90ff' }}>Profile</Text></Text>
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

              <View style={styles.summaryEntryContainer}>
                <SummaryEntry
                  style={styles.summaryEntry}
                  name={information.UserName}
                  label={"UserName"}
                />
              </View>

              <View style={styles.summaryEntryContainer}>
                <SummaryEntry
                  style={styles.summaryEntry}
                  name={information.cellphoneNumber}
                  label={"cellphoneNumber"}
                />
                <SummaryEntry
                  style={styles.summaryEntry}
                  name={information.email}
                  label={"email"}
                />
                <SummaryEntry
                  style={styles.summaryEntry}
                  name={information.overview} 
                  label={"overview"} />
              </View>
            
              <View style={styles.summaryEntryContainer}>
                <SummaryEntry 
                    style={styles.summaryEntry}
                    name={information.country} 
                    label={"country"}/>

                <SummaryEntry 
                    style={styles.summaryEntry}
                    name={information.state} 
                    label={"state"}/>

                <SummaryEntry 
                    style={styles.summaryEntry}
                    name={information.city} 
                    label={"city"}/>
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

          <TouchableOpacity
            style={styles.button}
            mode="outlined"
            onPress={() => setVisible(true)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
  
      </View>
    </SafeAreaView>
  )
}

export default Step4;

export const SummaryEntry = ({ name, label }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8, fontWeight: "700" }}>{label}</Text>
      <Text style={{ marginBottom: 8 }}>{name}</Text>
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
    justifyContent:'center'
  },
  summaryEntry: {
    marginBottom: 5,
  },
  summaryEntryContainer:{
    borderColor:"#1e90ff",
    width:"100%",
    marginBottom:20,
    borderRadius:10,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#eaf5ff'
  },
  button:{
    backgroundColor:"#1e90ff",
    borderRadius:5,
    padding:10
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