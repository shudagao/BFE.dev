import { safeGet } from "./safeget"; 

describe('test safeget', () => {
    let safeObj: any;
    beforeAll(() => {
        safeObj = safeGet({
            a: 'hello',
            b: { d: 'world' },
            c: [-100, 200, -300],
        });
    });
    test('add get', () => {
        expect(safeObj.a()).toBe('hello');
        expect(safeObj.c[0]()).toBe(-100);

        expect(safeObj.c[100]()).toBeUndefined();
        expect(safeObj.c[100](1234)).toBe(1234);
        expect(safeObj.d.e()).toBeUndefined();
        expect(safeObj.d.e('optional default value')).toBe('optional default value');
        expect(safeObj.y.z.a.b.c.d.e.f.g.h.i.j.k()).toBeUndefined();
    });
    test('add iterator', () => {
        expect(safeObj.c.map((e: any) => e())).toStrictEqual([-100, 200, -300]);
    });
});
  