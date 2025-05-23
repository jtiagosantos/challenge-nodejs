/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Connection } from 'mysql';

export const readPeople = async (connection: Connection) => {
  const people = (await new Promise((resolve, reject) => {
    connection.query('SELECT * FROM people', function (error, results) {
      if (error) reject(error);
      resolve(results);
    });
  })) as Array<{ id: number; name: string }>;

  return people;
};
