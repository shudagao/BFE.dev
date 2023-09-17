type Timer = number;

// 使用setTimeout实现setInterval
// write code here
const intervals = new Map();

export function mySetInterval(callback: (...args: any[]) => any, t: number): Timer | undefined {
    const id = Math.floor(Math.random() * 10000);
    intervals.set(id, setTimeout(function next() {
       intervals.set(id, setTimeout(next, t));
       callback();
    }, t));
    return id;
}

// 提示：使用clearTimeout
export function myClearInterval(timer: Timer) {
    if (!timer) {
        return;
    }
    clearTimeout(timer);
}