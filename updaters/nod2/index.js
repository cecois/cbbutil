/*

A full rewrite of the CBB bittracker ingest op; 2022.June

*/

const {
    DateTime
} = require("luxon"),
    LUXON = DateTime, //alias DateTime
    RUNID = DateTime.now().toFormat('yyyy-LLL-dd'), //=> '2022-Aug-06's
    CS = require('./cbbModules/console'), //we don't need no winston round here
    CBBUTIL = require('./cbbModules/util')
BACKUP = require('./cbbModules/backup').default;

/*
                            _
                           /\ \
                           \ \ \
                           /\ \_\
                          / /\/_/
                         / / /
                        / / /
     ___________       / / /
 ___/__________/\  ___/ / /__
/__________    \ \/\__\/_/___\
\____\/    \____\/\/_________/

*/
const _I = () => {

        OPS.backup && CS.info(OPS.backup);
        process.exit();

        let backup = OPS.backup ? BACKUP() : null;

        OPS.incoming && console.log("OPS.incoming: ", OPS.incoming);
        OPS.audit && console.log("OPS.audit: ", OPS.audit);
        OPS.merge && console.log("OPS.merge: ", OPS.merge);
        OPS.elastify && console.log("OPS.elastify: ", OPS.elastify);
        OPS.summarize && console.log("OPS.summarize: ", OPS.summarize);
        OPS.sendupdates && console.log("OPS.sendupdates: ", OPS.sendupdates);

    } //_i

const OPS = {
    backup: true,
    incoming: false,
    audit: false,
    merge: false,
    elastify: false,
    summarize: false,
    sendupdates: false
}

_I();