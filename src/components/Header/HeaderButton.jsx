
import { styled } from 'styled-components';

const Button = styled.button`
    background-color: white;
    color: #3586ff;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #8d06e7;
    color: white;
  }
`

export default function HeaderButton({ children }) {

  return (
    <li>
      <Button>
        {children}
      </Button>
    </li>
  );
}
