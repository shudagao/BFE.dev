const isObject = (obj: any) => obj && typeof obj === 'object';
const hasKey = (obj: any, key: string | symbol) => key in obj;

const Undefined: any = new Proxy(() => {}, {
    get: function(target, name){
        return Undefined;
    },
    apply: function(target, p, newValue) {
        if (newValue.length >= 1) {
            return newValue[0];
        }
        return undefined;
    }
});

export function safeGet(data: any): any {
    // write code here
    return new Proxy(data, {
        get: function(target, name){
            return hasKey(target, name)
                ? isObject(target[name])
                    ? safeGet(target[name])
                    : new Proxy(() => {}, {
                        get: () => target[name],
                        apply: (t, p, args) => {
                            if (typeof args[0] === 'function' && name === 'map') {
                                return target.map((v: any) => {
                                    return new Proxy(() => {}, {
                                        apply: () => v,
                                    });
                                }).map(args[0]);
                            }
                            return target[name];
                        }
                    })
                : Undefined;
        },
    });
}
  