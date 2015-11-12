#!/bin/sh

#pulls most recent stores from various services required for local access

loc="/Users/ccmiller/git/bitmap-local/src/offline"

# https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://feeds.soundcloud.com/users/soundcloud:users:4474692/sounds.rss&num=500
# curl "https://api.soundcloud.com/users/4474692/tracks.json?consumer_key=apigee" -o $loc"/"cbb_soundcloud.json
curl "https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://feeds.soundcloud.com/users/soundcloud:users:4474692/sounds.rss&num=1000" -o $loc"/"cbb_soundcloud.json
cp $loc"/"cbb_soundcloud.json /Users/ccmiller/Desktop/cbb/cbb_soundcloud.json

curl "http://comedybangbang.wikia.com/api/v1/Articles/List?limit=8445&callback=?" -o $loc"/"wikiaz.json
cp $loc"/"wikiaz.json /Users/ccmiller/Desktop/cbb/wikiaz.json

curl "https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://rss.earwolf.com/comedy-bang-bang&num=500" -o $loc"/"cbbrss.json
cp $loc"/"cbbrss.json /Users/ccmiller/Desktop/cbb/cbbrss.json
