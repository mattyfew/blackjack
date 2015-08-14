DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS upvotes;
DROP TABLE IF EXISTS topic_img;
PRAGMA foreign_keys=ON;

CREATE TABLE threads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  subtitle VARCHAR(100),
  author_id TEXT,
  content TEXT,
  topic_img_url TEXT,
);

CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(12),
  user_avatar_url TEXT
);

CREATE TABLE comments (
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_author_id INTEGER,
  content TEXT,
  thread_id INTEGER,
  FOREIGN KEY (comment_author_id) REFERENCES users(user_id),
  FOREIGN KEY (thread_id) REFERENCES threads(id)
);

CREATE TABLE upvotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  thread_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (thread_id) REFERENCES threads(id)
);
