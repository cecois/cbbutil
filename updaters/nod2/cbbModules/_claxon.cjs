            module.exports = {
                    default: (m) => {
                        return m;
                    },
                    info:(m)=>{
                    	console.log(`${new Date().toLocaleString()} - INFO - ${m}`);
                    },
                    error:(m)=>{
                    	console.log(`${new Date().toLocaleString()} - ERROR - ${m}`);
                    }
                } //exports