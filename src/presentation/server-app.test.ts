import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';
describe('Test suite for server-app.ts', () => {
    const runOptions = {
        base: 3,
        limit: 5,
        showTable: false,
        name: 'custom-table',
        directory: 'custom-outputs'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options', () => {
        // const logSpy = jest.spyOn(console, 'log');
        // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
        

        // ServerApp.run(runOptions);
        // expect(logSpy).toHaveBeenCalledTimes(2);
        // expect(logSpy).toHaveBeenCalledWith('Server running...');
        // expect(logSpy).toHaveBeenCalledWith('File created');

        // expect(createTableSpy).toHaveBeenCalledTimes(1);
        // expect(createTableSpy).toHaveBeenCalledWith({base: runOptions.base, limit: runOptions.limit});
        
        // expect(saveFileSpy).toHaveBeenCalledTimes(1);
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     filePath: runOptions.directory,
        //     fileName: runOptions.name
        // });
    });

    test('should run with custom values mocks', () => {
        
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('table');
        const saveFile = jest.fn().mockReturnValue(true);
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFile;

        ServerApp.run(runOptions);

        expect(logMock).toHaveBeenCalledTimes(2);
        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({base: runOptions.base, limit: runOptions.limit});
        expect(saveFile).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            filePath: runOptions.directory,
            fileName: runOptions.name
        });
        expect(logMock).toHaveBeenCalledWith('File created');
        expect(logErrorMock).not.toHaveBeenCalled();

    });
});