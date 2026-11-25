create database biblioteca;

use biblioteca;

create table usuarios (
    id int auto_increment primary key,
    nombre varchar(100) not null,
    correo varchar(100) unique,
    telefono varchar(20),
    estado varchar(20)
);

create table autores (
    id int auto_increment primary key,
    nombre varchar(100) not null,
    nacionalidad varchar(60),
    fecha_nacimiento date
);

create table categorias (
    id int auto_increment primary key,
    nombre varchar(80) not null unique,
    descripcion varchar(200)
);

create table libros (
    id int auto_increment primary key,
    titulo varchar(150) not null,
    isbn varchar(30) unique,
    anio_publicacion int,
    cantidad int,
    autor_id int,
    categoria_id int,
    foreign key (autor_id) references autores(id),
    foreign key (categoria_id) references categorias(id)
);

create table prestamos (
    id int auto_increment primary key,
    usuario_id int,
    libro_id int,
    fecha_prestamo date not null,
    fecha_devolucion date,
    estado varchar(20),
    foreign key (usuario_id) references usuarios(id),
	foreign key (libro_id) references libros(id)
);

