import { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalState';
const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  // TO GET THE TOTAL AMOUNT
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  return (
    <>
      <h4>Your Balance</h4>
      <h1>{total}</h1>
    </>
  );
};
export default Balance;
