import React from 'react';
const ChooseStorageSvg: React.FC<{
  width?: number;
  height?: number;
  fill?: string;
}> = ({ width = 13, height = 16, fill = 'var(--gray-50)' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0002 3.33325C12.0002 4.43782 9.61235 5.33325 6.66683 5.33325C3.72131 5.33325 1.3335 4.43782 1.3335 3.33325M12.0002 3.33325C12.0002 2.22868 9.61235 1.33325 6.66683 1.33325C3.72131 1.33325 1.3335 2.22868 1.3335 3.33325M12.0002 3.33325V12.6666C12.0002 13.7712 9.61235 14.6666 6.66683 14.6666C3.72131 14.6666 1.3335 13.7712 1.3335 12.6666V3.33325M12.0002 7.99992C12.0002 9.10449 9.61235 9.99992 6.66683 9.99992C3.72131 9.99992 1.3335 9.10449 1.3335 7.99992"
        stroke={fill}
      />
    </svg>
  );
};

export default ChooseStorageSvg;
