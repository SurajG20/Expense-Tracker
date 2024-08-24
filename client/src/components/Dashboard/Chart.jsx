import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { useSelector } from 'react-redux';

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Chart() {
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expenses.expenses);

  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount),
        backgroundColor: 'green',
        borderColor: 'green',
        fill: false,
        tension: 0.2
      },
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        backgroundColor: 'red',
        borderColor: 'red',
        fill: false,
        tension: 0.2
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount'
        }
      }
    }
  };

  return (
    <>
      <h1 style={{ fontSize: 'large', marginBottom: '1rem' }}>All Transactions</h1>
      <ChartStyled>
        <Line data={data} options={options} />
      </ChartStyled>
    </>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 400px;
  width: 100%;

  @media (max-width: 768px) {
    height: 300px;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    height: 250px;
    padding: 0.25rem;
  }
`;

export default Chart;
