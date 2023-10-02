import { useState } from 'react';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Incomes from './components/Income/Income';
import Expenses from './components/Expenses/Expenses';

function App() {
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
    <AppStyled className='App'>
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: linear-gradient(to right, #26a0da, #314755);
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

export default App;
