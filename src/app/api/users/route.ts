// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { getPool } from '@/utils/db';

export async function POST(req: Request) {        // C = Create
  const body = await req.json();
  const pool = getPool();

  const [result] = await pool.execute(
    `INSERT INTO users 
     (employee_number,email,password_hash,full_name,role,is_active)
     VALUES (?,?,?,?,?,?)`,
    [
      body.employee_number,
      body.email,
      body.password_hash,
      body.full_name,
      body.role,
      body.is_active,
    ],
  );

  return NextResponse.json({ id: (result as any).insertId }, { status: 201 });
}

export async function GET() {                     // R = Read (all)
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM users');
  return NextResponse.json(rows);                 // 200 by default
}
