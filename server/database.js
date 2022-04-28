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
    console.log("Database Connected");

    await this.init();
  }
  
  async init() {
    const queryText = `
      CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      username VARCHAR(20) UNIQUE NOT NULL,
      pp_path VARCHAR(100) UNIQUE,
      created_on TIMESTAMP NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS posts (
      post_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      picture_path VARCHAR(100) UNIQUE NOT NULL,
      description VARCHAR(1000),
      tag VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS comments (
      comment_id SERIAL PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL,
      comment VARCHAR(500) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS likes (
      like_id SERIAL PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL
    );
    `;

    await this.client.query(queryText);

    console.log("Database Initialized");

    return;
  }

  /**
   * 
   */
  async generalQuery(query_string, values_arr) {
    const result = await this.client.query(query_string, values_arr);
    return result;
  }

  async close() {
    await this.client.release();
  }
}