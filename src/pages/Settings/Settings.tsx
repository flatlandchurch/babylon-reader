import { h } from 'preact';
import SettingItem from './SettingItem';

const Settings = () => {
  return (
    <div>
      <SettingItem type="select" onChange={}>Version</SettingItem>
      <SettingItem type="toggle" onChange={}>Show Verse Numbers</SettingItem>
      <SettingItem type="select" onChange={}>Divine Name</SettingItem>
    </div>
  )
};

export default Settings;
