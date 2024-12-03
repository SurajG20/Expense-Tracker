import { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/users/userSlice";
import { toast } from "react-toastify";
import { setAuth } from "../../utils/requestMethods";

function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
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
      toast.success("Login successful!");
      navigate("/");
      setInputState({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Login failed", err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Invalid Credentials");
      }
    }
  };

  return (
    <MainContainer>
      <div className="form-content">
        <FormStyled onSubmit={handleSubmit}>
          <h1>Welcome Back!</h1>
          <p className="subtitle">Please enter your details to sign in</p>

          <div className="input-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              id="email"
              autoComplete="email"
              name={"email"}
              placeholder="Enter your email"
              onChange={handleInput("email")}
              required
            />
          </div>

          <div className="input-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              type="password"
              name={"password"}
              autoComplete="current-password"
              placeholder={"Enter your password"}
              onChange={handleInput("password")}
              required
            />
          </div>

          <div className="submit-btn">
            <Button
              name={isLoading ? "Signing in..." : "Sign In"}
              bPad={".8rem 2rem"}
              bRad={"30px"}
              bg={"var(--color-accent)"}
              color={"#fff"}
              disabled={isLoading}
            />
          </div>

          <p className="register-link">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
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
  background: linear-gradient(120deg, #f6f8fa 0%, #f0f4f7 100%);

  .form-content {
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
    padding: 3.5rem 3rem;
    background-color: white;
    border-radius: 16px;
    width: 100%;
    max-width: 420px;
    margin: 1rem;
  }
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h1 {
    font-size: 2.2rem;
    color: var(--color-accent);
    margin-bottom: 0;
    text-align: center;
  }

  .subtitle {
    text-align: center;
    color: #666;
    margin-top: -0.5rem;
    font-size: 1rem;
  }

  .input-control {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-weight: 500;
      color: #333;
      font-size: 0.95rem;
    }

    input {
      font-size: 1rem;
      outline: none;
      border: 1.5px solid #e0e0e0;
      padding: 1rem;
      border-radius: 8px;
      width: 100%;
      transition: all 0.2s ease;

      &:focus {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 2px rgba(var(--color-accent-rgb), 0.1);
      }

      &::placeholder {
        color: #aaa;
      }
    }
  }

  .submit-btn {
    margin-top: 0.5rem;

    button {
      width: 100%;
      font-weight: 600;
      font-size: 1.05rem;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: var(--color-green) !important;
        transform: translateY(-1px);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }

  .register-link {
    text-align: center;
    font-size: 0.95rem;
    color: #666;
    margin-top: 0.5rem;

    a {
      font-weight: 600;
      color: var(--color-accent);
      text-decoration: none;
      margin-left: 0.3rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Login;
