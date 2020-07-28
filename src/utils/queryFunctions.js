import { pool } from '../models/pool';
import {
	createUserTable, createUnitTable, createUnitReviewTable,
	createUserFavoriteTable, createBookTable, createChatRoomTable,
	createChatMessageTable, insertToUser, insertToUnit, dropUserTable,
	dropBookTable, dropChatRoomTable, dropChatMessageTable, dropUnitReviewTable,
	dropUnitTable, dropUserFavoriteTable
} from './queries';

export const executeQueryArray = (async arr => {
	try {
		for (let q of arr) {
			await pool.query(q);
		}
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}
});

export const dropTables = () => executeQueryArray([dropBookTable, dropUnitReviewTable,
	dropUserFavoriteTable, dropChatMessageTable, dropChatRoomTable, dropUnitTable, dropUserTable]);

export const createTables = () => executeQueryArray([createUserTable, createUnitTable,
	createUnitTable, createBookTable, createChatRoomTable, createChatMessageTable,
	createUnitReviewTable, createUserFavoriteTable]);

export const insertValues = () => executeQueryArray([insertToUser, insertToUnit]);
