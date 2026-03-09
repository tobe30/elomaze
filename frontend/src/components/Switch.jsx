const Switch = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
        ${checked ? "bg-blue-500" : "bg-gray-200"}
      `}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200
          ${checked ? "translate-x-5" : "translate-x-1"}
        `}
      />
    </button>
  );
};

export default Switch;
