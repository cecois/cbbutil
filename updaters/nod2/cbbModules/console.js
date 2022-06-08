module.exports = {
        error: (m) => {
                return `${new Date().toISOString()} - 🚨 - ${m}`;
            } //error
            ,
        info: (m) => {
                console.log(`${new Date().toISOString()} - ℹ - ${m}`);
            } //error
    } //exports