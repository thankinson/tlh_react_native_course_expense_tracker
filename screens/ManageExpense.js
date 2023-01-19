import { useContext, useLayoutEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import GlobalStyles from "../constants/GlobalStyles";
import { ExspensesContext } from "../store/expensesContext";

export default function ManageExpense({route, navigation}){
  const expenseCtx = useContext(ExspensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId; 

  useLayoutEffect(()=> {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler(){
    expenseCtx.deleteExpense(editedExpenseId)
    navigation.goBack();

  }

  function cancleHander(){
    navigation.goBack();
  }

  function confirmHandler(){
    if (isEditing) {
      expenseCtx.updateExpense(
        editedExpenseId,
        {
          description: 'test!!!!', 
          amount: 19.99, 
          date: new Date('2023-01-18')
        }
      );
    } else {
      expenseCtx.addExpense(
        {
          description: 'test', 
          amount: 19.99, 
          date: new Date()
        }
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancleHander}>Cancle</Button>
        <Button style={styles.button} onPress={confirmHandler} >{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
           <IconButton icon='trash' size={36} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler}/>
        </View>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})