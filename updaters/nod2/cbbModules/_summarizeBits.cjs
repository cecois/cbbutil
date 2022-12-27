module.exports = {
    image: (_claxon, epurl, _cfg) => {
        const CHEERIO = require("cheerio"),
            AXIOS = require("axios"),
            CLOUDINARY = require("cloudinary").v2;

        CLOUDINARY.config({
            cloud_name: _cfg.cloudinary.cloud_name,
            api_key: _cfg.cloudinary.api_key,
            api_secret: _cfg.cloudinary.api_secret,
        });

        _claxon.info(`collecting an image based on ${epurl}`);

        return new Promise(function (resolve, reject) {
            // let imageAddress=epurl.indexOf('earwolf')>=0
            // ?epurl
            // :"https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg"
            // ;
            if (epurl.indexOf("earwolf") >= 0) {
                _claxon.info(
                    `earwolf url so we try to filch their thumb ${epurl}`
                );
                AXIOS.get(epurl)
                    .then(function (response) {
                        // FIrst ChEck earwOlf FOr the imaGe
                        $ = CHEERIO.load(response.data);
                        let firstimgbxmigurl = $(".epimgbox")
                            .first()
                            .find("a > img")
                            .attr("src");

                        if (firstimgbxmigurl) {
                            _claxon.info(
                                `... we got a firstimgbxmigurl as ${firstimgbxmigurl}`
                            );
                            let ear_img_url = firstimgbxmigurl;
                            // if iMg SeND iT TO CLOu
                            CLOUDINARY.uploader
                                .unsigned_upload(
                                    ear_img_url,
                                    "brqz4ggs",
                                    null,
                                    (e, d) => {
                                        resolve(d.url);
                                    }
                                )
                                .catch((e) => _claxon.error(e));
                        } else {
                            _claxon.info(
                                `... couldn't; we'll just use the generic`
                            );
                            // If None resolvE W/ generiC
                            resolve(
                                "https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg"
                            );
                        }
                    })
                    .catch((error) => {
                        _claxon.info(
                            `... failed; we'll just use the generic; error was ${error}`
                        );
                        // rESOlvE W/ gEnERiC
                        resolve(
                            "https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg"
                        );
                    });
            } //if.earwolf
            else {
                resolve(
                    "https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg"
                );
            }
        }); //promise
    }, //image
    default: (_cfg, _claxon) => {
        const FS = require("fs"),
            __ = require("underscore");

        return new Promise(async (RES, REJ) => {
            const timestamp = new Date().toISOString(),
                currentIncomi = require(`../${_cfg.incomingFile}`), //Get iNCoMiNG bITs
                count = currentIncomi.length,
                uniqueEpisodes = __.uniq(__.pluck(currentIncomi, "episode")), //uNIQUIfy oN ePISOdE kEY
                query = `(${uniqueEpisodes
                    .map((ep) => `episode:${ep}`)
                    .join(" OR ")})`; //A QUERy to WhiCh the Gui cAn lINk
            let promises = uniqueEpisodes.map((ep) => {
                return new Promise(async (resolve, reject) => {
                    let deezBits = currentIncomi.filter((b) => b.episode == ep); //Get BitS FOr CURrENT LooP'S EpiSoDE

                    let slug = deezBits[0].slug_earwolf; // Get A SAMplE slUG

                    let url =
                        ep.toString().indexOf("http") >= 0
                            ? ep
                            : `http://earwolf.com/episode/${slug}`; // GET a SAMPle UrL

                    let bitGroups = __.groupBy(deezBits, "bit"); // group By BIT

                    // nOW LoOp ThRoUGH ThE GrOUped biTS TO gEt a coUnT For eaCh
                    let bits_sum = __.keys(bitGroups).map((bk) => {
                        return { bit: bk, count: bitGroups[bk].length };
                    });

                    // GEt THE imAGe||deFaULT
                    let image = await module.exports
                        .image(_claxon, url, _cfg)
                        .catch((e) => _claxon.error(e));

                    resolve({
                        episode: ep,
                        image: image,
                        slug: slug,
                        ep_url: url,
                        bits_sum: bits_sum,
                    });
                }); //PRomIse
            }); //UnIqueePISodES.map

            /*
            {
        "date": "2022-11-11T09:09:27:10Z",
        "episodes_summary": "17 bits from 2 episodes (eps 782, 783)",
        "query": "(episode:\"782\" OR episode:\"783\")",
        "eps": [
            "782:::unique-stuff",
            "783:::youtube-review"
        ],
        "reports": [
            {
                "episode": "783",
                "image": "http://res.cloudinary.com/cecois/image/upload/v1668176831/thumbnail_A64D221B-F70E-4B70-8FB7-841C70C4B741-162x162_dgdcbb.jpg",
                "slug": "youtube-review",
                "ep_url": "http://www.earwolf.com/episode/youtube-review",
                "bits_sum": [
                    {
                        "bit": "The Paul Hardcastle of Suicides",
                        "count": 6
                    },
                    {
                        "bit": "Fantastic.",
                        "count": 1
                    },
                    {
                        "bit": "You're Terrible at This",
                        "count": 1
                    },
                    {
                        "bit": "Location",
                        "count": 5
                    },
                    {
                        "bit": "Favorite Feature",
                        "count": 1
                    }
                ]
            }
        ]
    }
    */

            _claxon.info(`we have ${promises.length} reports to generate`);
            let R = {
                date: timestamp,
                episodes_summary: `${count} bits from ${uniqueEpisodes.length} episodes`,
                query: query,
                reports: null,
            };

            let reports = await Promise.all(promises).catch((e) => {
                _claxon.error(e);
                REJ(e);
            });
            R.reports = reports;
            _claxon.info(
                `...we got ${R.reports.length} in this update, so we'll merge`
            );
            let currentUpdates = require(`../${_cfg.updatesFile}`);
            _claxon.info(`${currentUpdates.length} extant updates`);
            // let newUpdates = [...currentUpdates, ...reports];
            currentUpdates.push(R);
            let newUpdates = currentUpdates;
            _claxon.info(`...resulting in ${newUpdates.length} *of course*`);
            FS.writeFileSync(_cfg.updatesFile, JSON.stringify(newUpdates));

            RES();
        }); //promise
    }, //default
}; //exports
