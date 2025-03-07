create table products (
   productid int,
   nome varchar(255),
   descricao varchar(500),
   preco decimal(10,2),
   categoria varchar(255),
   imagetype varchar(255),
   imagebase64 varchar,
   primary key (productid)
);