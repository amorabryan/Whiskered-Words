-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

INSERT INTO "Users" ("username", "hashPassword")
VALUES
    ('user1', 'pass123'),
    ('user2', 'secret321'),
    ('user3', '123456');


INSERT INTO "Cats" ("name", "gender", "ageYr", "ageMo", "userId", "photoUrl", "breed")
VALUES
    ('Whiskers', 'Male', 2, 1, 1, 'https://nationaltoday.com/wp-content/uploads/2019/04/national-siamese-cat-day.jpg', 'Siamese'),
    ('Bella', 'Female', 1, 1, 2, 'https://cats.com/wp-content/uploads/2020/10/Persian-cat-compressed-768x384.jpg', 'Persian'),
    ('Oliver', 'Male', 3, 6, 1, 'https://cats.com/wp-content/uploads/2020/10/tabby-maine-coon.jpg', 'Maine Coon'),
    ('Luna', 'Female', 2, 3, 3, 'https://upload.wikimedia.org/wikipedia/commons/6/64/Ragdoll_from_Gatil_Ragbelas.jpg', 'Ragdoll');


INSERT INTO "Whiskers" ("name", "catId", "photoUrl", "note")
VALUES
    ('Our Adventure Today', 1, 'https://ih1.redbubble.net/image.3223995840.9845/raf,360x360,075,t,fafafa:ca443f4786.jpg', 'Went on a thrilling adventure today! Explored the backyard and chased butterflies.'),
    ('Lost in the Woods', 2, NULL, 'Got lost in the woods. Finally found my way back home.'),
    ('Meeting New Friends', 2, 'https://media.istockphoto.com/id/670681938/photo/cute-persian-cat-playing-toy.jpg?s=170667a&w=0&k=20&c=e5ZFt2eF-vv-5kDvK5BK73owkUo_R4_w4ABZ4ud-GA0=', 'Met Bella today. She''s a friendly Persian cat. We had fun playing together.'),
    ('Lazy Afternoon Nap', 3, NULL, 'Enjoyed a long, lazy nap in the afternoon.'),
    ('Sleeping In', 3, 'https://ragdollcatsworld.com/wp-content/uploads/2022/08/IMG_6859-942x1024.jpg', 'Spent the entire day sleeping. Must be nice!'),
    ('Caught a Red Dot', 1, NULL, 'Had a blast chasing that elusive red dot around the house.');
