interface CancelablePromise<T> extends Promise<T> {
    cancel: () => void;
}

export function wrapToCancelPromise(originalPromise: Promise<any>): CancelablePromise<any> {
    let raceResolve: (value: unknown) => void = () => {};
    const newPromise = Promise.race([new Promise((resolve) => {
        raceResolve = resolve;
    }), originalPromise]);
    (newPromise as CancelablePromise<any>).cancel = () => {
        raceResolve(undefined);
    };
    return (newPromise as CancelablePromise<any>);
}