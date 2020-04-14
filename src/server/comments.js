import { connectDB } from "./connect-db";

async function getComments(taskId){
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
      return {...comment, commenter: comment.commenter[0].name};
    });
  } catch (error) {
    console.error('[comments]', error);
  }
    

  return {
    comments
  }
}

export const commentsRoute = app => {
  app.get('/comments/:taskId', async (req, res) => {
    let taskId = req.params.taskId;

    let comments = await getComments(taskId);

    res.send(comments);
  });
}