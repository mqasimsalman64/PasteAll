const Button = ({ name, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(); // ✅ just trigger the callback passed from App.jsx
  };

  return (
    <button onClick={handleClick} className="createpaste">
      {name}
    </button>
  );
};

export default Button;
