// 很像 curry 但是不完全一样
export function warpFunc(func: (...args: any[]) => any) {
    if (typeof func !== 'function') {
        throw new Error('first param must be function');
    }
    const accumulatedArgs: any[] = [];
    return function warpedFunc(...args: any[]): any {
        accumulatedArgs.push(...args);
        if (args.length === 0) {
            return func(...accumulatedArgs);
        } else {
            // 留下这次用的参数下次还要用
            return warpedFunc;
        }
    }
}