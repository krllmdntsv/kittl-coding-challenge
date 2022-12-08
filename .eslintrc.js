const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },

  settings: {
    'import/resolver': {
      node: {
        paths: [
          'src',
          'src/stories',
        ],
      },
      alias: {
        map: [
          ['components', './stories/components'],
          ['utils', './stories/utils'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },

  parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    jsx: true,
    requireConfigFile: false,
  },

  extends: ['airbnb', 'airbnb/hooks'],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'react-hooks', 'compat', 'optimize-regex', 'storybook'],

  rules: {
    'import/prefer-default-export': OFF,
    'operator-linebreak': [ERROR, 'before'],
    'linebreak-style': OFF,
    'jsx-a11y/label-has-associated-control': OFF,
    'consistent-return': OFF,
    'react/state-in-constructor': OFF,
    'jsx-a11y/anchor-is-valid': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'class-methods-use-this': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/require-default-props': OFF,
    'react/jsx-sort-default-props': [ERROR, { ignoreCase: false }],
    'no-param-reassign': [ERROR, { props: false }],
    'id-length': [ERROR, { exceptions: ['_', 'i', 'j', 'x', 'y', 'z', 'a', 'b', 'e'] }],
    'indent': [ERROR, 2, {
      SwitchCase: 1,
      MemberExpression: 1,
      ignoredNodes: ['JSXElement'],
    }],
    'react/jsx-indent': [ERROR, 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-one-expression-per-line': [ERROR, { allow: 'single-child' }],
    'max-len': [WARN, { code: 150 }],
    'import/no-extraneous-dependencies': [WARN, { devDependencies: true }],
    'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx'] }],
    'quote-props': [ERROR, 'consistent'],
    'no-alert': ERROR,
    'import/extensions': [ERROR, { 'js': 'never', 'less': 'always' }],
    'no-plusplus': [ERROR, { 'allowForLoopAfterthoughts': true }],
    'camelcase': [ERROR, {
      allow: [
        'UNSAFE_componentDidMount',
        'UNSAFE_componentWillReceiveProps',
        'UNSAFE_componentWillUpdate',
      ],
    }],
    'new-cap': [ERROR, {
      'capIsNewExceptions': [
        'SortableContainer',
        'SortableElement',
        'List',
        'Map',
        'Set',
      ],
    }],
    'react/jsx-sort-props': [
      ERROR,
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: false,
      },
    ],
    'react/sort-comp': [
      ERROR,
      {
        order: [
          'static-methods',
          'lifecycle',
          'everything-else',
          '/^(get|set).+$/',
          '/^handle.+$/',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'constructor',
            'statics',
            'contextTypes',
            'childContextTypes',
            'state',
            'getDefaultProps',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'componentDidMount',
            'shouldComponentUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/sort-prop-types': [
      ERROR,
      {
        callbacksLast: true,
        ignoreCase: false,
        requiredFirst: true,
        sortShapeProp: true,
        noSortAlphabetically: false,
      },
    ],
    'object-curly-newline': [ERROR, {
      'ObjectPattern': { 'consistent': true },
      'ObjectExpression': { 'consistent': true },
    }],
    'import/order': [
      ERROR,
      {
        'alphabetize': { order: 'asc', caseInsensitive: false },
        'groups': ['external', 'internal'],
        'newlines-between': 'always',
        'pathGroupsExcludedImportTypes': [''],
        'pathGroups': [
          {
            pattern: '+(react|react-dom|react-router-dom|prop-types)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '+(components|utils|assets)/**',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
    'padding-line-between-statements': [ERROR,
      { blankLine: 'always', prev: '*', next: 'return' },

      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },

      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },

      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: 'if', next: '*' },

      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },

      { blankLine: 'never', prev: 'case', next: 'case' },
      { blankLine: 'never', prev: '*', next: ['break', 'default'] },
      { blankLine: 'any', prev: 'if', next: 'break' },
    ],
    'max-params': [ERROR, 3],
  },
  overrides: [],
};
