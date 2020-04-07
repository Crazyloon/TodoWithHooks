import { MongoClient } from 'mongodb';
const url = `mongodb://localhost:27017/myorganizer`;
const db = null;

export async function connectDB(){
  if(db){ 
    return db;
  }
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info("God DB:", db);
  return db;
}

connectDB();