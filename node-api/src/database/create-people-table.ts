import { Connection } from 'mysql';

export const createPeopleTable = (connection: Connection) => {
  return new Promise((resolve, reject) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `;

    connection.query(sql, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
