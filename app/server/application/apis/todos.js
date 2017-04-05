/* @flow */
import { all, add } from '../../infrastructure/daos/TodosDAO';

export default (router: Object) => {
  router.get('/api/v1/todos', async (ctx: Object) => {
    ctx.body = await all();
  });
  router.post('/api/v1/todo', async (ctx: Object) => {
    const { text }: { text: string } = ctx.request.body;
    ctx.body = await add(text);
  });
};
