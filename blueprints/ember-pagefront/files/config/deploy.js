module.exports = {
  production: {
    store: {
      type: 'pagefront-index',
      key: process.env.PAGEFRONT_KEY,
      app: '<%= app %>'
    },
    assets: {
      type: 'pagefront-assets',
      key: process.env.PAGEFRONT_KEY,
      app: '<%= app %>'
    }
  }
};
