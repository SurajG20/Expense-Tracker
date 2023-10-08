import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../Income/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { useSelector } from 'react-redux';
import { deleteExpense } from '../../features/expenses/expenseActions';
import { calculateTotalExpenses } from '../../features/utilities/totalUtilities';
function Expenses() {
  const expenses = useSelector((state) => state.expenses.expenses);

  return (
    <ExpenseStyled>
      <InnerLayout
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <h1>Expenses</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 className='total-income'>
            Total Expense: <span>₹{calculateTotalExpenses(expenses)}</span>
          </h2>
        </div>

        <div className='income-content'>
          <div className='form-container'>
            <ExpenseForm />
          </div>
          <div className='incomes'>
            {expenses.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor='var(--color-green)'
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  h1 {
    font-size: large;
  }
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    background: #fcf6f9;
    border: 1px solid #ffffff;
    border-radius: 10px;
    padding: 0.5rem;
    font-size: 1.2rem;
    gap: 0.5rem;
    span {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--color-green);
    }
  }
  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;

export default Expenses;
