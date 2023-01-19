import { FlatList, Text, View, StyleSheet } from "react-native";
import ExpenseItem from "./ExpensesItem";

function renderExpenseItem(itemData){
  return <ExpenseItem {...itemData.item} />
};

export default function ExpensesList({expenses}){
  return <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item)=> item.id}/>
  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

