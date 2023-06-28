import React from 'react';
import './transactions.css';

const Transaction = ({ transaction }) => {
  return (
    <div>
      <li className="minus">
        {transaction.name} <span>-$400</span>
        <button className="delete-btn">x</button>
      </li>
    </div>
  );
};
export default Transaction;
