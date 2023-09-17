async function wrap1(next) {
    console.info('1');
    await next();
    console.info('1 end');
    return Promise.reject('end wrap');
}

async function wrap2(next) {
    console.info('2');
    await next();
    console.info('2 end');
}

async function wrap3(next) {
    console.info('3');
    await next();
    console.info('3 end');
}

async function wrap4(next) {
    await new Promise((res) => {
        setTimeout(() => {
            console.info('inner');
            res();
        }, 1000);
    });
    await next();
}

const middlewares = [wrap1, wrap2, wrap3, wrap4];
async function handleNext() {
    if (middlewares.length === 0) {
        return;
    }
    let count = 0;
    // so easy
    async function next() {
        count ++;
        if (count < middlewares.length) {
            await middlewares[count](next);
        }
    }
    await middlewares[0](next);
}

handleNext();