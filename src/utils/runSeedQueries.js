import { createTables, insertValues } from './queryFunctions';

(async () => {
	await createTables();
	await insertValues();
})();
