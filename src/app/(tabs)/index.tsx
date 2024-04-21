import { Redirect } from 'expo-router';

const TabIndex = (): JSX.Element => {
  return <Redirect href={'/(tabs)/articles'} />;
}

export default TabIndex;
