function mockRequest(url: any, body: { id: any; }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${url}_${body.id}`);
      }, 1000);
    });
  }
  
function createRequest({ poolNumber, isCache }: {
    poolNumber: number, isCache: boolean
}) {
    const visited = new Map();
    let lastPoolNumber = poolNumber;
    const requestQueue: { resolve: any; reject: any; url: any; body: any; }[] = [];
    return function request(url: any, body: { id: any; }) {
        return new Promise((resolve, reject) => {
            const key = `${url}_${body.id}`;
            if (isCache && visited.has(key)) {
                resolve(visited.get(key));
            }

            if (lastPoolNumber === 0) {
                requestQueue.push({ resolve, reject, url, body });
                return;
            }

            lastPoolNumber--;
            mockRequest(url, body)
                .then((v) => {
                    visited.set(key, v);
                    resolve(v);
                })
                .catch((e) => {
                    reject(e);  
                })
                .finally(() => {
                    lastPoolNumber++;
                    if (requestQueue.length > 0) {
                        const { url, body, resolve, reject } = requestQueue.shift()!;
                        request(url, body)
                            .then((v) => {
                                resolve(v);
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    }
                });
        });
    };
}
  
const request = createRequest({
    poolNumber: 5,
    isCache: true
});

for (let i = 0; i < 20; i++) {
    request("/url", { id: i }).then(console.log);  
}
  