import { createTables, insertValues, dropTables } from './queryFunctions';

(async () => {
	await dropTables();
	await createTables();
	await insertValues();
})();
