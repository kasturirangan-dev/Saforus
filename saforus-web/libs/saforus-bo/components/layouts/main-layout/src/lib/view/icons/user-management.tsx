export const userManagementIconId = 'sidemenu-user-management';
export const UserManagementIcon = ({ color = 'var(--base-white)' }) => {
  return (
    <svg
      id={userManagementIconId}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15.8333 15.8333L16.6666 16.6667M9.99998 11.6667C12.3012 11.6667 14.1666 9.80119 14.1666 7.5C14.1666 5.19881 12.3012 3.33333 9.99998 3.33333C7.69879 3.33333 5.83331 5.19881 5.83331 7.5C5.83331 9.80119 7.69879 11.6667 9.99998 11.6667ZM9.99998 11.6667C6.31808 11.6667 3.33331 13.9052 3.33331 16.6667M15.8333 14.1667C15.8333 15.0871 15.0871 15.8333 14.1666 15.8333C13.2462 15.8333 12.5 15.0871 12.5 14.1667C12.5 13.2462 13.2462 12.5 14.1666 12.5C15.0871 12.5 15.8333 13.2462 15.8333 14.1667Z"
        stroke="#F9F9F9"
        strokeWidth="1.67"
      />
    </svg>
  );
};
