// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:import/recommended'],
  plugins: ['import', 'react-native-style-order'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'expo',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'expo-*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@react-navigation/*',
            group: 'builtin',
            position: 'before',
          },
        ],
        distinctGroup: false,
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'react-native-style-order/sort-style-props': [
      'warn',
      {
        order: 'predefined',
      },
    ],
    'no-unused-expressions': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'import/no-duplicates': 'off',
  },
};
