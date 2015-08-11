module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: '<%= app %>',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
