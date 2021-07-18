import { rest } from 'msw';
import { mockData } from './mockData';

export const handlers = [
  rest.get(
    'https://venn-interviews-server.herokuapp.com/json',
    (req, res, ctx) => {
      return res(ctx.json(mockData));
    },
  ),

  rest.post(
    'https://venn-interviews-server.herokuapp.com/json',
    (req, res, ctx) => {
      console.log('intercepted a post request!');
    },
  ),

  rest.options('*', (req, res, ctx) => {
    console.log('options request intercepted');
  }),
];
