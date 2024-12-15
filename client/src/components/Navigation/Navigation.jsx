import styled from "styled-components";
import { HamburgerIcon, signout } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { clearAuth, getAuth } from "../../utils/requestMethods";
import { useState, useEffect } from "react";

function Navigation({ active, setActive }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(getAuth());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentUser = getAuth();
    if (!currentUser) {
      navigate("/login");
    }
    setUser(currentUser);
  }, [navigate]);

  const handleSignOut = () => {
    clearAuth();
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (id) => {
    setActive(id);
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <>
      <NavStyled isOpen={isOpen}>
        <UserProfile>
          <div className="avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${
                user?.username || user?.email
              }&background=random&bold=true&size=128`}
              alt="User avatar"
              className="avatar-img"
            />
          </div>
          <div className="user-info">
            <h2>{user?.username || user?.email}</h2>
            <p>{user?.email}</p>
          </div>
        </UserProfile>
        <ul className="menu-items">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
        <div className="bottom-nav">
          <Button
            onClick={handleSignOut}
            name={"Sign Out"}
            icon={signout}
            bPad={".8rem 1.6rem"}
            bRad={"30px"}
            bg={"var(--color-gray"}
            color={"lightcoral"}
          />
        </div>
      </NavStyled>
      <Hamburger>
        <Button
          onClick={toggleMenu}
          bPad={".3rem .6rem"}
          bRad={"20px"}
          bg={"var(--color-gray"}
          color={"#222260"}
          icon={HamburgerIcon}
        />
      </Hamburger>
    </>
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
  position: relative;

  @media (max-width: 768px) {
    position: fixed;
    left: ${(props) => (props.isOpen ? "0" : "-100%")};
    top: 0;
    height: 100vh;
    z-index: 20;
    transition: left 0.3s ease;
    padding: 1rem;
    width: 240px;
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 1rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      color: rgba(34, 34, 96, 0.6);
      padding: 0.5rem 1rem;
      border-radius: 8px;

      &:hover {
        color: rgba(34, 34, 96, 0.9);
        background: rgba(34, 34, 96, 0.05);
      }

      span {
        font-size: 1.1rem;
        @media (max-width: 768px) {
          font-size: 0.9rem;
        }
      }
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.1rem;
        transition: all 0.3s ease;
      }
    }
  }

  .bottom-nav {
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    background: rgba(34, 34, 96, 0.08);
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
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

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-info {
    text-align: center;

    h2 {
      font-size: 1.2rem;
      text-transform: capitalize;
      font-weight: 600;
      color: rgba(34, 34, 96, 0.9);
      margin-bottom: 0.3rem;

      @media (max-width: 768px) {
        font-size: 1.2rem;
      }
    }

    p {
      font-size: 0.9rem;
      color: rgba(34, 34, 96, 0.6);

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 20px;
  width: 40px;
  height: 40px;
  left: 20px;
  z-index: 50;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export default Navigation;
