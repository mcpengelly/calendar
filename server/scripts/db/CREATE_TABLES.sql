DROP TABLE IF EXISTS timesheets;
CREATE TABLE timesheets (id UUID PRIMARY KEY, hours numeric, day date);

DROP TABLE IF EXISTS users;
CREATE TABLE users (id UUID PRIMARY KEY, username character varying, password character varying);
