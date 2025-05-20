/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import mysql from 'mysql';
import { faker } from '@faker-js/faker';

const app = express();
const port = 3000;
const dbConfig = {
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const connection = mysql.createConnection(dbConfig);

const sql = `INSERT INTO people(name) values('${faker.person.fullName()}')`;

connection.query(sql, (err, result) => {
  if (err) {
    console.error('Error inserting data: ', err);
    return;
  }
  console.log('Data inserted successfully: ', result);
});

app.get('/', async (_, res) => {
  const people = (await new Promise((resolve, reject) => {
    connection.query('SELECT * FROM people', function (error, results) {
      if (error) reject(error);
      resolve(results);
    });
  })) as Array<{ id: number; name: string }>;

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
