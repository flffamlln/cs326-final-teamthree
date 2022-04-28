import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

export default class DatabaseConnection {
  constructor (dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false },
    });

    this.client = await this.pool.connect();
    console.log("Database Connected!");

    await this.init();
  }
  
  async init() {
    // const queryText = `
    // CREATE TABLE users (
    //   id int(11) NOT NULL AUTO_INCREMENT,
    //   email varchar(100) NOT NULL,
    //   password varchar(100) NOT NULL,
    //   first_name varchar(100) NOT NULL,
    //   last_name varchar(100) NOT NULL,
    //   PRIMARY KEY (id),
    //   UNIQUE KEY email_UNIQUE (email),
    //   UNIQUE KEY id_UNIQUE (id)
    // )`;

    // const result = await this.client.query(queryText);

    return true;
  }

  async close() {
    await this.client.release();
  }
}