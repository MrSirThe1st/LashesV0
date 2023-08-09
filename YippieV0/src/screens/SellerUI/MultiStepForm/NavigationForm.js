import { StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import customTheme from '../CustomTheme';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';




const Stack = createNativeStackNavigator();

const NavigationForm = () => {
  return (
    <PaperProvider theme={customTheme}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Step1" >

        <Stack.Screen name="Step1" component={Step1} 
          options={{headerTitle: 'Step1',
          headerTintColor: '#1e90ff', 
          headerStyle: {
            backgroundColor: 'white',
          },
          }}/>

          <Stack.Screen name="Step2" component={Step2} 
          options={{headerTitle: 'Step2',
          headerTintColor: '#1e90ff', 
          headerStyle: {
            backgroundColor: 'white',
          },
          }}/>
          
          <Stack.Screen name="Step3" component={Step3} 
          options={{headerTitle: 'Step3',
          headerTintColor: '#1e90ff', 
          headerStyle: {
            backgroundColor: 'white',
          },
          }}/>
          
          <Stack.Screen name="Step4" component={Step4} 
          options={{headerTitle: 'Preview',
          headerTintColor: '#1e90ff', 
          headerStyle: {
            backgroundColor: 'white',
          },
          }}/>

        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  )
}

export default NavigationForm

const styles = StyleSheet.create({})