import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number,
    limit: number,
    showTable: boolean,
    name: string,
    directory: string
}


export class ServerApp {
    static run({base, limit, showTable, name, directory}: RunOptions) {
        console.log('Server running...');
        
        const table = new CreateTable()
            .execute({base, limit});
        const wasCreated = new SaveFile().execute({
            fileContent: table,
            filePath: directory,
            fileName: name
        });

        if (showTable) console.log(table);
        (wasCreated)
        ? console.log('File created')
        : console.log('Error creating file');
    }
}