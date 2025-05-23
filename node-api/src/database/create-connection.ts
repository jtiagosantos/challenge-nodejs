import mysql, { Connection } from 'mysql';

export const createConnection = (): Connection => {
  const dbConfig = {
    host: 'database',
    user: 'root',
    password: 'root',
    database: 'nodedb',
  };

  const connection = mysql.createConnection(dbConfig);

  return connection;
};
