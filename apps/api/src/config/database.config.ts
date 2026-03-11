type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
};

type RedisConfig = {
  host: string;
  port: number;
};

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: parseNumber(process.env.DB_PORT, 3307),
  user: process.env.DB_USER ?? 'bragbank',
  password: process.env.DB_PASSWORD ?? 'bragbank',
  name: process.env.DB_NAME ?? 'bragbank'
};

export const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST ?? 'localhost',
  port: parseNumber(process.env.REDIS_PORT, 16379)
};
