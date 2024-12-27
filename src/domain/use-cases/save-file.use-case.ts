import fs from 'fs';
export interface SaveFileUseCase {
    execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    fileContent: string;
    filePath?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {

    constructor() {}

    execute ({fileContent, filePath = 'outputs', fileName = 'table'}: SaveFileOptions): boolean{
        try{
            fs.mkdirSync(filePath, { recursive: true });
            fs.writeFileSync(`${filePath}/${fileName}.txt`, fileContent);
            return true;
        } catch (error) {
            return false;
        }
    }
}