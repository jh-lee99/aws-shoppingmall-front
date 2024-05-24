#!/usr/bin/env sh
# set -eu
envsubst '${SHOP_HOST} ${SHOP_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec "$@"