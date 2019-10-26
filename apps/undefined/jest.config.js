module.exports = {
  name: 'undefined',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/undefined',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
