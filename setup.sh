#!/usr/bin/env bash
if [ "$(type -t brew)" ];
   then
        echo "Brew Already Installed now Installing node js"
            if [ "$(type -t node)" ];
             then
                  echo "Node Already Installed now Installing NPM"
             else
                  echo "node not installed in this machine please wait installing node via linux brew"
                  brew install node --without-npm
                  echo prefix=~/.npm-packages >> ~/.npmrc
                  curl -L https://www.npmjs.com/install.sh | sh
                  echo '# node path
                   export PATH="$HOME/.node/bin:$PATH"' >>~/.bashrc
            fi

            if [ "$(type -t cordova)" ];
               then
                    echo "cordova Already Installed now Installing bower"
               else
                    echo "cordova not installed in this machine please wait installing cordova via npm"
                    npm install -g cordova
            fi

            if [ "$(type -t bower)" ];
               then
                    echo "bower Already Installed starting to install project dependencies"
               else
                    echo "bower not installed in this machine please wait installing bower via npm"
                    npm install -g bower
            fi
            if [ -d "platforms" ]
              then
              echo "platforms already exist clearing plugins"
              sh ./uninstall.sh
            fi
            echo "Running install script"
            sh ./install.sh
   else
        echo "Brew not installed in this machine please wait installing linux brew"
        sudo apt-get install build-essential curl git python-setuptools ruby
        ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/linuxbrew/go/install)"
        sudo echo '# Brew path
             export PATH="$HOME/.linuxbrew/bin:$PATH"
             export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
             export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"' >>~/.bashrc
        echo "Brew Successfully Installed please close terminal window and run setup again :)"

fi
