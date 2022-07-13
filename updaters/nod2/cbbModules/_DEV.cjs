            module.exports = {
                    default: () => {
                        // rETurn oB
            let r = {
                    messages: [],
                    errors: [],
                    payload: null,
                    kill: {
                        killed: false,
                        killer: null
                    }
                };

let Things=["children","eldery","therest"]
                for (var i = Things.length - 1; i >= 0; i--) {
                    r.errors.push(Things[i])
                }

                r.errors.reverse();return r;
                    }
                } //exports