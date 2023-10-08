import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainLayout } from '../../styles/Layouts';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Dashboard/Dashboard';
import Incomes from '../Income/Income';
import Expenses from '../Expenses/Expenses';
import { getIncomes } from '../../features/incomes/incomeActions';
import { useDispatch, useSelector } from 'react-redux';
import { getExpense } from '../../features/expenses/expenseActions';
function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);
  useEffect(() => {
    if (user) {
      getIncomes(dispatch);
      getExpense(dispatch);
    }
  }, []);

  const [active, setActive] = useState(1);
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Incomes />;
      case 3:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <HomeContent>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </HomeContent>
  );
}

const HomeContent = styled.div`
  height: 100vh;
  background: linear-gradient(to right, #3dabf2, #314755);
  position: relative;
  main {
    height: 100%;
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    backdrop-filter: blur(4.5px);
    border-radius: 5px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Home;
