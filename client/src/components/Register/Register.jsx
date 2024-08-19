import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterUserMutation } from '../../features/users/userSlice';
function Register() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [inputState, setInputState] = useState({
    username: '',
    password: '',
    email: ''
  });

  const navigate = useNavigate();
  const { username, password, email } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(inputState);
      toast.success('Register successful!');
      navigate('/login');
      setInputState({
        email: '',
        password: '',
        username: ''
      });
    } catch (err) {
      console.error('Registration failed', err);
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
          <h2>Register</h2>
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
          <div className='input-control'>
            <input value={email} type='text' name={'email'} placeholder={'Email'} onChange={handleInput('email')} />
          </div>

          <div className='submit-btn'>
            <Button
              name={'Register'}
              bPad={'.5rem 2rem'}
              bRad={'10px'}
              bg={'var(--color-accent'}
              isLoading={isLoading}
              color={'#fff'}
            />
          </div>
          <p>
            Already Have an account ?,
            <Link to='/login'>Login</Link>
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
    padding: 5rem 4rem;
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
export default Register;
