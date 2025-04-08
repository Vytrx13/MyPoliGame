import { styled } from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link

// Keep your existing styled button
const StyledButton = styled.button`
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
    text-decoration: none; /* Remove default link underline */
    display: inline-block; /* Ensure button layout */
    text-align: center;

  &:hover {
    background-color: #8d06e7;
    color: white;
  }
`;

// Optional: Style the Link component to remove default link styles if needed
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* Inherit color from button */

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

// Keep existing imports and StyledButton/StyledLink components

export default function HeaderButton({ children, to, onClick }) {
  if (to) {
    return (
      <li>
        <StyledLink to={to} className="nav-link">
          <StyledButton as="span">
            {children}
          </StyledButton>
        </StyledLink>
      </li>
    );
  }

  return (
    <li>
      <StyledButton onClick={onClick} className="nav-link">
        {children}
      </StyledButton>
    </li>
  );
}