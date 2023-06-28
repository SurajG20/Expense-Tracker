import { useContext } from 'react';
import './transactions.css';
import { GlobalContext } from '../../store/GlobalState';
import Transaction from './Transaction';

const TransacionsList = () => {
  const { transactions } = useContext(GlobalContext);
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => {
          return <Transaction key={transaction.id} transaction={transaction} />;
        })}
      </ul>
    </>
  );
};
export default TransacionsList;
