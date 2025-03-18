export interface GuideSectionProps {
  id?: string;
  label: string;
  description?: string | null;
  children: string | React.ReactNode;
  style?: React.CSSProperties;
  level?: 1 | 2 | 3;
  titleHeading?: boolean; // Use heading tags for titles to automatically include them in the menu
  linkCopy?: boolean;
}

export interface CollapseSectionProps extends GuideSectionProps {
  defaultExpand?: boolean;
  collapseStyle?: React.CSSProperties;
  maxContent?: number | string;
  cardAction?: React.ReactNode;
}
