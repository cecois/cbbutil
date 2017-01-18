#!/bin/bash
set -o nounset
set -o errexit

# URL=$1
URL=$(cat ~/Desktop/atmp/ear.html| grep CBB\-${1})

cd ~/Downloads

curl "${URL}" -O -H 'Pragma: no-cache' -H 'Accept-Encoding: identity;q=1, *;q=0' -H 'Accept-Language: en-US,en;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:45.0) Gecko/20100101 Firefox/45.0' -H 'Range: bytes=0-' -H 'Accept: */*' -H 'Referer: http://howl.fm/audio/playlists/4343/comedy-bang-bang-the-podcast' -H 'Connection: keep-alive' -H 'Cache-Control: no-cache' --compressed