#!/bin/bash

openssl req \
-newkey rsa:2048 \
-x509 \
-nodes \
-keyout localhost.key \
-new \
-out localhost.crt \
-subj /CN=localhost \
-reqexts SAN \
-extensions SAN \
-config localhost.conf \
-sha256 \
-days 3650
openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.crt
openssl verify -CAfile localhost.crt localhost.crt
