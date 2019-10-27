module.exports = {
  name: 'climathon-ma',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/climathon-ma',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
