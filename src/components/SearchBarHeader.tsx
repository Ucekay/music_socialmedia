import { BlurView } from 'expo-blur';
import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack/lib/typescript/src/types';
import type { ParamListBase, Route } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeaderTitle } from '@react-navigation/elements';
import { useTheme } from '../contexts/ColorThemeContext';
import SearchBar from './SearchBar';

type SearchBarHeaderProps = {
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>;
  route: Route<string>;
  options: NativeStackNavigationOptions;
  back?: { title: string } | undefined;
};

const SearchBarHeader = ({
  navigation,
  route,
  options,
  back,
}: SearchBarHeaderProps) => {
  const insetsTop = useSafeAreaInsets().top;

  return (
    <BlurView
      tint='systemUltraThinMaterial'
      intensity={100}
      style={{
        height: 44 + insetsTop,
        paddingTop: insetsTop,
        paddingHorizontal: 16,
      }}
    >
      <SearchBar
        ref={options.headerSearchBarOptions?.ref}
        onFocus={options.headerSearchBarOptions?.onFocus}
        onSearchButtonPress={
          options.headerSearchBarOptions?.onSearchButtonPress
        }
        onCancelButtonPress={
          options.headerSearchBarOptions?.onCancelButtonPress
        }
        canBack={back !== undefined}
        placeholder='検索'
      />
    </BlurView>
  );
};

export default SearchBarHeader;
