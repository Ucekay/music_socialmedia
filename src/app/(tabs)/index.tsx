import { Redirect } from 'expo-router';

const TabIndex = (): JSX.Element => {
  return <Redirect href={'/(tabs)/home'} />;
};

export default TabIndex;
