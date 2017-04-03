let utils = {
    times(length, fn) {
        return Array.from({length}, (u,i) => fn(i));
    },

    serialize(o, m = '&') {
        let s = [], e = encodeURIComponent;
        for (let p in o) o.hasOwnProperty(p) && s.push(e(p)+'='+e(o[p]));
        return s.join(m);
    }
}
