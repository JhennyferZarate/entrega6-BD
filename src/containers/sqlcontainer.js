import knex from 'knex'

export class sqlcontainer{
    constructor(config, table){
        this.knex = knex(config);
        this.table = table;
    }

    async getID(id){
        try{
            return await this.knex.select('*').from(this.table).where('id', id);
        }catch(error){
            console.log(error);
            throw new Error(`Error getting ID ${id} from ${this.table}`);
        }
    }
    
    async getAll(){
        try{
            return await this.knex.select('*').from(this.table);
        }catch(error){
            console.log(error);
            throw new Error(`Error getting all from ${this.table}`);
        }
    }

    async save(data){
        try{
            return await this.knex.insert(data).into(this.table);
        }catch(error){
            console.log(error);
            throw new Error(`Error saving data in ${this.table}`);
        }
    }

    async update(id, data){
        try{
            return await this.knex(this.table).where('id', id).update(data);
        }catch(error){
            console.log(error);
            throw new Error(`Error updating data in ${this.table}`);
        }
    }

    async delete(id){
        try{
            return await this.knex(this.table).where('id', id).del();
        }catch(error){
            console.log(error);
            throw new Error(`Error deleting data in ${this.table}`);
        }
    }

    async deleteAll(){
        try{
            return await this.knex(this.table).del();
        }catch(error){
            console.log(error);
            throw new Error(`Error deleting all data in ${this.table}`);
        }
    }
}