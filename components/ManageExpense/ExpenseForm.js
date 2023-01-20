import { StyleSheet, Text, View, } from "react-native";

import Input from "./Input";

function ExpenseForm(){
  
  function amountChangedHandler(){}

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          style={styles.rowFlex}
          label='Amount' 
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangedHandler
          }}
        />
        <Input 
          style={styles.rowFlex}
          label='Date' textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: ()=>{}
          }}
        />
      </View>
      <Input label='Description' 
      textInputConfig={{
        multiline: true,
        // autocorrect: false,
        // autoCapitalize: ''
        // onChangeText: 
      }}
      />
    </View>
  )
}


export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowFlex: {
    flex: 1
  },
})