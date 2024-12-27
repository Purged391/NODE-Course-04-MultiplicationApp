import { SaveFile } from './save-file.use-case';
import fs from 'fs';
describe('save-file.use-case', () => {
    const customOptions = {
        fileContent: 'content',
        filePath: 'custom-outputs',
        fileName: 'custom-table-name'
    };

    const customFilePath = `${customOptions.filePath}/${customOptions.fileName}.txt`;
    
    afterEach(() => {
        const outputFolderExist = fs.existsSync('outputs');
        if (outputFolderExist) fs.rmSync('outputs', { recursive: true });
        const customOutputFolderExist = fs.existsSync(customOptions.filePath);
        if (customOutputFolderExist) fs.rmSync(customOptions.filePath, { recursive: true });

    });

    


    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'content'
        };
        const result = saveFile.execute(options);
        expect(result).toBeTruthy();
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {
        const result = new SaveFile().execute(customOptions);
        expect(result).toBeTruthy();

        const checkFile = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, 'utf-8');
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should return false when error occurs if directory could not be created', () => {
        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {throw new Error('Error creating directory'); }
        );
        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        expect(result).toBeFalsy();

        mkdirMock.mockRestore();
    });

    test('should return false when error occurs if file could not be created', () => {
        const writeMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('Error creating file');
        });
        const saveFile = new SaveFile();

        const result = saveFile.execute({ fileContent: 'content'});
        expect(result).toBeFalsy();
        writeMock.mockRestore();
    });
});