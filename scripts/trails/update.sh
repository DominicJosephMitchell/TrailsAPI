#!/bin/bash

API="http://localhost:4741"
URL_PATH="/trails"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
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
