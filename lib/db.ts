import { sql } from '@vercel/postgres';

export async function createNote({ title, content, userEmail }: { 
  title: string; 
  content: string; 
  userEmail: string; 
}) {
  const result = await sql`
    INSERT INTO notes (title, content, user_email, created_at, updated_at)
    VALUES (${title}, ${content}, ${userEmail}, NOW(), NOW())
    RETURNING *
  `;
  return result.rows[0];
}

export async function getNotes(userEmail: string) {
  const result = await sql`
    SELECT * FROM notes 
    WHERE user_email = ${userEmail}
    ORDER BY updated_at DESC
  `;
  return result.rows;
}

export async function updateNote({ id, title, content }: { 
  id: string; 
  title: string; 
  content: string; 
}) {
  const result = await sql`
    UPDATE notes 
    SET title = ${title}, content = ${content}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return result.rows[0];
}

export async function deleteNote(id: string) {
  await sql`DELETE FROM notes WHERE id = ${id}`;
} 