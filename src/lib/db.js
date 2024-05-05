// db.js
import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
   // プライマリーキーとインデックス付きプロパティ
  friends: '++id, name, age'
});