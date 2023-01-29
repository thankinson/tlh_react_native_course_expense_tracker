import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function ErrorOverlay({message}){
  return (
    <View style={styels.container} >
      <Text style={[styels.text, styels.title]} >An error occurred!</Text>
      <Text style={styels.text}>{message}</Text>
      {/* <Button onPress={onConfirm}>Okay</Button> // do not need  */}
    </View>
  )

}

export default ErrorOverlay;

const styels = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
})