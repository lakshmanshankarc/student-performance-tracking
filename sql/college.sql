-- Database Name ComputerScience

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
   PRIMARY KEY (id)
);

