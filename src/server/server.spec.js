import { addNewTask, updateTask } from './server';

(async function testDB(){
  await addNewTask({
    id: 'xxx123',
    name: 'mytask'
  });
  
  await updateTask({
    id:'xxx123',
    name: 'My Task Updated!!',
    group: 'G1',
    owner: 'U4',
    isComplete: false
  });
})();


