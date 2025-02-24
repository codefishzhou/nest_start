
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

export const log4configuration = () => ({
  // ... 其他配置 ...
  log4js: {
    appenders: {
      out: { type: 'stdout' },
      file: {
        type: 'dateFile',
        filename: 'logs/application',
        pattern: 'yyyy-MM-dd.log',
        alwaysIncludePattern: true,
      },
    },
    categories: {
      default: { appenders: ['out', 'file'], level: 'info' },
    },
  },
});
