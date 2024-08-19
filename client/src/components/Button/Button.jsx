import styled from 'styled-components';

function Button({ name, icon, onClick, bg, bPad, color, bRad, isLoading }) {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color
      }}
      disabled={isLoading}
      onClick={onClick}
    >
      {icon}
      {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  text-align: center;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`;

export default Button;
