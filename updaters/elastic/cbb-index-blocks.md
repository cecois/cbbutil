# delete index
curl -XDELETE 'http://milleria.org:9200/cbb/'

# PUT new index
curl -XPUT 'milleria.org:9200/cbb?pretty' -H 'Content-Type: application/json' -d'

curl -u 'ccmiller:6t7S8w@Ui4b%' -XPUT 'https://search-cbb-wxjx2uda6c4c7uhvc7c7eocdwu.us-east-1.es.amazonaws.com/cbb' -H 'Content-Type: application/json' -d'{"settings":{"analysis":{"tokenizer":{"comma":{"type":"pattern","pattern":","}},"analyzer":{"comma":{"type":"custom","tokenizer":"comma","filter":["lowercase","trim"]}}}},"mappings":{"bit":{"properties":{"bit":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"created_at":{"type":"date"},"elucidation":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"episode":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"episode_guests":{"type":"keyword","fields":{"comma_del":{"type":"text","analyzer":"comma","fielddata":true}}},"episode_title":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"holding":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"instance":{"type":"text","fields":{"keyword":{"type":"keyword"}}},"location_id":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"location_type":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"slug_earwolf":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"tags":{"type":"keyword","fields":{"comma_del":{"type":"text","analyzer":"comma","fielddata":true}}},"tend":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"tstart":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"updated_at":{"type":"date"}}}}}'


# PUT new index Elastic 7.x
curl -XDELETE 'milleria.org:9200/cbb?pretty' -H 'Content-Type: application/json'

curl -XPUT 'http://milleria.org:9200/cbb' -H 'Content-Type: application/json' -d'{"mappings": {"properties": {"episode":{"type":"text"},"tstart":{"type":"text"},"tend":{"type":"text"},"instance":{"type":"keyword"},"bit":{"type":"keyword"},"elucidation":{"type":"keyword"},"location_type":{"type":"text"},"location_id":{"type":"integer"},"updated_at":{"type":"date"},"created_at":{"type":"date"},"slug_earwolf":{"type":"text"},"episode_title":{"type":"keyword"},"episode_guests":{"type":"keyword"},"tags":{"type":"keyword"}}}}'


# PUT new index Elastic 7.x
## prior version keyword fields don't work
## no mappings - dynamic mappings

curl -XDELETE 'milleria.org:9200/cbb?pretty' -H 'Content-Type: application/json'

curl -XPUT 'http://milleria.org:9200/cbb'