import { Emitter } from "./eventemitter";
describe('test events', () => {
    it('用例1: on, emit, off 方法', function () {
        let i = 0;
        const emitter = new Emitter<number>();

        const handler = (num) => {
            i += num;
        };

        emitter.on('add i', handler);

        emitter.emit('add i', 2);
        emitter.emit('add i', -1);

        expect(i).toBe(1);

        emitter.off('add i', handler);

        emitter.emit('add i', 1);

        expect(i).toBe(1);
    });

    it('用例2: once 方法', function () {
        let i = 0;
        const emitter = new Emitter<number>();

        const handler = (num) => {
            i += num;
        };

        emitter.once('add i', handler);

        emitter.emit('add i', 2);
        emitter.emit('add i', -1);

        expect(i).toBe(2);
    });

    it('用例3：filter 方法', function () {
        const emitter = new Emitter<number>();

        // 生成新的 emitter, 丢弃所有 event data 小于 0 的结果
        const newEmitter = emitter.filter((num) => num > 0);

        let i = 0;

        const handler = (num) => {
            i += num;
        };

        newEmitter.on('add i', handler);

        newEmitter.emit('add i', 2); // 2
        // 下面这次 emit 将被丢弃
        newEmitter.emit('add i', -1); // 1

        expect(i).toBe(1);

        emitter.off('add i', handler);
        emitter.emit('add i', 1);

        expect(i).toBe(1);

    });
});