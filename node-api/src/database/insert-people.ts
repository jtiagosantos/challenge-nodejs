import { Connection } from 'mysql';

export const insertPeople = (connection: Connection, { name }: { name: string }) => {
  const sql = `INSERT INTO people(name) values('${name}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return;
    }
    console.log('Data inserted successfully: ', result);
  });
};
