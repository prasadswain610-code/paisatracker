// db.js – LowDB setup
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const adapter = new JSONFile(path.join(__dirname, 'db.json'));
export const db = new Low(adapter);
await db.read();
if (!db.data) {
  db.data = {
    users: [],
    expenses: [],
    savings: [],
    investments: [],
    budgets: [],
    notifications: []
  };
  await db.write();
}
