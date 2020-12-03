import styled from 'styled-components';

const Button = styled.button`
  font-family: 'Poppins';
  border: 0;
  padding: 10px 40px;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 30px;
  background-color: ${({ theme, disabled }) =>
    !disabled ? theme.colors.purple : theme.colors.greyDark};
  color: ${({ theme }) => theme.colors.white};
  ${({ disabled }) => !disabled && 'cursor: pointer;'}
  transition: background-color 0.3s ease;
  box-shadow: 1px 1px 1px;

  &:hover {
    background-color: ${({ theme, disabled }) =>
      !disabled ? theme.colors.purpleDark : theme.colors.greyDark};
  }
`;

export default Button;
