import { useState } from "react";
import { StyleSheet, Text, View, } from "react-native";

import Input from "./Input";

function ExpenseForm(){
  // const [amountValue, setAmountValue] = useState('');
  // const [dateValue, setDateValue] = useState('');
  // const [description, setDescription ] = useState('')
  const [inputValue, setInputValue] = useState({
    amount: '',
    date: '',
    description: '',
  });


  function inputChangedHandler(inputIdentifier, enteredValue){
    setInputValue((curInputValues)=> {
      return {
        ...curInputValues,
        [inputIdentifier] : enteredValue
      }
    });
  }


  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          style={styles.rowFlex}
          label='Amount' 
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValue.amount,
          }}
        />
        <Input 
          style={styles.rowFlex}
          label='Date' textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValue.date
          }}
        />
      </View>
      <Input label='Description' 
      textInputConfig={{
        multiline: true,
        onChangeText: inputChangedHandler.bind(this, 'description'),
        value: inputValue.description
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