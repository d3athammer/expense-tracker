
// Creating expense object
interface Expense {
  category: string;
  id: number;
  description: string;
  amount: number;
}

interface Props {
  // Step 1. Create props
  // An array of expense object
  expenses: Expense[]
  onDelete: (id:number) => void;
}

// Step 2. Add props inside using destructuring method
const ExpenseList = ( { expenses, onDelete } : Props ) => {

  // guard claus to not show expense table when there are no expenses
  if (expenses.length === 0 ) return null;
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map( expense =>
        <tr key={expense.id}>
          <td>{expense.description}</td>
          <td>{expense.amount}</td>
          <td>{expense.category}</td>
          <td>
            <button className="btn btn-outline-danger" onClick={() => onDelete(expense.id)}>Delete</button>
          </td>
        </tr>)}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>${expenses.reduce((acc,expense) => expense.amount + acc, 0).toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  )
}

export default ExpenseList;
