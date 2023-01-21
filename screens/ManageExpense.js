import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';


import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

// manage expense screen will check to see if you are creating a new item or updating an existing item.
// the key functions of thoos screen is to display and allow a user to add, update or delete a list item.

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId; 
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId) // checks id in list 

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense', // if isEditing true 'Edit Expense' displayed else 'Add expense"
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId); // gets current id and deletes item from list
    navigation.goBack(); // goes back to previouse screen
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) { // if isEditing true update current list item
      expensesCtx.updateExpense(
        editedExpenseId, expenseData
      );
    } else { // else add new item
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'} // if isEditing true 'Update' displayed esle 'Add'
        onCancel={cancelHandler} onSubmit={confirmHandler}
        defaultValue={selectedExpense}
        />  
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
   deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
