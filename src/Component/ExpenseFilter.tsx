import React from 'react'



interface Props {
  onSelectCategory: (category: string ) => void
}
const ExpenseFilter = ( { onSelectCategory } : Props ) => {
  return (
    // onChange parameter returns event by default, u can use it to access value
    <select className='form-select' onChange={(e) => onSelectCategory(e.target.value)}>
      <option value="">All categories</option>
      <option value="Groceries">Groceries</option>
      <option value="Utilities">Utilities</option>
    </select>
  )
}

export default ExpenseFilter
