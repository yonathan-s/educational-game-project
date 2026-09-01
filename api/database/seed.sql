-- =========================================
-- SEED DATA
-- =========================================


-- Insert Users
INSERT INTO users (username, password_hash, points)
VALUES
    ('ashley', 'test_hash_123', 0);


-- =========================================
-- LEVELS
-- =========================================

INSERT INTO levels (level_number, level_name)
VALUES
    (1, 'Ancient History'),
    (2, 'Medieval History'),
    (3, 'Tudor History');


-- =========================================
-- STAGES
-- =========================================

INSERT INTO stages (level_id, stage_number, stage_name, points)
VALUES
    -- Level 1 - Ancient History
    (1, 1, 'Early Civilisations', 100),
    (1, 2, 'Ancient Egypt', 100),
    (1, 3, 'Ancient Greece', 100),
    (1, 4, 'Ancient Rome', 200),

    -- Level 2 - Medieval History
    (2, 1, 'Early Medieval Period', 100),
    (2, 2, 'Norman England', 100),
    (2, 3, 'Medieval Europe', 100),
    (2, 4, 'Late Middle Ages', 200),

    -- Level 3 - Tudor History
    (3, 1, 'Henry VIII and His Wives', 100);


-- =========================================
-- QUESTIONS
-- =========================================

INSERT INTO questions (stage_id, question_text)
VALUES
    -- Level 1 - Ancient History
    (1, 'Which civilisation is credited with developing cuneiform?'),
    (2, 'Which river was central to the development of Ancient Egypt?'),
    (3, 'Which Greek city-state was famous for its military society?'),
    (4, 'Who was assassinated on the Ides of March in 44 BC?'),

    -- Level 2 - Medieval History
    (5, 'Which empire was centred around Constantinople during the medieval period?'),
    (6, 'Who led the Norman conquest of England in 1066?'),
    (7, 'What document was sealed by King John in 1215?'),
    (8, 'Which event is traditionally regarded as marking the end of the Middle Ages in England?'),

    -- Level 3 - Tudor History - Stage 1
    (9, 'How many wives did Henry VIII have?'),
    (9, 'Who was Henry VIII''s second wife?'),
    (9, 'Why was having a male heir important to Henry VIII?'),
    (9, 'Which wife gave birth to Henry VIII''s son Edward?'),
    (9, 'What major religious change took place during Henry VIII''s reign?');


-- =========================================
-- ANSWERS
-- =========================================

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

    -- Question 7
    (7, 'Magna Carta', TRUE),
    (7, 'The Domesday Book', FALSE),
    (7, 'The Treaty of Verdun', FALSE),
    (7, 'The Bayeux Tapestry', FALSE),

    -- Question 8
    (8, 'The Battle of Bosworth Field', TRUE),
    (8, 'The Battle of Hastings', FALSE),
    (8, 'The Battle of Agincourt', FALSE),
    (8, 'The Battle of Bannockburn', FALSE),


    -- =====================================
    -- TUDOR HISTORY - STAGE 1
    -- =====================================

    -- Question 9
    -- How many wives did Henry VIII have?
    (9, 'Four', FALSE),
    (9, 'Five', FALSE),
    (9, 'Six', TRUE),
    (9, 'Seven', FALSE),

    -- Question 10
    -- Who was Henry VIII's second wife?
    (10, 'Jane Seymour', FALSE),
    (10, 'Anne Boleyn', TRUE),
    (10, 'Catherine Parr', FALSE),
    (10, 'Anne of Cleves', FALSE),

    -- Question 11
    -- Why was having a male heir important to Henry VIII?
    (11, 'He wanted a son to become Pope', FALSE),
    (11, 'He wanted a son to succeed him as king', TRUE),
    (11, 'He wanted a son to move to France', FALSE),
    (11, 'He wanted a son to lead the Church', FALSE),

    -- Question 12
    -- Which wife gave birth to Henry VIII's son Edward?
    (12, 'Catherine of Aragon', FALSE),
    (12, 'Anne Boleyn', FALSE),
    (12, 'Jane Seymour', TRUE),
    (12, 'Catherine Howard', FALSE),

    -- Question 13
    -- What major religious change took place during Henry VIII's reign?
    (13, 'England became a Buddhist country', FALSE),
    (13, 'England joined the Orthodox Church', FALSE),
    (13, 'Henry rejected the Pope''s authority and became head of the Church of England', TRUE),
    (13, 'England stopped practising Christianity', FALSE);


-- =========================================
-- TROPHIES
-- =========================================

INSERT INTO trophies (level_id, trophy_name, description)
VALUES
    (1, 'Ancient History Master', 'Completed the Ancient History era'),
    (2, 'Medieval History Master', 'Completed the Medieval History era'),
    (3, 'Tudor History Master', 'Completed the Tudor History era');


-- =========================================
-- USER PROGRESS
-- =========================================

INSERT INTO user_progress (user_id, level_id, current_stage_id)
VALUES
    (1, 1, 1);