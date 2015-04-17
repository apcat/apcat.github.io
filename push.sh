#!/bin/sh

API_KEY="AIzaSyD29klxLmGqbCPBLpSrUbgHVtqETsqmHmw"
SUBSCRIPTION_ID="APA91bGh6SVD7RTL2EGDav6YGAF6JCn4OE1GQwshzgiy2VysMhObxPieffzg2Ys5z5xrnLHmJBpWWa_LUYQXckLRj28y7xyT4N-G5VIN60j5lnmuPn5SGg-Q6IByOGuxp1zjmGwVyg44TrLO3-fCsInJ2wztIKPAkcIaidoAhnCJllHjul1j3q4"

curl --header "Authorization:key=$API_KEY" --header "Content-Type:application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"$SUBSCRIPTION_ID\"]}"
