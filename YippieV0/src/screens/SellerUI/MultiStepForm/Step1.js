import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from '../../../Store';
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Step1 = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 0;
      });

  }, [isFocused]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 33;
      s.fullName = data.fullName;
      s.age = data.age;
    });
    navigation.navigate("Step2");
  };
  return (
    <View style={styles.container}>
    <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.getRawState().progress}
      color={MD3Colors.primary60}
    />
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.formEntry}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Full Name"
              placeholder="Enter Full Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="fullName"
        />
        {errors.fullName && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>

      <View style={[styles.formEntry]}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Age"
              placeholder="Enter Age"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="age"
        />
        {errors.age && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        mode="outlined"
        style={styles.button}
      >
        GOTO STEP TWO
      </Button>
    </View>
  </View>
  )
}

export default Step1

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  formEntry: {
    margin: 8,
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
})