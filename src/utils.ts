export function delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
}

export function isNullOrUndef(val: any): boolean {
    return val === undefined || val === null;
}
