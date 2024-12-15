import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../utils/Icons";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import {
  deleteExpense,
  getExpenses,
} from "../../features/expenses/expenseSlice";
import { toast } from "react-toastify";

function ExpenseItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  indicatorColor,
  type,
}) {
  const dispatch = useDispatch();

  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return money;
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id)).then(() => {
      dispatch(getExpenses());
    });
  };

  return (
    <ExpenseItemStyled $indicator={indicatorColor}>
      <div className="icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment} {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={"0.3rem"}
              bRad={"50%"}
              color={"var(--primary-color"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              onClick={() => handleDelete(id)}
            />
          </div>
        </div>
      </div>
    </ExpenseItemStyled>
  );
}

const ExpenseItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;

  @media (max-width: 768px) {
    padding: 0.8rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
    }

    i {
      font-size: 1.2rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    h5 {
      font-size: 1rem;
      padding-left: 2rem;
      position: relative;

      @media (max-width: 768px) {
        font-size: 1.1rem;
        padding-left: 1.5rem;
      }

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.$indicator};

        @media (max-width: 768px) {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 0.8rem;
      }

      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        @media (max-width: 768px) {
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }

        p {
          font-size: medium;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;

          @media (max-width: 768px) {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
`;

export default ExpenseItem;
