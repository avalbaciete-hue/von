import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class MembershipTypesService {
  constructor(private db: DatabaseService) {}
  private pool = () => this.db.getPool();

  async create(data: { type_name: string; price: number; duration_months: number }) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO membership_types (type_name, price, duration_months) VALUES (?, ?, ?)',
      [data.type_name, data.price, data.duration_months],
    );
    return this.findOne(result.insertId);
  }

  async findAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>('SELECT * FROM membership_types');
    return rows;
  }

  async findOne(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM membership_types WHERE type_id = ?',
      [id],
    );
    if (!rows[0]) throw new NotFoundException(`Membership type #${id} not found`);
    return rows[0];
  }

  async update(id: number, data: { type_name?: string; price?: number; duration_months?: number }) {
    await this.findOne(id);
    const fields: string[] = [];
    const values: any[] = [];

    if (data.type_name !== undefined) { fields.push('type_name = ?'); values.push(data.type_name); }
    if (data.price !== undefined) { fields.push('price = ?'); values.push(data.price); }
    if (data.duration_months !== undefined) { fields.push('duration_months = ?'); values.push(data.duration_months); }

    if (fields.length === 0) return this.findOne(id);

    values.push(id);
    await this.pool().execute(`UPDATE membership_types SET ${fields.join(', ')} WHERE type_id = ?`, values);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.pool().execute('DELETE FROM membership_types WHERE type_id = ?', [id]);
    return { message: `Membership type #${id} deleted successfully` };
  }
}