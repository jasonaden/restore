


export function promiseError(mess) {
    return (err) => {
        console.log("error in", mess, err);
        Promise.reject(err);
    }
}