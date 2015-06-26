#!/bin/bash

rm stripd/*.txt
# mkdir stripd

for i in $(ls *.html); do
	echo "running ${i}..."

	ep=$(cat ${i} | grep episode\ \#)
	so=$(cat ${i} | grep recordOutboundLink | grep http)

	echo "ep:"$ep"\r\n"
	echo "so:"$so"\r\n"

echo $ep"\r\n"$so > stripd/$(basename $i).txt

done

cat stripd/*.txt > stripd/master.txt