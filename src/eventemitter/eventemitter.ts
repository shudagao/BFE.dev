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


export class Emitter<T> implements IEmitter<T>{
  on(eventName: string, handler: (e: T) => void): void {
      throw new Error("Method not implemented.");
  }
  once(eventName: string, handler: (e: T) => void): void {
      throw new Error("Method not implemented.");
  }
  off(eventName: string, handler: (e: T) => void): void {
      throw new Error("Method not implemented.");
  }
  emit(eventName: string, e: T): void {
      throw new Error("Method not implemented.");
  }
  filter(fn: (e: T) => boolean): IEmitter<T> {
      throw new Error("Method not implemented.");
  }
}
