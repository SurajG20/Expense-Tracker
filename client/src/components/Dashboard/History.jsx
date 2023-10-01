import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

function History() {
  const { transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();

  return (
    <>
      <h2 style={{ fontSize: 'large', marginBottom: '1rem' }}>
        Recent History
      </h2>
      <HistoryStyled>
        {history.map((item) => {
          const { _id, title, amount, type } = item;
          return (
            <div key={_id} className='history-item'>
              <p
                style={{
                  color: type === 'expense' ? 'red' : 'var(--color-green)',
                }}
              >
                {title}
              </p>

              <p
                style={{
                  color: type === 'expense' ? 'red' : 'var(--color-green)',
                }}
              >
                {type === 'expense'
                  ? `-${amount <= 0 ? 0 : amount}`
                  : `+${amount <= 0 ? 0 : amount}`}
              </p>
            </div>
          );
        })}
      </HistoryStyled>
    </>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    padding: 0.8rem;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 0.9rem;
    }
  }
`;

export default History;
