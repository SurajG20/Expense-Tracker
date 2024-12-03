import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import { useSelector } from "react-redux";
import { useMemo } from "react";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expenses.expenses);

  const data = useMemo(
    () => ({
      labels: incomes.map((inc) => dateFormat(inc.date)),
      datasets: [
        {
          label: "Income",
          data: incomes.map((income) => income.amount),
          backgroundColor: "var(--color-green)",
          borderColor: "var(--color-green)",
          fill: false,
          tension: 0.2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Expenses",
          data: expenses.map((expense) => expense.amount),
          backgroundColor: "red",
          borderColor: "red",
          fill: false,
          tension: 0.2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    }),
    [incomes, expenses]
  );

  const options = useMemo(
    () => ({
      maintainAspectRatio: false,
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            boxWidth: 6,
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#333",
          bodyColor: "#666",
          borderColor: "#ddd",
          borderWidth: 1,
          padding: 10,
          displayColors: true,
          callbacks: {
            label: (context) => `₹${context.parsed.y}`,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          title: {
            display: true,
            text: "Amount (₹)",
            font: {
              size: 14,
              weight: "bold",
            },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      },
    }),
    []
  );

  return (
    <>
      <ChartHeader>All Transactions</ChartHeader>
      <ChartStyled>
        <Line data={data} options={options} />
      </ChartStyled>
    </>
  );
}

const ChartHeader = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 400px;
  width: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    height: 300px;
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    height: 250px;
    padding: 0.6rem;
  }
`;

export default Chart;
