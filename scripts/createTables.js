import knex from 'knex';
import { config } from '../src/config.js';

//Mariadb
try{
    const mariaDBClient = knex(config.mariaDB);

    await mariaDBClient.schema.dropTableIfExists('products');
    await mariaDBClient.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('title', 50).notNullable();
        table.string('price', 50).notNullable();
        table.string('thumbnail', 1024).notNullable();
    })

    await mariaDBClient.destroy();

    console.log('Created table products');
}catch(error){
    console.log(error);
}

//SQLite3
try{
    const sqlite3Client = knex(config.sqlite3);

    await sqlite3Client.schema.dropTableIfExists('messages');
    await sqlite3Client.schema.createTable('messages', table => {
        table.increments('id').primary();
        table.string('email', 50).notNullable();
        table.string('text', 500).notNullable(); 
    })

    await sqlite3Client.destroy();

    console.log('Created table messages');
}catch(error){
    console.log(error);
}