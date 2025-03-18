export const watermarkingId = 'sidemenu-insert-watermark';
export const WatermarkingIcon = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
      // fill="none" add color when use
      xmlns="http://www.w3.org/2000/svg"
      id={watermarkingId}
      fill="none"
    >
      <g id={watermarkingId}>
        <path
          d="M12.5 8.33333L9.46129 11.372C9.29858 11.5348 9.03476 11.5348 8.87204 11.372L7.5 10M6.31944 2.5H13.6806C13.949 2.5 14.1667 2.71764 14.1667 2.98611C14.1667 4.32847 15.2549 5.41667 16.5972 5.41667H16.9444C17.2513 5.41667 17.5 5.6654 17.5 5.97222V6.68772C17.5 11.3038 14.9974 15.557 10.9622 17.7988L10.647 17.9739C10.2446 18.1974 9.75536 18.1974 9.35296 17.9739L9.03777 17.7988C5.00261 15.557 2.5 11.3038 2.5 6.68772V5.97222C2.5 5.6654 2.74873 5.41667 3.05556 5.41667H3.40278C4.74514 5.41667 5.83333 4.32847 5.83333 2.98611C5.83333 2.71764 6.05097 2.5 6.31944 2.5Z"
          stroke="inherit"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
