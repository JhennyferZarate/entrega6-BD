import fs from "fs";

class memoryContainer {

    constructor(filename) {
        this.path = `./src/db/json/${filename}.json`;
    }

    async getAll() {
        try {
          const file = await fs.promises.readFile(this.path);
          return JSON.parse(file);
        } catch (error) {
          await fs.promises.writeFile(this.path, JSON.stringify([]));
          return [];
        }
    }

    async getById(id) {
        try{
            const elements = await this.getAll();
            const element = elements.find((e) => e.id == id);
            return element;
        }catch (error){
            return error;
        } 
    }

    async save(element) {
        try{
            const elements = await this.getAll();
            element.id =
               elements.length === 0
                    ? 1
                    : elements[elements.length - 1].id + 1;
            elements.push(element);
            await fs.promises.writeFile(this.path, JSON.stringify(elements, null, 2));
            return elements;
        }catch(error){
            return error;
        } 
    }
  
}
  
  export { memoryContainer }; // type module
  
  // module.exports = { ContainerMemoria } // type commonjs (por defecto)