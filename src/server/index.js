'use strict';

import koa from 'koa';

const app = koa();
let a = 10;

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response
app.use(function *(){
  this.body = 'Hello World ' + a;
});

app.listen(3000);
console.log('Server listening on port 3000');