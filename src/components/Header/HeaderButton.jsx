import './HeaderButton.css';

export default function HeaderButton({ children }) {

  return (
    <li>
      <button className="tab-button">
        {children}
      </button>
    </li>
  );
}
