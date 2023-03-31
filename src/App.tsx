import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import ExpenseList from './Component/ExpenseList';
import ExpenseFilter from './Component/ExpenseFilter';
import ExpenseForm from './Component/ExpenseForm';

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
      {/* generates new array of objects, as well as a new object of expense, with an added id */}
      <ExpenseForm onSubmit={expense => setExpenses([...expenses, {...expense, id: expenses.length + 1}]) }/ >
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
