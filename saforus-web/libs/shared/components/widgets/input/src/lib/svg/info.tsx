import { InlineSvg } from '@web-workspace/shared/components/widgets/icon';

export const SvgInfo = () => {
  const svgContent2 = (
    <path
      id="Icon"
      d="M12 17V11M12 8V7.99M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
      stroke="#5F6D7E"
      strokeWidth="1.67"
      strokeLinecap="round"
    />
  );

  return (
    <InlineSvg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {svgContent2}
    </InlineSvg>
  );
};
