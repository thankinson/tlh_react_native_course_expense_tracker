import { useContext } from "react"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExspensesContext } from "../store/expensesContext"
import { getDateMinusDays } from "../util/date"

export default function RecentExpse(){
  const expenseCtx = useContext(ExspensesContext)

  const recentExpense = expenseCtx.expenses.filter((expense)=> {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7)
    return expense.date > date7daysAgo;
  })

  return <ExpensesOutput expenses={recentExpense} expensesPeriod='Last 7 Days'/>
}