export const termServiceId = 'term-of-service';

export const TermOfServiceIcon = ({ color = '#A5ACBA' }) => {
  return (
    <symbol id={termServiceId} viewBox="0 0 32 32">
      <path
        fill="none"
        stroke={color}
        strokeLinejoin="miter"
        strokeLinecap="butt"
        strokeMiterlimit="4"
        strokeWidth="4"
        d="M21.889 3.487h-11.778c-0.43 0-0.778 0.348-0.778 0.778 0 2.148-1.741 3.889-3.889 3.889h-0.556c-0.491 0-0.889 0.398-0.889 0.889v1.145c0 7.386 4.004 14.191 10.46 17.778l0.504 0.28c0.644 0.358 1.427 0.358 2.071 0l0.504-0.28c6.456-3.587 10.46-10.392 10.46-17.778v-1.145c0-0.491-0.398-0.889-0.889-0.889h-0.556c-2.148 0-3.889-1.741-3.889-3.889 0-0.43-0.348-0.778-0.778-0.778z"
      ></path>
    </symbol>
  );
};
