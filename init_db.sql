CREATE DATABASE IF NOT EXISTS IotMonitoring CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE IotMonitoring;


CREATE TABLE Superviseurs (
    Id_superviseur INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(40) NOT NULL UNIQUE,
    pass_word VARCHAR(100) NOT NULL,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE Students (
    Id_student INT AUTO_INCREMENT PRIMARY KEY,
    Id_superviseur INT NOT NULL,
    name VARCHAR(20) NOT NULL,
    nfc_uid VARCHAR(40) UNIQUE DEFAULT NULL,
    CONSTRAINT fk_student_superviseur 
        FOREIGN KEY (Id_superviseur) 
        REFERENCES Superviseurs(Id_superviseur) 
        ON DELETE CASCADE
);

CREATE TABLE Sessions (
    Id_session INT AUTO_INCREMENT PRIMARY KEY,
    Id_student INT NOT NULL,
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME NULL DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'Active',
    mac_adresse VARCHAR(50) NOT NULL,
    time_worked INT DEFAULT 0,
    CONSTRAINT fk_session_student 
        FOREIGN KEY (Id_student) 
        REFERENCES Students(Id_student) 
        ON DELETE CASCADE
);

CREATE TABLE issues (
    Id_issue INT AUTO_INCREMENT PRIMARY KEY,
    Id_session INT NOT NULL,
    start_absence DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_absence DATETIME NULL DEFAULT NULL,
    duration_second INT DEFAULT 0,
    CONSTRAINT fk_issue_session 
        FOREIGN KEY (Id_session) 
        REFERENCES Sessions(Id_session) 
        ON DELETE CASCADE
);