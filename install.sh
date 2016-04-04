#!/usr/bin/env bash
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
cd www/
bower install
bower list