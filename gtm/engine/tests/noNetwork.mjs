globalThis.fetch = () => { throw new Error("Network access is forbidden in offline tests"); };
