TRUNCATE TABLE levels RESTART IDENTITY CASCADE;

INSERT INTO levels (level_number, level_name) 
VALUES
    (1, 'Ancient History'),
    (2, 'Medieval History');

INSERT INTO stages (level_id, stage_number, stage_name, points)
VALUES 
    (1, 1, 'Early Civilisations', 100),
    (1, 2, 'Ancient Egypt', 100),
    (1, 3, 'Ancient Greece', 100),
    (1, 4, 'Ancient Rome', 200);
