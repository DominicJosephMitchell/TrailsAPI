#!/bin/bash

API="http://localhost:4741"
URL_PATH="/nurse"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "nurse": {
      "nurse":"'"${nurse}"'",
      "town":"'"${TOWN}"'",
      "state":"'"${STATE}"'"

    }
  }'

echo


