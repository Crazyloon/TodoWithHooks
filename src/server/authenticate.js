import { v4 as uuid } from 'uuid';
import md5 from "md5";
import { connectDB } from "./connect-db";
import { AUTHENTICATED } from '../store/mutations'

const authenticationTokens = [];

async function assembleUserState(user){
  let db = await connectDB();

  let tasks = await db.collection('tasks').find({owner: user.id}).toArray();
  let groups = await db.collection('groups').find({owner: user.id}).toArray();

  return {
    tasks,
    groups,
    session: {
      isAuthenticated: AUTHENTICATED,
      id: user.id,
      userName: user.name
    }
  }
}

export const authenticationRoute = app => {
  app.post('/authenticate', async (req, res) => {
    let {username, password} = req.body;
    let db = await connectDB();
    let collection = db.collection('users');

    let user = await collection.findOne({name: username});

    if(!user){
      return res.status(404).send('User Not Found');
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.passwordHash;

    if(!passwordCorrect){
      return res.status(500).send('Password incorrect');
    }

    let token = uuid();

    authenticationTokens.push({
      token,
      userId: user.id
    });

    let state = await assembleUserState(user);

    res.send({token, state});
  })
}