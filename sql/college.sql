-- Database Name ComputerScience
DROP DATABASE ComputerScience;

CREATE DATABASE ComputerScience;

-- Path: sql/college.sql
-- Use
USE ComputerScience;

-- Table Userdetails
CREATE TABLE Userdetails(
   id varchar(20) NOT NULL,
   email varchar(50) NOT NULL,
   username varchar(50) NOT NULL,
   password text NOT NULL,
   classname varchar(50) NOT NULL,
   department varchar(50) NOT NULL,
   role varchar(50) NOT NULL,
   tablename varchar(50) NOT NULL
);
ALTER TABLE Userdetails ADD UNIQUE KEY(id);
ALTER TABLE Userdetails ADD UNIQUE KEY(email);

/* CREATE COMPUTER SCIENCES TABLES */
-- First CS

CREATE TABLE FirstCSI(
   id varchar(20) NOT NULL,
   tamil1 varchar(50),
   english1 varchar(50),
   maths1 varchar(50),
   dfa varchar(50),
   cprogramming varchar(50),
   clab varchar(50)
);
ALTER TABLE FirstCSI ADD FOREIGN KEY(id) REFERENCES Userdetails(id);
ALTER TABLE FirstCSI ADD column testname varchar(50) NOT NULL;

-- SecondCSI
CREATE TABLE FirstCSII(
   id varchar(20) NOT NULL,
   tamil2 varchar(50),
   english2 varchar(50),
   cpp varchar(50),
   discretemath varchar(50),
   ib varchar(50),
   cpplab varchar(50)
);
ALTER TABLE FirstCSII ADD FOREIGN KEY(id) REFERENCES Userdetails(id);
ALTER TABLE FirstCSII ADD column testname varchar(50) NOT NULL;


CREATE TABLE SecondCSI(
  id varchar(20) NOT NULL,
  java varchar(20),
  ds varchar(20),
  cbot varchar(20),
  seandspm varchar(20),
  javalab varchar(20)
);
ALTER TABLE SecondCSI ADD FOREIGN KEY(id) REFERENCES Userdetails(id);
ALTER TABLE SecondCSI ADD column testname varchar(50) NOT NULL;


CREATE TABLE SecondCSII(
  id varchar(20) NOT NULL,
  linux varchar(20),
  ssos varchar(20),
  baccounting varchar(20),
  linuxlab varchar(20)
);
ALTER TABLE SecondCSII ADD column testname varchar(50) NOT NULL;
ALTER TABLE SecondCSII ADD FOREIGN KEY(id) REFERENCES Userdetails(id);


CREATE TABLE ThirdCSI(
  id varchar(20) NOT NULL,
  dbms varchar(20),
  vb varchar(20),
  python varchar(20),
  stesting varchar(20),
  vbdbmslab varchar(20)
);
ALTER TABLE ThirdCSI ADD column testname varchar(50) NOT NULL;
ALTER TABLE ThirdCSI ADD FOREIGN KEY(id) REFERENCES Userdetails(id);


CREATE TABLE ThirdCSII(
  id varchar(20) NOT NULL,
  project varchar(20),
  iot varchar(20),
  cgmultimedia varchar(20),
  webtech varchar(20),
  cgmultimedialab varchar(20)
);

ALTER TABLE ThirdCSII ADD FOREIGN KEY(id) REFERENCES Userdetails(id);
ALTER TABLE ThirdCSII ADD column testname varchar(50) NOT NULL;
