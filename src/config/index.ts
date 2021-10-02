import { join } from 'path'; // Para captura todas as entidades de forma automativa

export default () => ({
  bankOptions: {
    type: 'postgres',
    host: process.env.DB_SERVER_HOST,
    port: Number(process.env.DB_SERVER_PORT),
    username: process.env.DB_SERVER_USERNAME,
    password: process.env.DB_SERVER_PASSWORD,
    database: process.env.DATABASE,
    entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
    JWT_SECRET: process.env.JWT__SECRET,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
    // entities: [UserSchema],
    // ! ALWAYS FALSE IN PROD
    autoLoadEntities: !(
      process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production'
    ),
    synchronize: !(
      process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production'
    ),
  },
});
