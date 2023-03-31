import categories from "./Categories"

interface Props {
  onSelectCategory: (category: string ) => void
}
const ExpenseFilter = ( { onSelectCategory } : Props ) => {
  return (
    // onChange parameter returns event by default, u can use it to access value
    <select className='form-select' onChange={(e) => onSelectCategory(e.target.value)}>
      <option value="">All Category</option>
      {categories.map((category) =>
        <option key={category} value={category}>{category}</option>
      )}
    </select>
  )
}

export default ExpenseFilter
