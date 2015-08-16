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
  author_id INTEGER,
  content TEXT,
  topic_img_url TEXT,
	FOREIGN KEY (author_id) REFERENCES users(user_id)
);

CREATE TABLE users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(20),
  user_avatar_url TEXT
);

CREATE TABLE comments (
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_author_id TEXT,
  content TEXT,
  thread_id INTEGER,
	img_url TEXT,
  FOREIGN KEY (thread_id) REFERENCES threads(id)
);

CREATE TABLE upvotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  thread_id INTEGER,
  FOREIGN KEY (thread_id) REFERENCES threads(id)
);
