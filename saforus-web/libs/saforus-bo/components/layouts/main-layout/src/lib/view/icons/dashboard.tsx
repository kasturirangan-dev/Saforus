export const dashboardIconId = 'sidemenu-dasbhoard';
export const DashboardIcon = ({ color = 'var(--base-white)' }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id={dashboardIconId}
    >
      <g id={dashboardIconId}>
        <g id="Icon">
          <path
            d="M10 22.0002C14.2503 22.0002 17.7265 18.6856 17.9846 14.5003C18.0016 14.2246 17.7761 14.0002 17.5 14.0002H10.5C10.2239 14.0002 10 13.7763 10 13.5002V6.50017C10 6.22403 9.77553 5.99855 9.49991 6.01555C5.31459 6.27369 2 9.74985 2 14.0002C2 18.4185 5.58172 22.0002 10 22.0002Z"
            stroke={color}
            strokeWidth="2"
          />
          <path
            d="M21.9846 9.50009C21.7367 5.48015 18.52 2.26349 14.5001 2.01555C14.2245 1.99855 14 2.22403 14 2.50017V9.50018C14 9.77632 14.2239 10.0002 14.5 10.0002L21.5 10.0002C21.7761 10.0002 22.0016 9.7757 21.9846 9.50009Z"
            stroke={color}
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
};
