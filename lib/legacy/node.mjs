import globals from 'globals'

export default [{
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },

  rules: {
    'global-require': [2],
    'handle-callback-err': [2],
    'no-mixed-requires': [2],
    'no-new-require': [2],
    'no-path-concat': [2],
  },
}]
