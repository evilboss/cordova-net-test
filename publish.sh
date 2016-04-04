#!/usr/bin/env bash
path=$PWD
cd platforms/android/build/outputs/apk/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $path/cs-network-tester.keystore android-release-unsigned.apk cs-network-tester
$ANDROID_HOME/build-tools/23.0.1/zipalign 4 \android-release-unsigned.apk $path/build/cs-network-tester.apk