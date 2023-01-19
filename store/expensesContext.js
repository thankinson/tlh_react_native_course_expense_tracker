import { createContext, useReducer } from "react";

const DUMMY_EXPENSE = [
  {
    id: 'e1',
    description: 'X-Wing',
    amount: 59.99,
    date: new Date('2022-01-01'),
  },
  {
    id: 'e2',
    description: 'A-Wing',
    amount: 49.99,
    date: new Date('2022-01-01'),
  },
  {
    id: 'e3',
    description: 'Y-Wing',
    amount: 99.99,
    date: new Date('2023-01-01'),
  },
  {
    id: 'e4',
    description: 'Death Star Plans',
    amount: 999.99,
    date: new Date('2023-01-19'),
  },
]


export const ExspensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {},

});

function expenseReducer(state, action){
 switch (action.type) {
  case 'ADD':
    const id = new Date().toString() + Math.random().toString();
    return [{ ...action.payload, id: id }, ...state];
    
  case 'UPDATE':
    const updateableExpenseIndex = state.findIndex((expense)=> expense.id === action.payload.id )
    const updateableExpense = state[updateableExpenseIndex]
    const updateItem = {...updateableExpense, ...action.payload.data}
    const updatedExpenses = [...state];
    updatedExpenses [updateableExpenseIndex] = updateItem;
    return updatedExpenses;
  case 'DELETE':
    return state.filter((expense) => expense.id !== action.payload);
  default:
    return state;
}
}

function ExpensesContextProvider({children}){
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSE);

  function addExpense({expenseData}){
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id){
    dispatch({ type: 'DELETE', payload: id})
  }

  function updateExpense(id, expenseData){
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  }
  
  return <ExspensesContext.Provider value={value}>{children}</ExspensesContext.Provider>
}

export default ExpensesContextProvider;


