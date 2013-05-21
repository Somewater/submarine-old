for f in *.ogg; do 
  echo "file $f"
  ogg123 -d raw -f /dev/stdout "$f" | lame -V2 -r -h - ${f/ogg/mp3} 
done
