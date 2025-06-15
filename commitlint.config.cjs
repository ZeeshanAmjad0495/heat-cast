module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'debug',
        'chore',
        'style',
        'refactor',
        'perf',
        'test',
        'revert',
        'build',
        'docs',
      ],
    ],
  },
};
