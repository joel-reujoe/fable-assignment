CREATE TABLE IF NOT EXISTS logs (
    primary_id SERIAL PRIMARY KEY,
    id int,
    unix_ts bigint,
    user_id int,
    event_name varchar(255)
);