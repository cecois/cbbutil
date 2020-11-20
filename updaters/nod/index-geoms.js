const __ = require('underscore'),
	FS = require('fs'),
	CONFIG = require("./Config.json"),
	ELASTIC = require('elasticsearch');



const _GEOMFILES = async(ln) => {
		let geomfiles = await FS.readdirSync(CONFIG.geomdir)
		return new Promise(function(resolve, reject) {

			console.log(`${geomfiles.length} geometries`);
			resolve(
				__.reject(geomfiles, g => {
					return g.indexOf('.') == 0
				})
			)

		}); //promise
	} //GEOMFILES



// ........................ #   #    #    ####    ###   #####   ###   #   #   ###
// ........................ #   #   # #   #   #  #   #  #      #   #  #   #  #   #
// ........................ ## ##  #   #  #   #  #      #      #   #  ## ##  #
// ........................ # # #  #   #  ####   #      ####   #   #  # # #   ###
// ........................ #   #  #####  #      #  ##  #      #   #  #   #      #
// ........................ #   #  #   #  #      #   #  #      #   #  #   #  #   #
// ........................ #   #  #   #  #       ###   #####   ###   #   #   ###

const _MAPGEOMS = async(geoms) => {

		// console.log("geoms", geoms);
		let edocs = []
		return new Promise(function(resolve, reject) {

			__.each(geoms, (G, i, l) => {

					console.log(`processing ${G}...`);

					let GC = JSON.parse(FS.readFileSync(CONFIG.geomdir + G))
						// console.log("GC", GC);

					// console.log(CONFIG.geomdir + G)
					// return G;
					edocs.push({
							fn: G,
							gname: GC.properties.name ? GC.properties.name : null,
							ganno: GC.properties.anno ? GC.properties.anno : null,
							gnb: GC.properties.nb ? GC.properties.nb : null
						}) //.push

					if (i == l.length - 1) {
						resolve(edocs)
					}

				}) //map



		}); //promise
	} //MAPGEOMS


// ++++++++++++++++++++++++++++  ______ _                _____ _______ _____ ________     __
// ++++++++++++++++++++++++++++ |  ____| |        /\    / ____|__   __|_   _|  ____\ \   / /
// ++++++++++++++++++++++++++++ | |__  | |       /  \  | (___    | |    | | | |__   \ \_/ /
// ++++++++++++++++++++++++++++ |  __| | |      / /\ \  \___ \   | |    | | |  __|   \   /
// ++++++++++++++++++++++++++++ | |____| |____ / ____ \ ____) |  | |   _| |_| |       | |
// ++++++++++++++++++++++++++++ |______|______/_/    \_\_____/   |_|  |_____|_|       |_|
const _ELASTIFY = async(J) => {

		return new Promise((resolve, reject) => {


				var client = new ELASTIC.Client({
					host: 'milleria.org:9200',
					requestTimeout: Infinity
						// ,log: 'trace'
				});

				let dat = J
				if (!dat) {
					console.log(err);
					process.exit();
				}

				let mapd = __.map(dat, (d) => {
					let no = [{
						"index": {}
					}, {
						fn: d.fn,
						gname: d.gname,
						ganno: d.ganno,
						gnb: d.gnb
    }]

					return no;
				})


				let prefixes = [];

				for (var i = mapd.length - 1; i >= 0; i--) {
					prefixes.push({
						"index": {}
					})
				}

				let mapz = __.zip(__.map(prefixes, (p) => {
					return p[0]
				}), mapd)

				// FSND.writeFileSync('/tmp/cbb_geoms.fndjson',__.compact(__.flatten(mapz)));

				client.bulk({
						index: 'cbb_geoms',
						type: '_doc',
						body: __.compact(__.flatten(mapz))
					}, {
						ignore: [404],
						maxRetries: 3
					}, (err, result) => {
						if (err) console.log(err)
					})
					.then(res => resolve(res));


			}) //promise

	} //_elastify


const main = async() => {

		// get all local *.geojson backups
		let geomfiles = await _GEOMFILES();


		let geomfilesMapped = await _MAPGEOMS(geomfiles)
		console.log("geomfilesMapped", geomfilesMapped);

		const clientTemp = new ELASTIC.Client({
			host: 'milleria.org:9200',
			requestTimeout: Infinity
		});

	await clientTemp.deleteByQuery({
		index: 'cbb_geoms',
		q: '*:*'
	});

	const E = await _ELASTIFY(geomfilesMapped);

	} //main

main();