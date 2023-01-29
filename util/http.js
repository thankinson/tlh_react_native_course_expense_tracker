import axios from "axios";
import {API_URL} from "@env"
const BACKEND_URL = API_URL


export async function storeExpense(expenseData){
  try {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
  } catch (error) {
    console.log('Could not ADD to db:', error)
  }
};

export async function fetchExpnse(){
  console.log ('fetchExspence hit')
  try {
    const response = await axios.get(BACKEND_URL + '/expenses.json');
    const expenses = [];
    for (const key in response.data){
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description
      };
      expenses.push(expenseObj)
    }

    return expenses;
    
  } catch (error) {
    console.log('Failed fect', error)
  }
}

export function updateExpense(id, expenseData){
  try {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
  } catch (error) {
    console.log('update failed:', error)
  }  

}

export function deleteExpense(id){
  try {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
  } catch (error) {
    console.log('delete failed', error)
  }
}