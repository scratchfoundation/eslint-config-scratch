module.exports = {
  extends: 'scratch-semantic-release-config',
  branches: [
    {
      name: 'master',
      // default channel
    },
    {
      name: 'v16',
      prerelease: 'next',
      channel: 'next',
    },
  ],
}
