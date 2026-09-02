-- =========================================
-- SEED DATA
-- =========================================

-- Insert Test User
INSERT INTO users (username, password_hash, points)
VALUES
    ('ashley', 'test_hash_123', 0);


-- =========================================
-- LEVEL 1 - HENRY VIII
-- =========================================

INSERT INTO levels (level_number, level_name)
VALUES
    (1, 'Henry VIII');


-- =========================================
-- LEVEL 1 STAGES
-- =========================================

INSERT INTO stages (level_id, stage_number, stage_name, points)
VALUES
    (1, 1, 'Henry VIII and His Wives', 100),
    (1, 2, 'Henry VIII and the Male Heir', 100),
    (1, 3, 'The English Reformation', 100),
    (1, 4, 'Henry VIII and the Church', 100);


-- =========================================
-- STAGE 1 QUESTION BANK
-- 15 questions - game can randomly select 5
-- =========================================

INSERT INTO questions (stage_id, question_text)
VALUES
    (1, 'How many wives did Henry VIII have?'),
    (1, 'Who was Henry VIII''s second wife?'),
    (1, 'Why was having a male heir important to Henry VIII?'),
    (1, 'Which wife gave birth to Henry VIII''s son Edward?'),
    (1, 'What major religious change took place during Henry VIII''s reign?'),
    (1, 'Who was Henry VIII''s first wife?'),
    (1, 'Which of Henry VIII''s wives was the mother of Elizabeth I?'),
    (1, 'Who was Henry VIII''s final wife?'),
    (1, 'In what year did Henry VIII become King of England?'),
    (1, 'Which wife of Henry VIII was his marriage to after Jane Seymour?'),
    (1, 'What was the name of Henry VIII''s son?'),
    (1, 'Who was the head of the Roman Catholic Church whose authority Henry rejected?'),
    (1, 'What was the name of the religious change that took place during Henry VIII''s reign?'),
    (1, 'Which of Henry VIII''s wives was executed in 1536?'),
    (1, 'Which wife survived Henry VIII?');


-- =========================================
-- ANSWERS
-- =========================================

INSERT INTO answers (question_id, answer_text, is_correct)
VALUES
    -- Question 1
    (1, 'Four', FALSE),
    (1, 'Five', FALSE),
    (1, 'Six', TRUE),
    (1, 'Seven', FALSE),

    -- Question 2
    (2, 'Jane Seymour', FALSE),
    (2, 'Anne Boleyn', TRUE),
    (2, 'Catherine Parr', FALSE),
    (2, 'Anne of Cleves', FALSE),

    -- Question 3
    (3, 'He wanted a son to become Pope', FALSE),
    (3, 'He wanted a son to succeed him as king', TRUE),
    (3, 'He wanted a son to move to France', FALSE),
    (3, 'He wanted a son to lead the Church', FALSE),

    -- Question 4
    (4, 'Catherine of Aragon', FALSE),
    (4, 'Anne Boleyn', FALSE),
    (4, 'Jane Seymour', TRUE),
    (4, 'Catherine Howard', FALSE),

    -- Question 5
    (5, 'England became a Buddhist country', FALSE),
    (5, 'England joined the Orthodox Church', FALSE),
    (5, 'Henry rejected the Pope''s authority in England', TRUE),
    (5, 'England stopped practising Christianity', FALSE),

    -- Question 6
    (6, 'Anne Boleyn', FALSE),
    (6, 'Catherine of Aragon', TRUE),
    (6, 'Jane Seymour', FALSE),
    (6, 'Catherine Parr', FALSE),

    -- Question 7
    (7, 'Catherine of Aragon', FALSE),
    (7, 'Anne Boleyn', TRUE),
    (7, 'Jane Seymour', FALSE),
    (7, 'Anne of Cleves', FALSE),

    -- Question 8
    (8, 'Catherine Howard', FALSE),
    (8, 'Jane Seymour', FALSE),
    (8, 'Anne of Cleves', FALSE),
    (8, 'Catherine Parr', TRUE),

    -- Question 9
    (9, '1485', FALSE),
    (9, '1509', TRUE),
    (9, '1536', FALSE),
    (9, '1547', FALSE),

    -- Question 10
    (10, 'Anne of Cleves', TRUE),
    (10, 'Catherine Parr', FALSE),
    (10, 'Catherine of Aragon', FALSE),
    (10, 'Anne Boleyn', FALSE),

    -- Question 11
    (11, 'Edward', TRUE),
    (11, 'Arthur', FALSE),
    (11, 'William', FALSE),
    (11, 'Thomas', FALSE),

    -- Question 12
    (12, 'The Archbishop of Canterbury', FALSE),
    (12, 'The Pope', TRUE),
    (12, 'The King of France', FALSE),
    (12, 'The Lord Chancellor', FALSE),

    -- Question 13
    (13, 'The Industrial Revolution', FALSE),
    (13, 'The Restoration', FALSE),
    (13, 'The English Reformation', TRUE),
    (13, 'The Glorious Revolution', FALSE),

    -- Question 14
    (14, 'Catherine Parr', FALSE),
    (14, 'Anne Boleyn', TRUE),
    (14, 'Jane Seymour', FALSE),
    (14, 'Anne of Cleves', FALSE),

    -- Question 15
    (15, 'Anne Boleyn', FALSE),
    (15, 'Jane Seymour', FALSE),
    (15, 'Catherine Howard', FALSE),
    (15, 'Catherine Parr', TRUE);


-- =========================================
-- LEVEL 1 TROPHY
-- =========================================

INSERT INTO trophies (level_id, trophy_name, description)
VALUES
    (1, 'Henry VIII History Master', 'Completed the Henry VIII level');


-- =========================================
-- TEST USER PROGRESS
-- =========================================

INSERT INTO user_progress (user_id, level_id, current_stage_id)
VALUES
    (1, 1, 1);