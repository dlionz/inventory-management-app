create database bamazon;

use bamazon;

create table products(
item_id integer(20) auto_increment unique,
product_name varchar(50) not null,
department_name varchar(50) not null,
price float(50,2) not null,
stock_quantity integer(50) not null default 0,
primary key(item_id)
);

alter table products
add column product_sale float (50,2) default 0;

insert into products(product_name, department_name, price, stock)
values ("iPhon", "Electronics", 600, 1000);
insert into products(product_name, department_name, price, stock)
values ("Tv", "Electronics", 300, 100);
insert into products(product_name, department_name, price, stock)
values ("Xbox", "Electronics", 499, 250);
insert into products(product_name, department_name, price, stock)
values ("Pen", "Office Supplies", 2, 2000);
insert into products(product_name, department_name, price, stock)
values ("Notebook", "Office Supplies", 6, 1000);
insert into products(product_name, department_name, price, stock)
values ("Paper Clips", "Office Supplies", 3, 10000);
insert into products(product_name, department_name, price, stock)
values ("Book", "Books", 20, 100);
insert into products(product_name, department_name, price, stock)
values ("Dog", "Pets", 230, 327);
insert into products(product_name, department_name, price, stock)
values ("Cat", "Pets", 120, 143);
