import { useEffect, useState } from "react";
import styled from "styled-components";
import { MainLayout } from "../../styles/Layouts";
import Navigation from "../Navigation/Navigation";
import Dashboard from "../Dashboard/Dashboard";
import Incomes from "../Income/Income";
import Expenses from "../Expenses/Expenses";
import { getIncomes } from "../../features/incomes/incomeSlice";
import { useDispatch } from "react-redux";
import { getExpenses } from "../../features/expenses/expenseSlice";
import { getAuth } from "../../utils/requestMethods";

function Home() {
  const dispatch = useDispatch();
  const user = getAuth();

  useEffect(() => {
    if (user) {
      dispatch(getIncomes());
      dispatch(getExpenses());
    }
  });

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
  background-image: radial-gradient(
    circle 311px at 8.6% 27.9%,
    rgba(62, 147, 252, 0.57) 12.9%,
    rgba(239, 183, 192, 0.44) 91.2%
  );
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
