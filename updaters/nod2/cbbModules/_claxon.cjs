            module.exports = {
                    default: (m) => {
                        return m;
                    },
                    info:(m)=>{
                    	let mm = `${new Date().toLocaleString()} - INFO - ${m}`;
                        console.log(mm);
                        return mm;
                    },
                    error:(m)=>{
                    	let mm = `${new Date().toLocaleString()} - ERROR - ${m}`;
                        console.log(mm);
                        return mm;
                    }
                } //exports