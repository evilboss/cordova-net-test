#!/usr/bin/env bash
path=$PWD
if [ -f platforms/android/build/outputs/apk/android-release-unsigned.apk ]
then
     echo "android-release-unsigned.apk - Found, Starting to publish"
     cd platforms/android/build/outputs/apk/
     jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $path/cs-network-tester.keystore android-release-unsigned.apk cs-network-tester
     if [ -f $path/build/cs-network-tester.apk ]
     then
          echo "File already exist -- Removing previous apk build"
          rm $path/build/cs-network-tester.apk
     else
          echo "Creating cs-network-tester.apk"
     fi
     $ANDROID_HOME/build-tools/23.0.1/zipalign 4 \android-release-unsigned.apk $path/build/cs-network-tester.apk
     echo "Success apk generated to build directory"


else
   echo "android-release-unsigned.apk - Not found, please run build.sh"
fi
