import { useState } from "react";
import { Alert, StyleSheet, Text, View, } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from '../UI/Button'
import Input from "./Input";

// import { getFormattedDate } from "../../util/date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValue}){
  // const [amountValue, setAmountValue] = useState('');
  // const [dateValue, setDateValue] = useState('');
  // const [description, setDescription ] = useState('')
  const [inputs, setInputs] = useState({
    amount: { 
      value: defaultValue ? defaultValue.amount.toString() : '',
      // isValid: defaultValue ? true : false,
      // isValid: !!defaultValue // checks if its true or false.. same as above.
      isValid: true

      },
    date: {
      value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : '',
      // isValid: !!defaultValue
      isValid: true
      },
    // date: defaultValue ? getFormattedDate(defaultValue.date) : '', // this is if you are using the optinol date return in util/date.js
    description: {
      value: defaultValue ? defaultValue.description.toString() : '',
      // isValid: !!defaultValue
      isValid: true
      }
  });

  function inputChangedHandler(inputIdentifier, enteredValue){
    setInputs((curInputs)=> {
      return {
        ...curInputs,
        [inputIdentifier] : { value: enteredValue, isValid: true}
      }
    });
  }

  function submitHandler(){
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid){
      // Alert.alert('Invalid input', 'Please check your input values')
      setInputs((curInputs) => {
        return {
          amount: {value: curInputs.amount.value, isValid: amountIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          description: {value: curInputs.description.value, isValid: descriptionIsValid}
        }
      })
      return;
    }

    onSubmit(expenseData);   
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          style={styles.rowFlex}
          label='Amount' 
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input 
          style={styles.rowFlex}
          invalid={!inputs.date.isValid}
          label='Date' textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>
      <Input label='Description'
      invalid={!inputs.date.isValid} 
      textInputConfig={{
        multiline: true,
        onChangeText: inputChangedHandler.bind(this, 'description'),
        value: inputs.description.value
        // autocorrect: false,
        // autoCapitalize: ''
        // onChangeText: 
      }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - check yoru data</Text>}
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
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 8
  }
})