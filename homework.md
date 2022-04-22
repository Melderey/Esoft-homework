### Создать таблицы с занятия

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  login VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL
);
 
CREATE TABLE games(
  id SERIAL PRIMARY KEY,
  player_one_id INTEGER NOT NULL,
  player_two_id INTEGER NOT NULL,
  RESULT VARCHAR NULL
);
 
CREATE TABLE turns(
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL,
  "order" INTEGER NOT NULL,
  POSITION VARCHAR NULL
);

### Добавить внешние ключи, которые имеются в модели

ALTER TABLE games
ADD FOREIGN KEY (player_one_id) REFERENCES users (id);

ALTER TABLE games
ADD FOREIGN KEY (player_two_id) REFERENCES users (id);

ALTER TABLE turns
ADD FOREIGN KEY (game_id) REFERENCES games (id);

### Заполнить таблицы данными (минимум 5 пользователей, минимум 5 игр)

INSERT INTO users (login, name)
VALUES
  ('login_player_1', 'name_AAA'),
  ('login_player_2', 'name_BBB'),
  ('login_player_3', 'name_CCC'),
  ('login_player_4', 'name_DDD'),
  ('login_player_5', 'name_EEE');

INSERT INTO games (player_one_id, player_two_id, RESULT)
VALUES
  (1, 2, 'won'),
  (2, 3, 'lose'),
  (3, 4, 'draw'),
  (5, 2, 'won'),
  (1, 2, 'lose');

### Переделать таблицу turns так, чтобы избавиться от id хода

DROP TABLE turns;

CREATE TABLE turns(
  game_id INTEGER NOT NULL,
  "order" INTEGER NOT NULL,
  PRIMARY KEY (game_id, "order"),
  POSITION VARCHAR NULL
);

### Написать запрос, который бы собирал информацию о количестве побед/поражений/ничьих пользователя
### Написать запрос, который бы собирал полную статистику игр пользователя
### Написать запрос, который бы выводил топ-5 игроков по соотношению побед/поражений/ничьих


