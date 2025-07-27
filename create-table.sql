
CREATE TABLE user(
id int primary key auto_increment,
firstname varchar(50) NOT NULL,
lastname varchar(50) NOT NULL,
username varchar(50) NOT NULL unique,
email varchar(50) NOT NULL unique,
profilepic varchar(255),
password varchar(255) NOT NULL,
refreshtoken varchar(255) NOT NULL,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp ON update current_timestamp
);

create table blog(
id int primary key auto_increment,
title varchar(255) not null,
content longtext not null,
private boolean not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp ON update current_timestamp,
blogger int not null,
visitors int not null default '0',
foreign key (blogger) References user(id)
);

Create table bookmark(
id int primary key auto_increment,
userId int not null,
blogId int not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp ON update current_timestamp,
isBookmarked boolean not null,
foreign key (userId) REFERENCES user(id),
foreign key (blogId) references blog(id)
);
 
create table comment(
id int primary key auto_increment,
comment text not null,
userId int not null,
blogId int not null,
parentComment int,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp ON update current_timestamp,
foreign key (userId) REFERENCES user(id),
foreign key (blogId) references blog(id)
);

create table likes(
id int primary key auto_increment,
isliked boolean not null,
userId int not null,
blogId int not null,
commentId int not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp ON update current_timestamp,
foreign key (commentId) REFERENCES comment(id),
foreign key (userId) REFERENCES user(id),
foreign key (blogId) references blog(id)
);

create table finance(
id int primary key auto_increment,
amount int not null,
transaction_method ENUM('cash','card','UPI','other') not null,
transaction_type ENUM('credited','debited') not null,
date timestamp default current_timestamp,
description varchar(255),
category ENUM('Restaurants','Groceries','Education','Bills','Public Transit','Gift','Maintenance','Other'),
bill_img varchar(255),
userId int not null,
foreign key (userId) REFERENCES	user(id)
);

create table todo(
id int primary key auto_increment,
title varchar(255) not null,
description text not null,
due_date timestamp,
markAsCompleted boolean	not null,
priorityLevel ENUM('High','Low','Medium') not null,
attachment varchar(255),
category varchar(255) not null,
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp ON update current_timestamp,
userId int not null,
foreign key (userId) REFERENCES	user(id),
parentTodoId int,
foreign key (parentTodoID) references todo(id)
)