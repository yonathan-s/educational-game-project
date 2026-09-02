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
    points INT NOT NULL DEFAULT 0,
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
    points INT NOT NULL DEFAULT 100,
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


-- Insert Users
INSERT INTO users (username, password_hash, points)
VALUES
    ('ashley', 'test_hash_123', 0);

-- Insert Levels
INSERT INTO levels (level_number, level_name)
VALUES
    (1, 'Ancient History'),
    (2, 'Medieval History');

-- Insert Stages
INSERT INTO stages (level_id, stage_number, stage_name, points)
VALUES 
    -- Ancient History
    (1, 1, 'Early Civilisations', 100),
    (1, 2, 'Ancient Egypt', 100),
    (1, 3, 'Ancient Greece', 100),
    (1, 4, 'Ancient Rome', 200),

    -- Medieval History
    (2, 1, 'Early Medieval Period', 100),
    (2, 2, 'Norman England', 100),
    (2, 3, 'Medieval Europe', 100),
    (2, 4, 'Late Middle Ages', 200);

-- Insert Questions
INSERT INTO questions (stage_id, question_text)
VALUES 
    -- Level 1 - Stage 1-4
    (1, 'Which civilisation is credited with developing cuneiform?'),
    (2, 'Which river was central to the devlopment of Ancient Egypt?'),
    (3, 'Which Greek city-state was famous for its military society?'),
    (4, 'Who was assassinated on the Ides of March in 44 BC?'),
    --Level 2 - Stage 1-4
    (5, 'Which empire was centred around Constantinople during the medieval period?'),
    (6, 'Who led the Norman conquest of England in 1066?'),
    (7, 'What document was sealed by King John in 1215?'),
    (8, 'Which event is traditionally regarded as marking the end of the Middle Ages in England?');

-- Insert Answers
INSERT INTO answers (question_id, answer_text, is_correct)
VALUES 
    -- Question 1
    (1, 'The Sumerians', TRUE),
    (1, 'The Romans', FALSE),
    (1, 'The Vikings', FALSE),
    (1, 'The Aztecs', FALSE),
    -- Question 2
    (2, 'The Nile', TRUE),
    (2, 'The Thames', FALSE),
    (2, 'The Danube', FALSE),
    (2, 'The Amazon', FALSE),
    -- Question 3
    (3, 'Sparta', TRUE),
    (3, 'Athens', FALSE),
    (3, 'Corinth', FALSE),
    (3, 'Thebes', FALSE),
    -- Question 4
    (4, 'Julius Caesar', TRUE),
    (4, 'Augustus', FALSE),
    (4, 'Nero', FALSE),
    (4, 'Hadrian', FALSE),
    -- Question 5
    (5, 'The Byzantine Empire', TRUE),
    (5, 'The Ottoman Empire', FALSE),
    (5, 'The Frankish Empire', FALSE),
    (5, 'The Mongol Empire', FALSE),
    -- Question 6
    (6, 'William the Conqueror', TRUE),
    (6, 'Richard the Lionheart', FALSE),
    (6, 'Henry VIII', FALSE),
    (6, 'Alfred the Great', FALSE),
    --Question 7
    (7, 'Magna Carta', TRUE),
    (7, 'The Doomsday Book', FALSE),
    (7, 'The Treaty of Verdun', FALSE),
    (7, 'The Bayeux Tapestry', FALSE),
    -- Question 8
    (8, 'The Battle of Bosworth Field', TRUE),
    (8, 'The Battle of Hastings', FALSE),
    (8, 'The Battle of Agincourt', FALSE),
    (8, 'The Battle of Bannockburn', FALSE);

-- Insert Trophies
INSERT INTO trophies (level_id, trophy_name, description)
VALUES 
    (1, 'Ancient History Master', 'Completed the Ancient History era'),
    (2, 'Medieval History Master', 'Completed the Medieval History era');

-- Insert user progress
INSERT INTO user_progress (user_id, level_id, current_stage_id)
VALUES 
    (1, 1, 1);