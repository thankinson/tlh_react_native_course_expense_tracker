import {  View , StyleSheet} from "react-native";
import GlobalStyles from "../../constants/GlobalStyles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";



export default function ExpensesOutput({expenses, expensesPeriod}){
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
      <ExpensesList expenses={expenses}/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  }
})