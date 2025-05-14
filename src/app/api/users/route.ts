// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { getPool } from '@/utils/db';

export async function GET(                // R = Read one
  _req: Request,
  { params }: { params: { id: string } },
) {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM users WHERE id=?', [
    params.id,
  ]);
  if ((rows as any).length === 0)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json((rows as any)[0]);
}

export async function PUT(                // U = Update (replace)
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const pool = getPool();
  await pool.execute(
    `UPDATE users
     SET employee_number=?, email=?, password_hash=?, full_name=?, role=?, is_active=?
     WHERE id=?`,
    [
      body.employee_number,
      body.email,
      body.password_hash,
      body.full_name,
      body.role,
      body.is_active,
      params.id,
    ],
  );
  return NextResponse.json({ id: params.id });
}

export async function DELETE(             // D = Delete
  _req: Request,
  { params }: { params: { id: string } },
) {
  const pool = getPool();
  await pool.execute('DELETE FROM users WHERE id=?', [params.id]);
  return NextResponse.json({ id: params.id });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();     // whatever fields the client sends
  const pool = getPool();

  /* ----- build SET clause on the fly ----- */
  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(body)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0)
    return NextResponse.json(
      { error: 'No fields provided' },
      { status: 400 },
    );

  values.push(params.id);           // WHERE id = ?
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  try {
    await pool.execute(sql, values);
    return NextResponse.json({ id: params.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}


