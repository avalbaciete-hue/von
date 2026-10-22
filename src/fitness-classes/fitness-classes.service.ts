import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

@Injectable()
export class FitnessClassesService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async create(body: { class_name: string; description: string; capacity: number; trainer_id: number }) {
    const [result] = await this.pool().execute<ResultSetHeader>(
      'INSERT INTO fitness_classes (class_name, description, capacity, trainer_id) VALUES (?, ?, ?, ?)',
      [body.class_name, body.description, body.capacity, body.trainer_id],
    );
    return { class_id: result.insertId, ...body };
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>('SELECT * FROM fitness_classes');
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM fitness_classes WHERE class_id = ?',
      [id],
    );
    return rows[0];
  }

  async update(id: number, body: any) {
    await this.pool().execute(
      `UPDATE fitness_classes SET 
        class_name = COALESCE(?, class_name),
        description = COALESCE(?, description),
        capacity = COALESCE(?, capacity),
        trainer_id = COALESCE(?, trainer_id)
      WHERE class_id = ?`,
      [
        body.class_name ?? null,
        body.description ?? null,
        body.capacity ?? null,
        body.trainer_id ?? null,
        id,
      ],
    );
    return this.findById(id);
  }

  async remove(id: number) {
    const [res] = await this.pool().execute<ResultSetHeader>(
      'DELETE FROM fitness_classes WHERE class_id = ?',
      [id],
    );
    return res.affectedRows > 0;
  }
}