# PHP Bulma Template
> PI - default-web.pi


## Features

- default-web.pi - PHP-Template



### Website Template 
> Websites Template / Win & PI 


## Download    

``` bash
$ git clone https://github.com/netwurm/default-web.pi.git

```



## Einrichten libwebp 

``` bash
# Autoconf Tools 
sudo apt-get install libtool automake autoconf nasm

# siehe auch Dokumentation Quelltext! 
# gulpfile.babel.js

# PI Install libwebp

apt-get install -y gcc make autoconf automake libtool libjpeg-dev libpng-dev
wget storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.0.3.tar.gz
tar -zxvf libwebp-1.0.3.tar.gz
cd libwebp-1.0.3
./configure
make
make install

```





## Installation

``` bash

# Install 
npm install

# zuerst ausführen
npm run convert

# BrowserSync 
npm run serve

# Dateien erzeugen 
npm run build

# Überwachen von Änderungen ohne BrowserSync
npm run watch

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
    * 10.09.2019 - Github 

## Meta
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Generic badge](https://img.shields.io/badge/BULMA-PHP-GREEN.svg)](https://github.com/netwurm/Bulma-PHP-Template)
[![Generic badge](https://img.shields.io/badge/GitHub-Repository-GREEN.svg)](https://github.com/netwurm/Bulma-PHP-Template)

 

Distributed under the MIT license. See ``LICENSE`` for more information Netwurm ;o) 
