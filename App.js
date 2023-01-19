import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import ExpensesContextProvider from './store/expensesContext';

const Stack = createNativeStackNavigator();
const BottonTabs = createBottomTabNavigator();

import IconButton from './components/ui/IconButton';

// screens
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import RecentExpse from "./screens/RecentExpense";
import GlobalStyles from './constants/GlobalStyles';

export default function App() {

  function ExpensesOverview(){
    return (
      <BottonTabs.Navigator
      screenOptions={({navigation})=>({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          
          <IconButton 
            icon={'add'} 
            size={24} 
            color={tintColor} 
            onPress={() => {
              navigation.navigate('ManageExpense')
              }}
          />
        )
      })}
      >
        <BottonTabs.Screen 
          name='RecentExpenses' 
          component={RecentExpse} 
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({color, size})=> (
              <Ionicons name='hourglass' size={size} color={color} />)
          }}/>
        <BottonTabs.Screen 
          name='AllExpenses' 
          component={AllExpenses} 
          options={{
            title: 'All Expenses',
            tabBarLabel: 'Expenses',
            tabBarIcon: ({color, size})=> (
              <Ionicons name='calendar' size={size} color={color} />)
          }}/>
      </BottonTabs.Navigator>
    )
  }

  return (
    <>
     <StatusBar style='light' /> 
     <ExpensesContextProvider> 
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ 
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white'
         }}>
        <Stack.Screen  
          name='ExpensesOverView' 
          component={ExpensesOverview}
          options={{headerShown: false}} />
        <Stack.Screen 
          name='ManageExpense' component={ManageExpense}
          options={{
            presentation: 'modal',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
    </ExpensesContextProvider>
    </>
  );
}

