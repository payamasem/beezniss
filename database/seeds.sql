INSERT INTO user
    (first_name, last_name, )
VALUES
    ("Kobe", "Bryant"),
    ("LeBron", "James"),
    ("Steph", "Curry"),
    ("Kevin", "Durant"),
    ("Kevin", "Hart"),
    ("Draymond", "Green"),
    ("Klay", "Thompson"),
    ("Lonzo", "Ball"),
    ("Serena", "Williams"),
    ("Kate", "Middleton");

INSERT INTO task
    (heading, description, due_date, checklist_item)
VALUES
    ("You need to do something", "maybe you need to check the To do list", "2018-4-20"),
    ("You may need to do something", "maybe you need to check the To do list now", "2018-4-22"),
    ("You have to do something", "maybe you need to check the To do list", "2018-4-20"),
    ("You need to do something again", "maybe you need to check the To do list", "2018-4-10"),
    ("You need to do something", "maybe you need to check the To do list", "2018-4-26"),
    ("You need to do something", "maybe you need to check the To do list", "2018-4-30"),
    ("You need to do something", "maybe you need to check the To do list", "2018-4-21"),
    ("You need to do something", "maybe you need to check the To do list", "2018-4-24"),
    ("You need to do something", "maybe you need to check the To do list", "2018-4-25"),
    ("You need to do something", "maybe you need to check the To do list", "2018-4-4");

INSERT INTO checklist
    (title, completed, due_date)
VALUES
    ("maybe you need to check the To do list", "2018-4-20"),
    ( "maybe you need to check the To do list now", "2018-4-22"),
    ("maybe you need to check the To do list", "2018-4-20"),
    ("maybe you need to check the To do list", "2018-4-20"),
    ( "maybe you need to check the To do list now", "2018-4-22"),
    ("maybe you need to check the To do list", "2018-4-20"),
    ("maybe you need to check the To do list", "2018-4-20"),
    ( "maybe you need to check the To do list now", "2018-4-22"),
    ("maybe you need to check the To do list", "2018-4-20");

INSERT INTO project
    (title, due_date, checklist_item)
VALUES
    ("project 1", "2018-4-20"),
    ("project 2", "2018-4-20"),
    ("project 3", "2018-4-20"),
    ("project 4", "2018-4-20"),
    ("project 5", "2018-4-20"),
    ("project 6", "2018-4-20"),
    ("project 5", "2018-4-20"),
    ("project 6", "2018-4-20");