const SelectIcon = ({ color = 'var(--gray-700)' }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8.33344L10.5893 12.7442C10.2638 13.0696 9.73618 13.0696 9.41074 12.7442L5 8.33344"
        stroke={color}
        strokeWidth="1.67"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SelectIcon;
