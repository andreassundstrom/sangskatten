#! /bin/bash

source_path="scores";
destination_path="api/src/Sangskatten.Api/wwwroot/scores"

# Clear folders
rm $destination_path/sheet/*
rm $destination_path/audio/*

# Reset index
echo '[]' > $destination_path/index.json

for file_path in $source_path/*.mscz; do
    if [ -f "$file_path" ]; then
        echo "Processing: $file_path"
        output_file_name=$(basename ${file_path} | sed 's/.mscz//g' | base64)
        
        echo "Filename: $file_name"
        musescore --export-to $destination_path/sheet/${output_file_name}.musicxml $file_path
        musescore --export-to $destination_path/audio/${output_file_name}.mp3 $file_path

        # Get title

        score_title=$(cat $destination_path/sheet/${output_file_name}.musicxml | grep -oPm1 "(?<=<work-title>)[^<]+")

        echo $(cat $destination_path/index.json | jq \
            --arg filename "${output_file_name}" \
            --arg title "${score_title}" \
            '. += [{filename: $filename, title: $title}]') \
            > $destination_path/index.json
    fi
done
