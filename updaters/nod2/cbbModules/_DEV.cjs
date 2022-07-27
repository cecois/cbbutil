            module.exports = {
                    default: (_cfg, _claxon) => {
                        let errors=[];

                            _claxon.info(`promising _dev...`)

                            return new Promise((RES, REJ) => {

                                let Things = ["children", "eldery", "therest"]
                                for (var i = Things.length - 1; i >= 0; i--) {
                                    errors.push(Things[i])
                                }

                                // errors.length > 0 && REJ(errors.join('; '));
                                RES(`success from _DEV`);

                            }); //promise
                        } //default
                } //exports