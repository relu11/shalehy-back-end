const date = new Date();

export const createUserTable = `
DROP TABLE IF EXISTS userr;
CREATE TABLE userr (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL
)
`;

export const createUnitTable = `
DROP TABLE IF EXISTS unit;
CREATE TABLE unit (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	description TEXT NULL,
	price FLOAT NOT NULL,
	capacity INT NOT NULL,
	extra_features TEXT NULL,
	lat FLOAT NULL,
	long FLOAT NULL,
	available_start DATE NULL,
	available_end DATE NULL,
	owner int NOT NULL,
  CONSTRAINT unit_owner_fk FOREIGN KEY(owner) REFERENCES userr(id)
)
`;

export const createUnitReviewTable = `
DROP TABLE IF EXISTS unit_review;
CREATE TABLE unit_review (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	unit_id INT NOT NULL,
	rate INT NOT NULL,
	review VARCHAR NULL,
	CONSTRAINT review_user_fk FOREIGN KEY(user_id) REFERENCES userr(id),
	CONSTRAINT review_unit_fk FOREIGN KEY(unit_id) REFERENCES unit(id)
)
`;

export const createUserFavoriteTable = `
DROP TABLE IF EXISTS user_favorite;
CREATE TABLE user_favorite (
	user_id INT NOT NULL,
	unit_id INT NOT NULL,
	CONSTRAINT favorite_pk PRIMARY KEY(user_id, unit_id),
	CONSTRAINT favorite_user_fk FOREIGN KEY(user_id) REFERENCES userr(id),
	CONSTRAINT favorite_unit_fk FOREIGN KEY(unit_id) REFERENCES unit(id)
)
`;

export const createBookTable = `
DROP TABLE IF EXISTS book;
CREATE TABLE book (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	unit_id INT NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	CONSTRAINT book_user_fk FOREIGN KEY(user_id) REFERENCES userr(id),
	CONSTRAINT book_unit_fk FOREIGN KEY(unit_id) REFERENCES unit(id)
)
`;

export const createChatRoomTable = `
DROP TABLE IF EXISTS chat_room;
CREATE TABLE chat_room (
	id SERIAL PRIMARY KEY,
	renter_id INT NOT NULL,
	tenant_id INT NOT NULL,
	CONSTRAINT chat_renter_fk FOREIGN KEY(renter_id) REFERENCES userr(id),
	CONSTRAINT chat_tenant_fk FOREIGN KEY(tenant_id) REFERENCES userr(id)
)
`;

export const createChatMessageTable = `
DROP TABLE IF EXISTS chat_message;
CREATE TABLE chat_message (
	id SERIAL PRIMARY KEY,
	roomId INT NOT NULL,
	message VARCHAR NOT NULL,
	time Date NOT NULL,
	CONSTRAINT message_room_fk FOREIGN KEY(roomId) REFERENCES chat_room(id)
)
`;

export const insertToUser = `
INSERT INTO userr (name, email, password)
VALUES ('User 1', 'user1@shalehy.com', '123123'),
	('User 2', 'user2@shalehy.com', '123123'),
	('User 3', 'user3@shalehy.com', '123123')
`;

export const insertToUnit = `
INSERT INTO unit (name, description, price, capacity, extra_features, lat, long, available_start, available_end, owner)
VALUES ('unit 1', 'Awesome unit with lots of features', 20, 2, 'Wifi - Parking', 30.1177753, 31.6037873,
	'${date.getFullYear()}-${date.getMonth()}-${date.getDate() - 2 > 0 ? date.getDate() - 2 : date.getDate()}', '${date.getFullYear()}-${date.getMonth()}-${date.getDate() + 10 < 31 ? date.getDate() + 10 : date.getDate()}', 1),
	('unit 2', 'Awesome unit with lots of features', 20, 2, 'Wifi - Parking', 30.1177753, 31.6037873,
	'${date.getFullYear()}-${date.getMonth()}-${date.getDate() - 5 > 0 ? date.getDate() - 5 : date.getDate()}', '${date.getFullYear()}-${date.getMonth()}-${date.getDate() + 20 < 31 ? date.getDate() + 20 : date.getDate()}', 1),
	('unit 3', 'Awesome unit with lots of features', 20, 2, 'Wifi - Parking', 30.1177753, 31.6037873,
	'${date.getFullYear()}-${date.getMonth()}-${date.getDate() - 2 > 0 ? date.getDate() - 2 : date.getDate()}', '${date.getFullYear()}-${date.getMonth()}-${date.getDate() + 5 < 31 ? date.getDate() + 5 : date.getDate()}', 1),
	('unit 4', 'Awesome unit with lots of features', 20, 2, 'Wifi - Parking', 30.1177753, 31.6037873,
	'${date.getFullYear()}-${date.getMonth()}-${date.getDate() - 0 > 0 ? date.getDate() - 0 : date.getDate()}', '${date.getFullYear()}-${date.getMonth()}-${date.getDate() + 2 < 31 ? date.getDate() + 2 : date.getDate()}', 1)
`;


export const dropUserTable = `DROP TABLE IF EXISTS userr`;
export const dropUnitTable = `DROP TABLE IF EXISTS unit`;
export const dropUnitReviewTable = `DROP TABLE IF EXISTS unit_review`;
export const dropUserFavoriteTable = `DROP TABLE IF EXISTS user_favorite`;
export const dropBookTable = `DROP TABLE IF EXISTS book`;
export const dropChatMessageTable = `DROP TABLE IF EXISTS chat_message`;
export const dropChatRoomTable = `DROP TABLE IF EXISTS chat_room`;
