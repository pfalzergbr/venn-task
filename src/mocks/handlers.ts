import { rest } from 'msw';

export const handlers = [
  rest.get(
    'https://venn-interviews-server.herokuapp.com/json',
    (req, res, ctx) => {
      'intercepted a get request!';
    },
  ),

  rest.post(
    'https://venn-interviews-server.herokuapp.com/json',
    (req, res, ctx) => {
      console.log('intercepted a post request!');
    },
  ),
];
