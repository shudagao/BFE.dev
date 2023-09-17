import { wrapToCancelPromise } from './cancelablePromise';
import { delay } from '../utils';

describe('test cancelablePromise', () => {
    test('取消Promise', async function () {
        let i = 1;

        async function test() {
            await delay(500);
            i ++;
        }
        const cancelablePromise = wrapToCancelPromise(test());

        setTimeout(() =>{
            cancelablePromise.cancel();
        }, 200);

        const result = await cancelablePromise;
        expect(result).toBe(undefined);

        expect(i).toBe(1);
    });

    test('取消时机较晚', async function () {

        let i = 1;

        async function test() {
            await delay(200);
            i++;
        }

        const cancelablePromise = wrapToCancelPromise(test());

        setTimeout(() =>{
            cancelablePromise.cancel();
        }, 500);

        await cancelablePromise;

        expect(i).toBe(2);
    });

    test('异常处理', async function () {

        let i = 1;

        const err = new Error('test error');

        async function test() {
            await delay(200);
            throw err;
        }

        const cancelablePromise = wrapToCancelPromise(test());

        setTimeout(() =>{
            cancelablePromise.cancel();
        }, 500);

        try {
            await cancelablePromise;
        } catch (e) {
            expect(e).toBe(err);
        }
    });
});