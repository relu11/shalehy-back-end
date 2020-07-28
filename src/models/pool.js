import { Pool } from 'pg';
import dotenv from 'dotenv';
import { databaseURL } from '../settings';

dotenv.config();

export const pool = new Pool({ connectionString: databaseURL });
