module.exports = {
        default: async (_cfg, _runid,_claxon) => {

const ELASTIC = require('elasticsearch');

            // rETurn oB
            let r = {
                    messages: [],
                    errors: [],
                    payload: null,
                    kill: {
                        killed: false,
                        killer: null
                    }
                },
                msg = null;
                
                const client = new ELASTIC.Client({
                    host: 'milleria.org:9200',
                    requestTimeout: Infinity
                });

                let del = await client.deleteByQuery({
                        index: 'cbb',
                        q: '*:*'
                    });

                    console.log("del", del);
                msg = `delete op reports ${del}`;
                r.messages.push(_claxon.info(msg));

                return new Promise((resolve,reject)=>{
                    resolve(r);
                })

        }//default
    } //exports