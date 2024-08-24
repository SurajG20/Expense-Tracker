import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../features/users/userSlice';
import { toast } from 'react-toastify';
import { setAuth } from '../../utils/requestMethods';

function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    email: '',
    password: ''
  });

  const { email, password } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(inputState).unwrap();
      setAuth(data);
      toast.success('Login successful!');
      navigate('/');
      setInputState({
        email: '',
        password: ''
      });
    } catch (err) {
      console.error('Login failed', err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error('Invalid Credentials');
      }
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
              value={email}
              id='email'
              autoComplete='email'
              name={'email'}
              placeholder='Email'
              onChange={handleInput('email')}
            />
          </div>
          <div className='input-control'>
            <input
              id='password'
              value={password}
              type='password'
              name={'password'}
              autoComplete='password'
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
              disabled={isLoading}
            />
          </div>

          <p>
            Do not have an account?, <Link to='/register'>Register</Link>
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
    box-shadow:
      rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    padding: 3rem 2.5rem;
    background-color: #edf1f3;
    border-radius: 10px;
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem;
  h2 {
    font-size: 2rem;
    color: var(--color-accent);
  }
  input {
    font-size: 1rem;
    outline: none;
    border: none;
    padding: 0.8rem 0.5rem;
    border-radius: 5px;
    border: 2px solid #898a9b;
    width: 100%;
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
