import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import ExpenseList from './Component/ExpenseList';
import ExpenseFilter from './Component/ExpenseFilter';
import ExpenseForm from './Component/ExpenseForm';

// make sure it's a constant so you are able to manipulate the data
export const categories = [ 'Groceries', 'Utilities', 'Entertainment'] as const;

function App() {

  // set state for expenses
  const [ expenses, setExpenses ] = useState([
    {id: 1, description: "aaa", amount: 10, category: "Groceries"},
    {id: 2, description: "bbb", amount: 10, category: "Groceries"},
    {id: 3, description: "ccc", amount: 10, category: "Utilities"},
    {id: 4, description: "ddd", amount: 10, category: "Utilities"}
  ])
  // set state for selectedCategory
  const [ selectedCategory, setSelectedCategory ] = useState('');

  // To only show the selected category
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <>
    <ChakraProvider>
      <ExpenseForm/ >
    </ChakraProvider>
      <div className="mx-4 mb-3 w-100">
      <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)} />
      </div>
      <div className='mx-4 w-100'>
        <ExpenseList
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter( e => e.id !== id))}
        />
      </div>
    </>
  )
}

export default App;
