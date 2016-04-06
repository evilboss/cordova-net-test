#!/usr/bin/env bash
read -p "Setup will set path to $sdkpath Are you sure about this? [Y/N]" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Changing Android SDK path"
        if grep -q '# Android Path"
          ' ~/.bashrc;
       then
       #echo "# Android Path
        #    export ANDROID_HOME=$HOME/android-sdk-linux
         #   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools"  >>~/.bashrc
        echo "SDK Changed"
       else
       echo "Already setup :)"
     fi
else
    echo "SDK Setup ABORTED!"
fi
