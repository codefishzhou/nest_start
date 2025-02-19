export default () => ({
  type: 'mysql',
  host: process.env.HOST,
  port: 3306,
  username: process.env.username,
  password: process.env.password,
  database: 'nestAi',
  synchronize: false, // 数据库同步, 生产环境需要设置为false - 开发环境设置为true
  autoLoadEntities: true, // 自动加载模块注册的实体
  driver: require('mysql2'),
});
