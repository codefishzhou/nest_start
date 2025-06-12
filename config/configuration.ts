export default () => ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_username,
  password: process.env.DB_password,
  database: 'nestai',
  synchronize: process.env.DB_synchronize, // 数据库同步, 生产环境需要设置为false - 开发环境设置为true
  autoLoadEntities: true, // 自动加载模块注册的实体
  driver: require('mysql2'),
});
