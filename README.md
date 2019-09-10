# PHP Bulma Template
> PI - default-web.pi


## Features

- default-web.pi - PHP-Template



### Website Template 
> Websites Template / Win & PI 


## Download

``` bash
# 1.) Erstelle ein Verzeichnis -> www Path WAMP-Server
# 2.) dann per "git clone ...." Daten reinladen
$ git clone https://github.com/netwurm/Bulma-PHP-Template.git

# in das Verzeichnis wechseln und Installation per npm beginnen 
$ cd Bulma-PHP-Template\

```

## Installation

``` bash
# Install 
npm install

# 1.) Copy node_modules/bulma/ nach 'src/sass/ 2.)
npm run convert

# BrowserSync 
npm run serve

# Dateien erzeugen 
npm run build

# Überwachen von Änderungen ohne BrowserSync
npm run watch

```

## Einrichten libwebp

``` bash
# siehe auch Dokumentation Quelltext! 
# gulpfile.babel.js

PI Install libwebp

apt-get install -y gcc make autoconf automake libtool libjpeg-devel libpng-devel
wget storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.0.3.tar.gz
tar -zxvf libwebp-1.0.3.tar.gz
cd libwebp-1.0.3
./configure
make
make install

```

## Run Optionen 

``` bash
$ npm run
Scripts available in Template_PHP_Bulma via `npm run-script`:
  build
    gulp
  serve
    gulp serve
  watch
    gulp watch
  convert
    gulp convert
	
```
## Version
 
* 1.0.0
    * 10.09.2019 - Github (Beta - online) 

## Meta
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Generic badge](https://img.shields.io/badge/BULMA-PHP-GREEN.svg)](https://github.com/netwurm/Bulma-PHP-Template)
[![Generic badge](https://img.shields.io/badge/GitHub-Repository-GREEN.svg)](https://github.com/netwurm/Bulma-PHP-Template)

 

Distributed under the MIT license. See ``LICENSE`` for more information Netwurm ;o) 
