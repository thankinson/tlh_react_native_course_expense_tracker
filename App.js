import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator();
const BottonTabs = createBottomTabNavigator();

// screens
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpse from "./screens/RecentExpense";

export default function App() {

  function ExpensesOverview(){
    return (
      <BottonTabs.Navigator>
        <BottonTabs.Screen name='RecentExpenses' component={RecentExpse} />
        <BottonTabs.Screen name='AllExpenses' component={AllExpenses} />
      </BottonTabs.Navigator>
    )
  }

  return (
    <>
     <StatusBar style='auto' />  
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name='ExpensesOverView' component={ExpensesOverview}/>
        <Stack.Screen name='ManageExpense' component={ManageExpense} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

