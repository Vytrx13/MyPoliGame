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

export default function HeaderButton({ children, to, onClick }) {
  // If 'to' prop is provided, render a Link wrapping the styled button
  if (to) {
    return (
      <li>
        <StyledLink to={to}>
          {/* Pass button styling via className or keep StyledButton */}
          <StyledButton as="span"> {/* Render button as span for semantics inside link */}
             {children}
          </StyledButton>
        </StyledLink>
      </li>
    );
  }

  // If 'onClick' prop is provided, render a regular button
  return (
    <li>
      <StyledButton onClick={onClick}>
        {children}
      </StyledButton>
    </li>
  );
}