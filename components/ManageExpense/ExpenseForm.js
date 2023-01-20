import { useState } from "react";
import { StyleSheet, Text, View, } from "react-native";
import Button from '../UI/Button'
import Input from "./Input";

// import { getFormattedDate } from "../../util/date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValue}){
  // const [amountValue, setAmountValue] = useState('');
  // const [dateValue, setDateValue] = useState('');
  // const [description, setDescription ] = useState('')
  const [inputValue, setInputValue] = useState({
    amount: defaultValue ? defaultValue.amount.toString() : '',
    date: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : '',
    // date: defaultValue ? getFormattedDate(defaultValue.date) : '', // this is if you are using the optinol date return in util/date.js
    description:defaultValue ? defaultValue.description.toString() : '',
  });

  function inputChangedHandler(inputIdentifier, enteredValue){
    setInputValue((curInputValues)=> {
      return {
        ...curInputValues,
        [inputIdentifier] : enteredValue
      }
    });
  }

  function submitHandler(){
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      description: inputValue.description
    } 
    onSubmit(expenseData);   
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
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>

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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})