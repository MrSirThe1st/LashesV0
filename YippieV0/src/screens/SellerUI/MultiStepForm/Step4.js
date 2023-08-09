import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar} from "react-native";
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
      <View style={{ paddingHorizontal: 16 }}>
      <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={clearAndReset}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <SummaryEntry name={information.UserName} label={"UserName"} />

        <SummaryEntry name={information.cellphoneNumber} label={"cellphoneNumber"} />
        
        <SummaryEntry name={information.email} label={"email"} />

        <SummaryEntry name={information.overview} label={"overview"} />

        <SummaryEntry name={information.country} label={"country"}/>

        <SummaryEntry name={information.state} label={"state"}/>

        <SummaryEntry name={information.city} label={"city"}/>

        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => navigation.navigate("Step3")}
        >
          GO BACK
        </Button>

        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => setVisible(true)}
        >
          SAVE DATA
        </Button>
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
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
})