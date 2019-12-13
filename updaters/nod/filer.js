const __=require('underscore')
,FS=require('fs')
;

let G = JSON.parse(FS.readFileSync('/Users/ccmiller/Documents/bu/cbb/bu-geo.2019_December_06_Friday_08_32_04.json'));

__.each(G,(g)=>{
let nom = '~fail.fail';

switch (g.geometry.type.toUpperCase()) {
        case "POINT":
          nom="point."+g.properties.cartodb_id+'.geojson'
          break;
        case "POLYGON":
          nom="poly."+g.properties.cartodb_id+'.geojson'
          break;
        case "MULTIPOLYGON":
          nom="poly."+g.properties.cartodb_id+'.geojson'
          break;
        case "LINESTRING":
          nom="line."+g.properties.cartodb_id+'.geojson'
          break;
        case "MULTILINESTRING":
          nom="line."+g.properties.cartodb_id+'.geojson'
          break;
}//switch

FS.writeFileSync('/tmp/cbb-geoms/'+nom,JSON.stringify(g));

});//each