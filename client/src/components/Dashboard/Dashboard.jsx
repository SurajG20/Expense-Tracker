import styled from 'styled-components';
import History from './History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from './Chart';
import { useSelector } from 'react-redux';
import {
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
} from '../../features/utilities/totalUtilities';
function Dashboard() {
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expenses.expenses);

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className='stats-con'>
          <div className='chart-con'>
            <Chart />
            <div className='amount-con'>
              <div className='income'>
                <h2>Total Income</h2>
                <p>₹ {calculateTotalIncome(incomes)}</p>
              </div>
              <div className='expense'>
                <h2>Total Expense</h2>
                <p>₹ {calculateTotalExpenses(expenses)}</p>
              </div>
              <div className='balance'>
                <h2>Total Balance</h2>
                <p>₹ {calculateTotalBalance(incomes, expenses)}</p>
              </div>
            </div>
          </div>
          <div className='history-con'>
            <History />
            <h2 className='salary-title'>
              Min <span>Salary</span>Max
            </h2>
            <div className='salary-item'>
              <p>₹{Math.min(...incomes.map((item) => item.amount))}</p>
              <p>₹{Math.max(...incomes.map((item) => item.amount))}</p>
            </div>
            <h2 className='salary-title'>
              Min <span>Expense</span>Max
            </h2>
            <div className='salary-item'>
              <p>₹{Math.min(...expenses.map((item) => item.amount))}</p>
              <p>₹{Math.max(...expenses.map((item) => item.amount))}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    .chart-con {
      /* grid-column: 1 / 3; */
      height: 240px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 1rem;

        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          border-radius: 20px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          h2 {
            font-size: 1rem;
            text-align: center;
          }
          p {
            text-align: center;
            font-size: 1rem;
            font-weight: 500;
          }
        }
      }
    }

    .history-con {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1rem;
        span {
          font-size: 1.2rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 0.8rem;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.1rem;
        }
      }
    }
  }
`;

export default Dashboard;
