#!/usr/bin/env bash
if [ "$(type -t cordova)" ];
   then
        echo "Starting the operation"
        cordova emulate android
   else
        echo "Cordova not installed in this machine please run setup.sh"
fi