import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExspensesContext } from "../store/expensesContext";

export default function AllExpenses(){
  const expensesCtx = useContext(ExspensesContext);

  return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='Total'/>
}