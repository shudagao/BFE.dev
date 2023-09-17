interface IEmitter<Event>{
    // 注册事件监听函数
    on(eventName: string, handler: (e: Event) => void): void;

    // 注册事件监听函数，仅执行一次
    once(eventName: string, handler: (e: Event) => void): void;

    // 取消注册
    off(eventName: string, handler: (e: Event) => void): void;

    // 触发事件
    emit(eventName: string, e: Event): void;

    // 过滤当前所有的事件监听函数，生成一个新的 Emitter
    filter(fn: (e: Event) => boolean): IEmitter<Event>;
}

interface EventListener {
    callback: (e: any) => any,
    isOnce: boolean,   
}

export class Emitter<T> implements IEmitter<T>{
    private listenerMap: Map<string, Map<string, EventListener>> = new Map();

    constructor(listenerMap: Map<string, Map<string, EventListener>> = new Map<string, Map<string, EventListener>>()) {
        this.listenerMap = listenerMap;
    }

    on(eventName: string, handler: (e: T) => void): void {
        const eventkey = `${eventName}`;
        const listenerKey = handler.toString();
        if (!this.listenerMap.has(eventkey)) {
            this.listenerMap.set(eventkey, new Map<string, EventListener>());
        }
        this.listenerMap.get(eventkey)?.set(listenerKey, {
            isOnce: false,
            callback: handler,
        });
    }

    once(eventName: string, handler: (e: T) => void): void {
        const eventkey = `${eventName}`;
        const listenerKey = handler.toString();
        if (!this.listenerMap.has(eventkey)) {
            this.listenerMap.set(eventkey, new Map<string, EventListener>());
        }
        this.listenerMap.get(eventkey)?.set(listenerKey, {
            isOnce: true,
            callback: handler,
        });
    }

    off(eventName: string, handler: (e: T) => void): void {
        const eventkey = `${eventName}`;
        const listenerKey = handler.toString();
        if (!this.listenerMap.has(eventkey)) {
            return;
        }
        this.listenerMap.get(eventkey)?.delete(listenerKey);
    }

    emit(eventName: string, e: T): void {
        const eventkey = `${eventName}`;
        if (!this.listenerMap.has(eventkey)) {
            return;
        }
        const callbackMap = this.listenerMap.get(eventkey);
        for (const listenerKey of callbackMap!.keys()) {
            const callbackObj = callbackMap?.get(listenerKey);
            if (callbackObj) {
                callbackObj.callback(e);
                if (callbackObj.isOnce) {
                    this.off(eventName, callbackObj.callback);
                }
            }
        }
    }

    filter(fn: (e: T) => boolean): IEmitter<T> {
        const newListenerMap: Map<string, Map<string, EventListener>> = new Map();
        for (const eventkey of this.listenerMap.keys()) {
            const callbackMap = this.listenerMap.get(eventkey);
            const newCallbackMap = new Map<string, EventListener>();
            for (const listenerKey of callbackMap!.keys()) {
                const callbackObj = callbackMap?.get(listenerKey);
                if (callbackObj) {
                    newCallbackMap.set(listenerKey, {
                        callback: (e: T) => {
                            if (!fn(e)) {
                                return;
                            }
                            callbackObj.callback(e);
                        },
                        isOnce: callbackObj.isOnce,
                    })
                }
            }
            newListenerMap.set(eventkey,newCallbackMap);
        }
        return new Emitter(newListenerMap);
    }
}
