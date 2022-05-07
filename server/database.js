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

    await new Promise(r => setTimeout(r, 100));

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

    await new Promise(r => setTimeout(r, 100));

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

  /**
   * 
   */
     async getUsername(user_id) {
      const query = 'SELECT username FROM users WHERE user_id = $1 LIMIT 1;';
      const values = [user_id];
      const result = await this.client.query(query, values);
      return result;
    }
  
  /**
   * 
   */
  async getNumPosts() {
      const query = 'SELECT COUNT(*) FROM posts;';
      const result = await this.client.query(query);
      return result;
  }
  

  /**
   * 
   */
  async getPost(post_id) {
    const query = 'SELECT * FROM posts WHERE post_id = $1;';
    const values = [post_id];
    const result = await this.client.query(query, values);
    return result;
  }

  /**
   * 
   */
     async getComments(post_id) {
      const query = 'SELECT * FROM comments WHERE post_id = $1;';
      const values = [post_id];
      const result = await this.client.query(query, values);
      return result;
    }

  /**
   * 
   */
     async getLikes(post_id) {
      const query = 'SELECT COUNT(*) FROM likes WHERE post_id = $1;';
      const values = [post_id];
      const result = await this.client.query(query, values);
      return result;
    }

  /**
   * 
   */
    async liked(post_id, user_id) {
        const query = 'SELECT COUNT(*) FROM likes WHERE post_id = $1 AND user_id = $2;';
        const values = [post_id, user_id];
        const result = await this.client.query(query, values);
        return result;
    }

  /**
   * 
   */
  async addLike(post_id, user_id) {
        const query1 = 'SELECT COUNT(*) FROM likes WHERE post_id = $1 AND user_id = $2;';
        const values1 = [post_id, user_id];
        const result1 = await this.client.query(query1, values1);
        if(result1.rows[0].count == 0){
          const query = 'INSERT INTO likes (post_id, user_id) VALUES ($1, $2);';
          const values = [post_id, user_id];
          const result = await this.client.query(query, values);
          return result;
        }
        return;
  }
  
  /**
   * 
   */
  async addComment(post_id, user_id, comment) {
      const query = 'INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3);';
      const values = [post_id, user_id, comment];
      const result = await this.client.query(query, values);
      return result;
  }
  
  async addPost(user_id, picture_path, description, tag) {
      const query = 'INSERT INTO posts (user_id, picture_path, description, tag) VALUES ($1, $2, $3, $4);';
      const values = [user_id, picture_path, description, tag];
      const result = await this.client.query(query, values);
      return result;
  }

  async getFeed(tag) {
    const query = 'SELECT * FROM posts WHERE tag = $1;';
    const values = [tag];
    const result = await this.client.query(query, values);
    return result;
  }

  async close() {
    await this.client.release();
  }
}