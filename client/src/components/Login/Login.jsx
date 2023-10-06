import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';
function Login() {
  const { login, user } = useGlobalContext();
  const [inputState, setInputState] = useState({
    username: '',
    password: '',
  });

  const { username, password } = inputState;
  const navigate = useNavigate();
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputState);
      setInputState({
        username: '',
        password: '',
      });
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <MainContainer>
      <div className='form-content'>
        <FormStyled onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className='input-control'>
            <input
              type='text'
              value={username}
              name={'username'}
              placeholder='Username'
              onChange={handleInput('username')}
            />
          </div>
          <div className='input-control'>
            <input
              value={password}
              type='password'
              name={'password'}
              placeholder={'Password'}
              onChange={handleInput('password')}
            />
          </div>

          <div className='submit-btn'>
            <Button
              name={'Login'}
              bPad={'.5rem 2rem'}
              bRad={'10px'}
              bg={'var(--color-accent)'}
              color={'#fff'}
            />
          </div>
          <p>
            Do Not Have An Account ?,
            <Link to='/register'>Register</Link>
          </p>
        </FormStyled>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  .form-content {
    border: 2px solid lightblue;
    box-shadow:
      rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    padding: 5rem 3rem;
    background-color: #edf1f3;
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  input {
    font-size: 1rem;
    outline: none;
    border: none;
    padding: 0.6rem 1.6rem;
    border-radius: 5px;
    border: 2px solid #898a9b;
    width: 100%;
    opacity: 0.8;
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
  p {
    font-size: small;
    a {
      font-weight: bold;
      cursor: pointer;
      color: darkblue;
    }
  }
`;
export default Login;
