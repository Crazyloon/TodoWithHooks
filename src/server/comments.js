import { connectDB } from "./connect-db";

async function getComments(taskId) {
  let comments = [];
  try {
    let db = await connectDB();
    comments = await db.collection('comments').aggregate([
      {
        $match: {
          'task': taskId
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: 'id',
          as: 'commenter'
        }
      }
    ]).toArray();

    comments = comments.map(comment => {
      return { ...comment, commenter: comment.commenter[0].name };
    });
  } catch (error) {
    console.error('[comments]', error);
  }

  return { comments };
}

async function updateComment(comment) {
  const { id, owner, task, content, date } = comment;
  const db = await connectDB();
  const collection = db.collection('comments');

  try {
    return await collection.updateOne({ id },
      { $set: { owner, task, content, date } }
    );
  } catch (e) {
    console.log('[comments]', e);
  }
}

async function addComment(comment) {
  const db = await connectDB();
  const collection = db.collection('comments');

  try {
    return await collection.insertOne(comment);
  } catch (e) {
    console.log('[comments]', e);
  }
}

async function deleteComment(commentId) {
  const db = await connectDB();
  const collection = db.collection('comments');

  try {
    return await collection.deleteOne({ id: commentId });
  } catch (e) {
    console.log('[comments]', e);
  }
}

export const commentsRoutes = app => {
  app.get('/comments/:taskId', async (req, res) => {
    const taskId = req.params.taskId;

    try {
      const comments = await getComments(taskId);
      res.status(200).send(comments);
    } catch (e) {
      res.sendStatus(500);      
    }

  });

  app.put('/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const comment = req.body.comment;

    try {
      const result = await updateComment(comment);
      if (result.matchedCount && result.modifiedCount) {
        res.status(200).send();
      } else {
        res.sendStatus(500);
      }
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.post('/comments/new', async (req, res) => {
    let comment = req.body.comment;

    try {
      const result = await addComment(comment);
      if (result.insertedCount) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.delete('/comments/:commentId', async (req, res) => {
    let id = req.params.commentId;

    try {
      const result = await deleteComment(id);
      if (result){
        res.sendStatus(200);
      }
    } catch (e) {
      res.sendStatus(500);      
    }
  });
}