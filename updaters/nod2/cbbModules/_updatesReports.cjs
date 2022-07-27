            module.exports = {
                    default: (_eps) => {

                            const __ = require('underscore');

                                // get the ep IDs
                            let epNos = __.uniq(__.pluck(_eps, 'episode')); // uniq array of just the episode IDs

                            // per-ep we wanna summarize the bits
                            return epNos.map(epNo => {

                            // pull a sample to fix the slug and url
                                let epSample=_eps.find(e=>e.episode==epNo);

                            // pluck the bits
                                let epBits = __.pluck(_eps.filter(e => e.episode == epNo), 'bit');
                                // group by them
                                let epBitsGroup = __.groupBy(epBits);

                                // iterate over those keys (uniq bits)...
                                let bits_sum = __.keys(epBitsGroup).map(bit => {

                            // wutz the bit we're summarizing and how many of them are there (for this episode)
                                    return {bit:bit,count:epBits.filter(b=>b==bit).length}
                                });

                                // img if we can get it
                                let img = (epSample.slug_earwolf.indexOf('http') >=0)?'https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg':await
                                _DO_IMAGE
                                ("http://www.earwolf.com/episode/" +
                                epslug);

                                let payload= {
                                    episode: epNo,
                                    image: null,
                                    slug: epSample.slug_earwolf,
                                    ep_url: `http://www.earwolf.com/episode/${epSample.slug_earwolf}`,
                                    bits_sum: bits_sum
                                };

                                return {
                    messages: [],
                    errors: [],
                    payload: payload,
                    kill: {
                        killed: false,
                        killer: null
                    }
                }

                            });

                        } //default
                } //exports