import { mySetInterval, myClearInterval } from './mysetInterval';
describe('test mySetTimeout', () => {
    test('用例1: 功能case', function (done) {
        let count = 0;

        const timer = mySetInterval(() => {
            count++;
        }, 100);

        setTimeout(() => {
            expect(count).toBe(2);

            myClearInterval(timer);

        }, 250);

        setTimeout(() => {
            expect(count).toBe(2);
            done();
        }, 350);

    });

    test('用例2: mySetInterval 允许多次调用', function (done) {

        let count = 0;

        // 同时设置两个计时器
        const timer1 = mySetInterval(() => {
            count++;
        }, 100);


        const timer2 = mySetInterval(() => {
            count++;
        }, 100);


        // 250ms之后，count被累加了四次，清除计时器timer1
        setTimeout(() => {
            expect(count).toBe(4);
            myClearInterval(timer1);

        }, 250);

        // 350ms之后，只存在timer2, count累加一次，清除计时器timer2
        setTimeout(() => {
            expect(count).toBe(5);
            done();
            myClearInterval(timer2);
        }, 350);

        // count 数据不变化
        setTimeout(() => {
            expect(count).toBe(5);
            done();
        }, 450);

    });
});
