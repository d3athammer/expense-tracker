import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import Form from './Component/Form'
import * as React from 'react'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import ExpenseList from './Component/ExpenseList';
import ExpenseFilter from './Component/ExpenseFilter';



function App() {

  // set state for expenses
  const [ expenses, setExpenses ] = useState([
    {id: 1, description: "aaa", amount: 10, category: "utility"},
    {id: 2, description: "bbb", amount: 10, category: "utility"},
    {id: 3, description: "ccc", amount: 10, category: "utility"},
    {id: 4, description: "ddd", amount: 10, category: "utility"}
  ])
  // set state for selectedCategory
  const [ selectedCategory, setSelectedCategory ] = useState( ' ');

  // To only show the selected category
  const visibleExpenses = selectedCategory
    ? expenses.filter( (e) => e.category === selectedCategory )
    : expenses;

  return (
    <ChakraProvider>
      <div>
        <Form />
      </div>
      <div className="mb-3">
      <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)}/>
      </div>
      {/* id has been set in component's prop in interface */}
      <ExpenseList expenses={visibleExpenses} onDelete={(id) => setExpenses(expenses.filter( e => e.id !== id))} />
    </ChakraProvider>
  )
}

export default App;
