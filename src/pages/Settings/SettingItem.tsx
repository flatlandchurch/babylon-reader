import { h } from 'preact';

type Option = {
  label: string;
  value: string;
};

type Props = {
  children: string;
} & ({
  type: 'toggle',
  onChange: (value: boolean) => void;
} | {
  type: 'select';
  options: Option[];
  onChange: (value: string) => void;
});

const SettingItem = ({ children, type, onChange }: Props) => (
  <div>
    <label>{children}</label>
    {type === 'toggle' ? <div /> : <div />}
  </div>
);

export default SettingItem;
