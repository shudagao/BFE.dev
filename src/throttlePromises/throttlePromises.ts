function throttlePromises(funcs: string | any[], max: number) {
    let results: any[] = [];
    return new Promise((resolve, reject) => {
        let runningCount = 0;
        let queue = [...funcs];
        function run() {
            while(runningCount<max && queue.length > 0) {
                const fn = queue.shift();
                runningCount++;
                fn().then((data: any) => {
                    runningCount--;
                    results.push(data)
                    run();
                }).catch((err: any) => reject(err));
            }
            if (results.length === funcs.length) {
                resolve(results)
            }
        }
        run();
    });
}