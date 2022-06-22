            module.exports = {
                    default: (m) => {
                        return m;
                    },
                    info:(m)=>{
                    	console.log(`${new Date().toLocaleString()} - INFO - ${m}`);
                    },
                    err:(m)=>{
                    	console.log(`${new Date().toLocaleString()} - ERROR - ${m}`);
                    }
                } //exports