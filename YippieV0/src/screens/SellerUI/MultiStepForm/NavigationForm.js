import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ProgressBar,MD3Colors, Provider as PaperProvider } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import LastStep from './LastStep';



const Stack = createNativeStackNavigator();

const NavigationForm = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Step1">
          <Stack.Screen name="Step1" component={Step1} />
          <Stack.Screen name="Step2" component={Step2} />
          <Stack.Screen name="Step3" component={Step3} />
          <Stack.Screen name="Step4" component={Step4} />
          <Stack.Screen name="Step5" component={Step5} />
          <Stack.Screen name="LastStep" component={LastStep} />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  )
}

export default NavigationForm

const styles = StyleSheet.create({})