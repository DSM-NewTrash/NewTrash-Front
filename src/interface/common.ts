export interface OptionArrType {
  option: string;
  value: string;
}

export interface DropDownProps {
  options: Array<OptionArrType>;
  value: string;
  onChangeValue: (value: string) => void;
}
