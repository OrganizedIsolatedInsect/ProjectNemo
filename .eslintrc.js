module.exports = {
  root: true,
  extends: ['eslint:recommended', '@react-native-community'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'no-warning-comments': [
      'error',
      {terms: ['todo', 'fixme', 'devoii'], location: 'anywhere'},
    ],
  },
};
