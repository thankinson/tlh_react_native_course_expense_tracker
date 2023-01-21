import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

// This screen displays expense from last 7 days

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext); // gets store content

  const recentExpenses = expensesCtx.expenses.filter((expense) => { // filters items added in last 7 days
    const today = new Date(); // gets curent date
    const date7DaysAgo = getDateMinusDays(today, 7); // checks items form last 7 days from current date

    return expense.date >= date7DaysAgo && expense.date <= today; // returns items
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
