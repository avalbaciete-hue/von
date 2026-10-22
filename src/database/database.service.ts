import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool!: mysql.Pool;

  onModuleInit() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'fitness_db',
      waitForConnections: true,
      connectionLimit: 10,
      ssl: process.env.DB_SSL === 'true' ? ({ rejectUnauthorized: false } as any) : undefined,
    });
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  getPool(): mysql.Pool {
    return this.pool;
  }
}