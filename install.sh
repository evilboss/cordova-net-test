#!/usr/bin/env bash
if [ "$(type -t cordova)" ];
   then
        cordova platform add android
        cordova plugin add cordova-plugin-whitelist
        cordova plugin add cordova-plugin-http
        cordova plugin add cordova-plugin-network-information
        cordova plugin add cordova-plugin-networkinterface
        cordova plugin add cordova-plugin-ping
        cordova plugin add cordova-dns-plugin
        cordova plugin add com-badrit-macaddress
        cordova platforms ls
        cordova plugin list
        if [ "$(type -t bower)" ];
              then
                  cd www/
                  bower install
                  bower list
              else
                echo "bower is not installed try npm install -g bower or run setup.sh"
        fi
 else
        echo "cordova is not installed try npm install -g cordova or run setup.sh"
fi