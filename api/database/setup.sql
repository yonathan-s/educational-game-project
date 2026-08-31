DROP TABLE IF EXISTS user_trophies;
DROP TABLE IF EXISTS trophies;
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS stages;
DROP TABLE IF EXISTS levels;
DROP TABLE IF EXISTS users;

-- Users
CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    PRIMARY KEY (id)
);

-- Levels
-- Each level represents a historical era
CREATE TABLE levels (
    id INT GENERATED ALWAYS AS IDENTITY,
    level_number INT NOT NULL UNIQUE,
    level_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- Stages
-- Each stage represents progression through a historical era
CREATE TABLE stages (
    id INT GENERATED ALWAYS AS IDENTITY,
    level_id INT NOT NULL,
    stage_number INT NOT NULL,
    stage_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (level_id) REFERENCES levels(id),
    UNIQUE (level_id, stage_number)
);

-- Questions
-- Each question belongs to a stage
CREATE TABLE questions (
    id INT GENERATED ALWAYS AS IDENTITY,
    stage_id INT NOT NULL,
    question_text TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (stage_id) REFERENCES stages(id)
);

-- Answers
-- Each question can have multiple answers
-- One answer should be marked as correct
CREATE TABLE answers (
    id INT GENERATED ALWAYS AS IDENTITY,
    question_id INT NOT NULL,
    answer_text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- User Progress
-- Tracks a users progress through each level
CREATE TABLE user_progress (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    level_id INT NOT NULL,
    current_stage_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (level_id) REFERENCES levels(id),
    FOREIGN KEY (current_stage_id) REFERENCES stages(id),
    UNIQUE (user_id, level_id)
);

-- Trophies
-- Each level can have a trophy associated with completing that level
CREATE TABLE trophies (
    id INT GENERATED ALWAYS AS IDENTITY,
    level_id INT NOT NULL,
    trophy_name VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (level_id) REFERENCES levels(id)
);

-- User trophies
-- Records which trophy each user has earned
CREATE TABLE user_trophies (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    trophy_id INT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (trophy_id) REFERENCES trophies(id),
    UNIQUE (user_id, trophy_id)
);
