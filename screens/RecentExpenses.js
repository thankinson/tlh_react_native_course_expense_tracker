import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpnse } from '../util/http';

// This screen displays expense from last 7 days

function RecentExpenses() {
  const [isFecthing, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  const [error, setError] = useState();

  useEffect(()=> {
    async function getExpenses(){
      setIsFetching(true);
      try {
        const expenses = await fetchExpnse();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fecth expenses!')
      }
      setIsFetching(false)

    }

    getExpenses()
    
  }, []);

  // function errorHandler(){
  //   setError(null);
  // }

  if (error && !isFecthing){
    return <ErrorOverlay message={error}/>
  }

  if (isFecthing){
    return <LoadingOverlay />
  }

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
