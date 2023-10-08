import styled from 'styled-components';
import avatar from '../../assets/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
function Navigation({ active, setActive }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);
  const handleInput = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <NavStyled>
      <div className='user-con'>
        <img src={avatar} alt='' />
        <div className='text'>
          <h2>{user?.username}</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className='menu-items'>
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? 'active' : ''}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className='bottom-nav'>
        <Button
          onClick={handleInput}
          name={'SignOut'}
          icon={signout}
          bPad={'.3rem .6rem'}
          bRad={'20px'}
          bg={'var(--color-gray'}
          color={'lightcoral'}
        />
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 280px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  backdrop-filter: blur(4.5px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      font-size: medium;
      text-transform: capitalize;
      color: rgba(34, 34, 96, 1);
    }
    p {
      font-size: medium;
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 400;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      span {
        font-size: 1.1rem;
      }
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.1rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }
  .bottom-nav {
    font-size: medium;
  }
  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
