import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

@Injectable()
export class TrainersService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async create(body: any) {
    console.log('Incoming Trainer Payload:', body);

    // Flexible key mapping & fallbacks to prevent mysql2 undefined bind errors
    const trainer_code = body.trainer_code ?? body.trainerCode ?? null;
    const trainer_name = body.trainer_name ?? body.trainerName ?? body.name ?? null;
    const specialization = body.specialization ?? null;
    const phone = body.phone ?? null;

    const [result] = await this.pool().execute<ResultSetHeader>(
      'INSERT INTO trainers (trainer_code, trainer_name, specialization, phone) VALUES (?, ?, ?, ?)',
      [trainer_code, trainer_name, specialization, phone],
    );

    return {
      trainer_id: result.insertId,
      trainer_code,
      trainer_name,
      specialization,
      phone,
    };
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>('SELECT * FROM trainers');
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM trainers WHERE trainer_id = ?',
      [id],
    );
    return rows[0];
  }

  async update(id: number, body: any) {
    const trainer_code = body.trainer_code ?? body.trainerCode ?? null;
    const trainer_name = body.trainer_name ?? body.trainerName ?? body.name ?? null;
    const specialization = body.specialization ?? null;
    const phone = body.phone ?? null;

    await this.pool().execute(
      `UPDATE trainers SET 
        trainer_code = COALESCE(?, trainer_code),
        trainer_name = COALESCE(?, trainer_name),
        specialization = COALESCE(?, specialization),
        phone = COALESCE(?, phone)
      WHERE trainer_id = ?`,
      [trainer_code, trainer_name, specialization, phone, id],
    );

    return this.findById(id);
  }

  async remove(id: number) {
    const [res] = await this.pool().execute<ResultSetHeader>(
      'DELETE FROM trainers WHERE trainer_id = ?',
      [id],
    );
    return res.affectedRows > 0;
  }
}