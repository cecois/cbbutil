module.exports = {
        default: () => {

            let currentMaster = require(`../${CONFIG.masterFile}`);

            let d = `cbb.master-${MOMENT().format('YYYY-MM-DDTHH')}.json`
            console.log(`backing up ${currentMaster.length} bits from ${CONFIG.masterFile} as ${d}...`)

            FS.writeFileSync(`${CONFIG.budirBits}/${d}`, JSON.stringify(currentMaster))

        }
    } //exports