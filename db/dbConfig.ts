//++++++++++++++++++++++++++++++++++++++++++
//Import
//++++++++++++++++++++++++++++++++++++++++++
import { drizzle } from "drizzle-orm/mysql2";
import connection from "../config/connect";
//++++++++++++++++++++++++++++++++++++++++++
const db = drizzle(connection);
//++++++++++++++++++++++++++++++++++++++++++
export default db;
//++++++++++++++++++++++++

