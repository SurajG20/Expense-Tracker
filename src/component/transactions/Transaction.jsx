import React, { useContext } from 'react';
import './transactions.css';
import { GlobalContext } from '../../store/GlobalState';

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';
  return (
    <div>
      <li className={`${transaction.amount < 0 ? 'minus' : 'plus'}`}>
        {transaction.name}{' '}
        <span>{`${sign}$${Math.abs(transaction.amount)}`}</span>
        <button
          className="delete-btn"
          onClick={() => {
            deleteTransaction(transaction.id);
          }}
        >
          x
        </button>
      </li>
    </div>
  );
};
export default Transaction;
