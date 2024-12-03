import styled from "styled-components";
import { getTransactionHistory } from "../../features/utilities/totalUtilities";
import { useSelector } from "react-redux";

function History() {
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expenses.expenses);

  const [...history] = getTransactionHistory(incomes, expenses);

  return (
    <HistoryContainer>
      <h2>Recent History</h2>
      <HistoryStyled>
        {history.length === 0 ? (
          <EmptyMessage>No transactions yet</EmptyMessage>
        ) : (
          history.map((item) => {
            const { _id, title, amount, type, date } = item;
            const isExpense = type === "expense";
            return (
              <div key={_id} className="history-item">
                <div className="transaction-info">
                  <p className={`title ${isExpense ? "expense" : "income"}`}>
                    {title}
                  </p>
                  <span className="date">{new Date(date).toLocaleDateString()}</span>
                </div>
                <p className={`amount ${isExpense ? "expense" : "income"}`}>
                  {isExpense ? "-₹" : "+₹"}
                  {amount <= 0 ? 0 : amount.toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </HistoryStyled>
    </HistoryContainer>
  );
}

const HistoryContainer = styled.div`
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--primary-color, #222260);
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  padding: 1rem;
  font-style: italic;
`;

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s ease;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

    &:hover {
      transform: translateY(-2px);
    }

    .transaction-info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .title {
      font-size: 1rem;
      font-weight: 500;
    }

    .date {
      font-size: 0.8rem;
      color: #666;
    }

    .amount {
      font-size: 1rem;
      font-weight: 600;
    }

    .expense {
      color: #e74c3c;
    }

    .income {
      color: #2ecc71;
    }
  }

  @media (max-width: 768px) {
    max-height: 250px;
    
    .history-item {
      padding: 0.8rem;
      
      .title {
        font-size: 0.9rem;
      }
      
      .amount {
        font-size: 0.9rem;
      }
    }
  }
`;

export default History;
