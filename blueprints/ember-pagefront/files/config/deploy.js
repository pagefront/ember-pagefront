module.exports = {
  production: {
    store: {
      type: 'pagefront',
      key: process.env.PAGEFRONT_KEY,
      app: '<%= app %>'
    },
    assets: {
      type: 'pagefront',
      key: process.env.PAGEFRONT_KEY,
      app: '<%= app %>'
    }
  }
};
