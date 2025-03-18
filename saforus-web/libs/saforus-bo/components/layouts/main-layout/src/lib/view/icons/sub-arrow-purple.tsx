export const subArrowActiveId = 'submenu-arrow-purple';

export const SubArrowPurple = ({ color = 'var(--purple-200)' }) => {
  return (
    <symbol id={subArrowActiveId}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 -3 20 20"
        fill="none"
      >
        <path
          d="M5 6.66675V7.50008C5 8.88079 6.11929 10.0001 7.5 10.0001H15.8333M13.3333 6.66675L16.0774 9.41083C16.4028 9.73626 16.4028 10.2639 16.0774 10.5893L13.3333 13.3334"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </symbol>
  );
};