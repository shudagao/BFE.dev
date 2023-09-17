import { warpFunc } from './wrapFunc';

describe('test warpFunc', () => {
    const funX = function(...arg) {
        if (!arg.length) return 0;
        return arg.reduce((x, y)=> x + y);
    }

    test('入参应该是函数', () => {
        try {
            // @ts-ignore
            warpFunc();
        } catch(e) {
            expect(e.message).toBe('first param must be function');
        }
        try {
            // @ts-ignore
            warpFunc(1)(1)();
        } catch(e) {
            expect(e.message).toBe('first param must be function');
        }
    });

    test('调用', () => {
        expect(warpFunc(funX)()).toBe(0);
        expect(warpFunc(funX)(1)()).toBe(1);
        expect(warpFunc(funX)(1)(2)(3)(4)()).toBe(10);
    });
});