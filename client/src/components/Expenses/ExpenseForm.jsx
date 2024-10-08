import { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import { addExpense } from '../../features/expenses/expenseActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function ExpenseForm() {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addExpense(dispatch, inputState);
      setInputState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: ''
      });
    } catch (error) {
      toast.error('Failed to add expense');
    }
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      <div className='input-control'>
        <input type='text' value={title} name={'title'} placeholder='Expense title' onChange={handleInput('title')} />
      </div>
      <div className='input-control'>
        <input
          value={amount}
          type='number'
          name={'amount'}
          placeholder={'Expense amount'}
          onChange={handleInput('amount')}
        />
      </div>
      <div className='input-control'>
        <DatePicker
          id='date'
          placeholderText='Enter a date'
          selected={date}
          dateFormat='dd/MM/yyyy'
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>
      <div className='selects input-control'>
        <select required value={category} name='category' id='category' onChange={handleInput('category')}>
          <option value='' disabled>
            Select Option
          </option>
          <option value='education'>Education</option>
          <option value='groceries'>Groceries</option>
          <option value='health'>Health</option>
          <option value='subscriptions'>Subscriptions</option>
          <option value='takeaways'>Takeaways</option>
          <option value='clothing'>Clothing</option>
          <option value='travelling'>Travelling</option>
          <option value='other'>Other</option>
        </select>
      </div>
      <div className='input-control'>
        <textarea
          name='description'
          value={description}
          placeholder='Description'
          id='description'
          cols='30'
          rows='4'
          onChange={handleInput('description')}
        ></textarea>
      </div>
      <div className='submit-btn'>
        <Button
          name={'Add Expense'}
          icon={plus}
          bPad={'.3rem .6rem'}
          bRad={'20px'}
          bg={'var(--color-accent'}
          color={'#fff'}
        />
      </div>
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    border: none;
    padding: 0.5rem 0.8rem;
    border-radius: 5px;
    border: 1px solid #fff;
    background: transparent;
    resize: none;
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
export default ExpenseForm;
