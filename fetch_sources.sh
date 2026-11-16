#!/bin/sh
# Downloads the public-domain Bible sources used by gen_books.py into /tmp
curl -sL -o /tmp/KJVPCE.json https://raw.githubusercontent.com/scrollmapper/bible_databases/master/formats/json/KJVPCE.json
curl -sL -o /tmp/eng-kjv.osis.xml https://raw.githubusercontent.com/seven1m/open-bibles/master/eng-kjv.osis.xml
curl -sL -o /tmp/eng-web.usfx.xml https://raw.githubusercontent.com/seven1m/open-bibles/master/eng-web.usfx.xml
