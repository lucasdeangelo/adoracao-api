DROP DATABASE IF EXISTS Adoracao;
CREATE DATABASE Adoracao;
USE Adoracao;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(16) NOT NULL,
    data_nasc DATE,
    tipo_usuario ENUM('Adorador', 'Regente', 'Cantor', 'Músico', 'Componente') NOT NULL
);

CREATE TABLE grupo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    tipo_grupo ENUM('Musical', 'Louvor') NOT NULL,
    regente_id INT UNIQUE NOT NULL,
    FOREIGN KEY (regente_id) REFERENCES usuarios(id_usuario)
);

CREATE TABLE hinario_grupo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grupo_id INT NOT NULL,
    hino_id VARCHAR(50) NOT NULL, 
    FOREIGN KEY (grupo_id) REFERENCES grupo(id)
);

CREATE TABLE ensaios_grupo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grupo_id INT NOT NULL,
    hino_id INT,
    data DATETIME NOT NULL,
    descricao VARCHAR(255),
    local VARCHAR(255),
    FOREIGN KEY (grupo_id) REFERENCES grupo(id),
    FOREIGN KEY (hino_id) REFERENCES hinario_grupo(id) 
);

CREATE TABLE eventos_grupo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grupo_id INT NOT NULL,
    data DATETIME NOT NULL,
    descricao TEXT,
    local VARCHAR(255),
    FOREIGN KEY (grupo_id) REFERENCES grupo(id)
);

CREATE TABLE musicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    partituras TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
);

CREATE TABLE cantores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    classificacao INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
);

CREATE TABLE regentes (
    regente_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    classificacao_hinos TEXT,
    classificacao_componentes TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
);

CREATE TABLE componentes (
    componente_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    classificacao INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
);

ALTER TABLE usuarios
ADD COLUMN id_grupo INT DEFAULT NULL,
ADD FOREIGN KEY (id_grupo) REFERENCES grupo(id);

INSERT INTO usuarios (nome, email, senha, data_nasc, tipo_usuario, id_grupo) VALUES
('Lucas', 'lucas@gmail.com', '123', '2004-10-23', 'Adorador', null),
('Pedro', 'musico@gmail.com', '123', '2004-07-23', 'Músico', null),
('Neusa', 'cantor@gmail.com', '123', '1980-10-23', 'Cantor', null),
('Angelita', 'regente@gmail.com', '123', '1980-02-05', 'Regente', null),
('Levi', 'comp@gmail.com', '123', '2014-10-23', 'Componente', null);
