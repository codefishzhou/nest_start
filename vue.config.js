/* eslint-disable prettier/prettier */
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/': {
        target: 'http://localhost:3050', // 要跨域的域名
        changeOrigin: true, // 是否开启跨域
      },
    },
  },
};
