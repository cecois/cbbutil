module.exports = {
        image: (epurl) => {

            const CHEERIO = require('cheerio'),
                AXIOS = require('axios'),
                CLOUDINARY = require('cloudinary').v2;

            return new Promise(function(resolve, reject) {
                // let imageAddress=epurl.indexOf('earwolf')>=0
                // ?epurl
                // :"https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg"
                // ;
                if (epurl.indexOf('earwolf') >= 0) {
                    AXIOS.get(epurl)
                        .then(function(response) {

                            // first check earwolf for the image
                            $ = CHEERIO.load(response.data)
                            let firstimgbxmigurl = $(".epimgbox").first().find("a > img").attr('src')

                            if (firstimgbxmigurl) {
                                let ear_img_url = firstimgbxmigurl
                                resolve(`cloudinary version of ${ear_img_url}`);
                                // if img send it to clou
                                // CLOUDINARY.uploader.unsigned_upload(ear_img_url, 'brqz4ggs', null, (e, d) => {
                                //     resolve(d.url);
                                // });
                            } else {
                                // if none resolve w/ generic
                                resolve('https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg')
                            }

                        })
                        .catch((error) => {
                            // resolve w/ generic
                            resolve('https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg');
                        });
                } //if.earwolf
                else{
                            resolve('https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg');
                }

            }); //promise

        }, //image
        default: (_cfg, _claxon) => {
                /*

                [
    {
        "episode": 9999,
        "image": "https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg",
        "slug": "dummy",
        "ep_url": "http://earwolf.com/episode/dummy",
        "bits_sum": [
            {
                "bit": "Dummy Bit 1",
                "count": 2
            }
        ]
    },
    {
        "episode": "https://some.paid.service/episode",
        "image": "https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg",
        "slug": "dummy",
        "ep_url": "https://some.paid.service/episode",
        "bits_sum": [
            {
                "bit": "Dummy Bit 2",
                "count": 2
            },
            {
                "bit": "Dummy Bit 3",
                "count": 1
            }
        ]
    }
]

                            {
                        "date": "2022-11-11T09:09:27:10Z",
                        "episodes_summary": "17 bits from 2 episodes (eps 782, 783)",
                        "query": "(episode:\"782\" OR episode:\"783\")",
                        "eps": ["782:::unique-stuff","783:::youtube-review"],
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

                const FS = require('fs'),
                    __ = require('underscore');

                return new Promise(async(RES, REJ) => {

                            // Get currEnT summaries
                            const timestamp = new Date().toISOString(),
                                currentIncomi = require(`../${_cfg.incomingFile}`),
                                count = currentIncomi.length,
                                uniqueEpisodes = __.uniq(__.pluck(currentIncomi, 'episode')),
                                query = `(${uniqueEpisodes.map(ep=>`episode:${ep}`).join(' OR ')})`
                        ;

                    let promises=uniqueEpisodes.map((ep)=>{

                        return new Promise(async(resolve, reject)=>{
                        let deezBits = currentIncomi.filter(b=>b.episode==ep);
                        // get a sample slug
                        let slug = deezBits[0].slug_earwolf;
                        // get a sample url
                        let url=ep.toString().indexOf('http')>=0?ep:`http://earwolf.com/episode/${slug}`;
                        // get counts per-bit
                        let bitGroups=__.groupBy(deezBits,'bit');

                    // let bits_sum=[];
                        let bits_sum=__.keys(bitGroups).map(bk=>{
                            return {bit:bk,count:bitGroups[bk].length};
                        })
                        
                        // get the image||default
                        let image = await module.exports.image(url).catch(e=>console.error(e));

                            resolve({
                            episode:ep,image:image,slug:slug,ep_url:url,bits_sum:bits_sum
                        });
                        }); //promise
                    })//uniqueepisodes.map

let R={
                        "date": timestamp,
                        "episodes_summary": `${count} bits from ${uniqueEpisodes.length} episodes`,
                        "query": query,
                        "reports":null};

                    R.reports = await Promise.all(promises)
                    .catch(e=>REJ(e))
                    // .then(r=>console.log("r🐊🐊🐊🐊🐊🐊🐊🐊🐊🐊", JSON.stringify(r)))
                    .then(r=>FS.writeFileSync('/tmp/update.json',JSON.stringify(R)))
                    .then(r=>RES(R));

        
                    // RES();
                }); //promise

            } //default
    } //exports