
const runCommand = async(args: string[]) => {
    process.argv = [...process.argv , ...args];
    const {yarg} = await import('./args.plugin');
    return yarg;
};

describe('Test suite for args.plugin.ts', () => {

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async() => {
        const argv = await runCommand(['-b', '3']);
        expect(argv).toEqual( expect.objectContaining(
            {
                b: 3,
                l: 10,
                s: false,
                n: 'table',
                d: 'outputs',
            }
        ));
    });

    test('should return custom values', async() => {
        const argv = await runCommand(['-b', '3', '-l', '5', '-s', '-n', 'custom-table', '-d', 'custom-outputs']);
        expect(argv).toEqual( expect.objectContaining(
            {
                b: 3,
                l: 5,
                s: true,
                n: 'custom-table',
                d: 'custom-outputs',
            }
        ));
    });
});