-- =========================================
-- SEED DATA
-- =========================================


-- Insert Test User
INSERT INTO users (username, password_hash, points)
VALUES
    ('ashley', 'test_hash_123', 0);


-- =========================================
-- LEVEL 1 - THE TUDORS
-- =========================================

INSERT INTO levels (level_number, level_name)
VALUES
    (1, 'The Tudors');


-- =========================================
-- STAGE 1 - HENRY VIII AND HIS WIVES
-- =========================================

INSERT INTO stages (level_id, stage_number, stage_name, points)
VALUES
    (1, 1, 'Henry VIII and His Wives', 100);


-- =========================================
-- STAGE 1 QUESTIONS
-- =========================================

INSERT INTO questions (stage_id, question_text)
VALUES
    (1, 'How many wives did Henry VIII have?'),
    (1, 'Who was Henry VIII''s second wife?'),
    (1, 'Why was having a male heir important to Henry VIII?'),
    (1, 'Which wife gave birth to Henry VIII''s son Edward?'),
    (1, 'What major religious change took place during Henry VIII''s reign?');


-- =========================================
-- STAGE 1 ANSWERS
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
    (5, 'Henry rejected the Pope''s authority and became head of the Church of England', TRUE),
    (5, 'England stopped practising Christianity', FALSE);


-- =========================================
-- LEVEL 1 TROPHY
-- =========================================

INSERT INTO trophies (level_id, trophy_name, description)
VALUES
    (1, 'Tudor History Master', 'Completed the Tudor History level');


-- =========================================
-- TEST USER PROGRESS
-- =========================================

INSERT INTO user_progress (user_id, level_id, current_stage_id)
VALUES
    (1, 1, 1);