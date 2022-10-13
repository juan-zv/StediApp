import React from "react";
import {Button, SafeAreaView, StyleSheet, TextInput, Alert} from "react-native";

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("Phone number");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Phone number"
        keyboardType="numeric"
      />
      <Button
        title="Send Text"
        onPress={() => Alert.alert('Text not sent XD')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 120,
    borderWidth: 1,
    padding: 10,
  },
});

export default UselessTextInput;