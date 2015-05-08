#!/bin/sh

echo -n "Which episode number?"
read ep

echo "pulling for episode #"$ep

epjson=$(curl "http://localhost/cbb_prep.php?ep=$ep")

echo $epjson | python -m json.tool
echo $epjson | python -m json.tool | pbcopy