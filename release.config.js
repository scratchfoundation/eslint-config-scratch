module.exports = {
  extends: 'scratch-semantic-release-config',
  branches: [
    {
      name: 'master',
      // default channel
    },
    {
      name: 'v15',
      prerelease: 'next',
      channel: 'next',
    },
  ],
}
