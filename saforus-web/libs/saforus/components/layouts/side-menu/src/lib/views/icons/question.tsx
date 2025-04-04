export const questionId = 'icon-question';

export const QuestionIcon = ({ color = 'var(--base-white)' }) => {
  return (
    <svg
      id={questionId}
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      // fill="none" add color when use
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="question">
        <path
          d="M12 18V18.01M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 11.8675 14.7202 13.4361 12.9899 13.8766C12.4547 14.0128 12 14.4477 12 15M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
