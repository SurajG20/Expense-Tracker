import { useState } from "react";
import { z } from "zod";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import { addExpense } from "../../features/expenses/expenseSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const expenseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(255, "Title must be at most 255 characters"),
  amount: z.number().positive("Amount must be a positive number"),
  date: z.date(),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters long")
    .max(255, "Category must be at most 255 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  type: z.literal("expense"),
});

function ExpenseForm() {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: new Date(),
    category: "",
    description: "",
    type: "expense",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    const value =
      name === "amount"
        ? e.target.value === ""
          ? ""
          : parseFloat(e.target.value)
        : e.target.value;

    setInputState({ ...inputState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = expenseSchema.parse({
        title,
        amount: parseFloat(amount),
        date,
        category,
        description,
        type: "expense",
      });

      await dispatch(addExpense(validatedData)).unwrap();
      setInputState({
        title: "",
        amount: "",
        date: new Date(),
        category: "",
        description: "",
        type: "expense",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Expense title"
          onChange={handleInput("title")}
          required
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="number"
          name={"amount"}
          placeholder={"Expense amount"}
          onChange={handleInput("amount")}
          required
          min="0"
          step="0.01"
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter a date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(selectedDate) => {
            setInputState({ ...inputState, date: selectedDate });
          }}
          required
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="education">Education</option>
          <option value="groceries">Groceries</option>
          <option value="health">Health</option>
          <option value="subscriptions">Subscriptions</option>
          <option value="takeaways">Takeaways</option>
          <option value="clothing">Clothing</option>
          <option value="travelling">Travelling</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Description"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput("description")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={"Add Expense"}
          icon={plus}
          bPad={".3rem .6rem"}
          bRad={"20px"}
          bg={"var(--color-accent"}
          color={"#fff"}
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
