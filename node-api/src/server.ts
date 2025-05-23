/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { faker } from '@faker-js/faker';
import { createConnection } from './database/create-connection';
import { createPeopleTable } from './database/create-people-table';
import { insertPeople } from './database/insert-people';
import { readPeople } from './database/read-people';

const app = express();
const port = 3000;

const connection = createConnection();

createPeopleTable(connection).then(() => {
  insertPeople(connection, { name: faker.person.fullName() });
});

app.get('/', async (_, res) => {
  const people = await readPeople(connection);

  const title = ['<h1>', 'Full Cycle Rocks!', '</h1>'].join('');

  const list = [
    '<ul>',
    people.map((item) => `<li>${item.id} - ${item.name}</li>`).join(''),
    '</ul>',
  ].join('');

  const content = [title, list].join('');

  res.send(content);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
