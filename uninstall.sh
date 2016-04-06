#!/usr/bin/env bash
if [ "$(type -t cordova)" ];
   then
    cordova plugin rm cordova-plugin-whitelist
    cordova plugin rm cordova-plugin-file
    cordova plugin rm cordova-plugin-http
    cordova plugin rm cordova-plugin-network-information
    cordova plugin rm cordova-plugin-networkinterface
    cordova plugin rm cordova-plugin-ping
    cordova plugin rm cordova-dns-plugin
    cordova plugin rm com-badrit-macaddress
    cordova plugin rm cordova-plugin-app-preferences
    cordova platform rm android
    cordova platforms ls
    cordova plugin list
   else
    echo "cordova is not installed try npm install -g cordova or run setup.sh"
fi