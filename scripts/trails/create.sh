#!/bin/bash

API="http://localhost:4741"
URL_PATH="/trails"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "trail": {
      "trail":"'"${TRAIL}"'",
      "town":"'"${TOWN}"'",
      "state":"'"${STATE}"'"

    }
  }'

echo


