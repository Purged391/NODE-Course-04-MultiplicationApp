import { ServerApp } from './presentation/server-app';

describe('Test App.js', () => {
 test('should call Server.run with values', async() => {
       const severRunMock = jest.fn();
       ServerApp.run = severRunMock;
       process.argv = ['node', 'src/app.ts', '-b', '10', '-l', '10', '-s', '-n', 'test', '-d', 'test'];
       await import('./app');

       expect(severRunMock).toBeCalledWith({ base: 10, limit: 10, showTable: true, name: 'test', directory: 'test' });
});
});