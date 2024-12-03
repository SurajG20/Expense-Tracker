import styled from "styled-components";
import History from "./History";
import { InnerLayout } from "../../styles/Layouts";
import Chart from "./Chart";
import { useSelector } from "react-redux";
import {
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
} from "../../features/utilities/totalUtilities";

function Dashboard() {
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expenses.expenses);

  const minIncome = incomes.length
    ? Math.min(...incomes.map((item) => item.amount))
    : 0;
  const maxIncome = incomes.length
    ? Math.max(...incomes.map((item) => item.amount))
    : 0;
  const minExpense = expenses.length
    ? Math.min(...expenses.map((item) => item.amount))
    : 0;
  const maxExpense = expenses.length
    ? Math.max(...expenses.map((item) => item.amount))
    : 0;

  const StatBox = ({ title, amount, className }) => (
    <div className={className}>
      <h2>{title}</h2>
      <p>₹ {amount}</p>
    </div>
  );

  const MinMaxDisplay = ({ title, min, max }) => (
    <>
      <h2 className="salary-title">
        Min <span>{title}</span>Max
      </h2>
      <div className="salary-item">
        <p>₹{min}</p>
        <p>₹{max}</p>
      </div>
    </>
  );

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <StatBox
                title="Total Income"
                amount={calculateTotalIncome(incomes)}
                className="income"
              />
              <StatBox
                title="Total Expense"
                amount={calculateTotalExpenses(expenses)}
                className="expense"
              />
              <StatBox
                title="Total Balance"
                amount={calculateTotalBalance(incomes, expenses)}
                className="balance"
              />
            </div>
          </div>
          <div className="history-con">
            <History />
            <div className="salary-container">
              <MinMaxDisplay title="Salary" min={minIncome} max={maxIncome} />
              <MinMaxDisplay
                title="Expense"
                min={minExpense}
                max={maxExpense}
              />
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

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .chart-con {
      height: 240px;

      @media (max-width: 768px) {
        height: auto;
      }

      .amount-con {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 1rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          gap: 0.8rem;
        }

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
          transition: transform 0.2s ease;

          &:hover {
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            padding: 0.8rem;
          }

          h2 {
            font-size: 1rem;
            text-align: center;

            @media (max-width: 768px) {
              font-size: 0.9rem;
            }
          }
          p {
            text-align: center;
            font-size: 1rem;
            font-weight: 500;

            @media (max-width: 768px) {
              font-size: 0.9rem;
            }
          }
        }
      }
    }

    .history-con {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .salary-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        h2 {
          display: flex;
          align-items: center;
          justify-content: space-between;

          @media (max-width: 768px) {
            font-size: 0.9rem;
          }
        }

        .salary-title {
          font-size: 1rem;

          @media (max-width: 768px) {
            font-size: 0.9rem;
          }

          span {
            font-size: 1.2rem;
            color: var(--primary-color, #222260);
            font-weight: 600;

            @media (max-width: 768px) {
              font-size: 1.1rem;
            }
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
          transition: transform 0.2s ease;

          &:hover {
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            padding: 0.6rem;
          }

          p {
            font-weight: 600;
            font-size: 1.1rem;

            @media (max-width: 768px) {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
`;

export default Dashboard;
