#!/usr/bin/env bash
set -euo pipefail

# Placeholder deploy script - complete cu sc-meta deploy când SC sunt gata
ROOT_DIR=$(cd "$(dirname "$0")/../.." && pwd)
CONF_DIR="$ROOT_DIR/config"
mkdir -p "$CONF_DIR"

echo '{
  "network": "testnet",
  "contracts": {
    "heroNft": "",
    "questEngine": "",
    "marketplace": ""
  }
}' > "$CONF_DIR/testnet.json"

echo "Config testnet.json generat în $CONF_DIR"
