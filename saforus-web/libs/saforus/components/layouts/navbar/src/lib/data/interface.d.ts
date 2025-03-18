export interface IHeader {
  title: string;
}

export interface IMenu {
  key: string,
  title: string;
  link: string;
  icon?: string;
  children?: IMenu[];
}
