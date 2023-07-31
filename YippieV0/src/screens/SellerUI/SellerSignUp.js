import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StepOne = () => {
  // Implement your StepOne component here
  return (
    <View>
      <Text>Step One</Text>
      {/* Add form inputs and logic */}
    </View>
  );
};

const StepTwo = () => {
  // Implement your StepTwo component here
  return (
    <View>
      <Text>Step Two</Text>
      {/* Add form inputs and logic */}
    </View>
  );
};

const StepThree = () => {
  // Implement your StepThree component here
  return (
    <View>
      <Text>Step Three</Text>
      {/* Add form inputs and logic */}
    </View>
  );
};

const StepFour = () => {
  // Implement your StepFour component here
  return (
    <View>
      <Text>Step Four</Text>
      {/* Add form inputs and logic */}
    </View>
  );
};

const SellerSignUp = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <View style={styles.container}>
      {activeStep === 1 && <StepOne />}
      {activeStep === 2 && <StepTwo />}
      {activeStep === 3 && <StepThree />}
      {activeStep === 4 && <StepFour />}

      <View style={styles.navigation}>
        {activeStep > 1 && <Button title="Previous" onPress={handlePrevStep} />}
        {activeStep < 4 && <Button title="Next" onPress={handleNextStep} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default SellerSignUp;
