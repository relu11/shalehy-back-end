import {
	dropTables, createTables, insertValues
} from '../src/utils/queryFunctions';

before(async () => {
	await dropTables();
	await createTables();
	await insertValues();
});

after(async () => {
	await dropTables();
});
