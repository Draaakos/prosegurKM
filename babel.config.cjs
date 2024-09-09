module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current',
        chrome: '97',
        edge: '97',
        firefox: '95',
        safari: '15'
      }
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
