// src/lib/api/users.ts
export interface UserPayload {
    employee_number: string | null;   // you can supply one later
    email: string;
    password_hash: string;
    full_name: string;
    role: 'employee' | 'admin' | 'hr_admin' | 'super_admin';
    is_active: 0 | 1;
  }
  
  export async function createUser(data: UserPayload) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Create failed: ${res.status}`);
    return res.json() as Promise<{ id: number }>;
  }

  export async function listUsers() {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error(`Lookup failed (${res.status})`);
    return res.json() as Promise<Array<{
      employee_number: string; email: string; full_name: string 
}>>;
  }
  
  export async function getUser(id: number) {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`Not found: ${res.status}`);
    return res.json();
  }
  
  export async function replaceUser(id: number, data: UserPayload) {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Replace failed: ${res.status}`);
    return res.json();
  }
  
  export async function patchUser(id: number, partial: Partial<UserPayload>) {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partial),
    });
    if (!res.ok) throw new Error(`Patch failed: ${res.status}`);
    return res.json();
  }
  
  export async function deleteUser(id: number) {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    return res.json();
  }
  