# MEAN-TYPESCRIPT-STARTER
**Current Version : 0.3.0**.   
This project using Express / Angular-Cli / NodeJS for web application development.  

## Index 

  * [Development Enviroment Setup](#development-enviroment-setup)
  * [Getting Start](#getting-start)
  * Angular Cli Development Guide Line
  * Node Express Development Line
  * Deploying ( Production & Dockerize )
  * [Project Documents](#project-documents)


## Development Enviroment Setup

1.   [Install MongoDB](https://www.mongodb.com/) - NoSql Database (This is optional , if you're sure you don't need a database)
2.   [Install Node.js](https://nodejs.org) - Server 

To check if you have installed NodeJs , open your Terminal (MAC) or CMD (Windows), you should able to see your node version.
I recommend you using **LTS version** of NodeJs
```sh
$ node -v
v8.12.0
```

3.   [Install Angular-Cli](https://github.com/angular/angular-cli) - Front-end frame-work for building Single Page Application

```sh
$ npm install -g @angular/cli
```

4.   Development Enviroment Check : ( ver. 0.3.0 )

```sh
$ ng version
```

```console
Angular CLI: 7.3.0
Node: 8.12.0
OS: darwin x64
Angular: 7.2.3
... animations, common, compiler, core, forms, http
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.13.0
@angular-devkit/build-angular     0.13.0
@angular-devkit/build-optimizer   0.13.0
@angular-devkit/build-webpack     0.13.0
@angular-devkit/core              7.3.0
@angular-devkit/schematics        7.3.0
@angular/cli                      7.3.0
@angular/compiler-cli             7.2.6
@ngtools/webpack                  7.3.0
@schematics/angular               7.3.0
@schematics/update                0.13.0
rxjs                              6.4.0
typescript                        3.2.4
webpack                           4.29.0
```

5.   [Install Gulp](https://gulpjs.com/) - Automate build work-flow (including typescript compiler / nodemon )

```sh
$ npm install -g gulp-cli
```

## Getting Start 

Open your terminal and locate to the mean-starter project folder and install the dependencies by using : 
```sh
$ npm install 
```

Run gulp to start the node server : 
```sh
$ gulp
```
Ater running this command , Browser-sync will open a new Chrome Tab for you on localhost:3000.
It will keep loading (known bug), kill the loading process and refresh it will be working fine. 
Browser-sync is proxying the localhost:7000 ( you can use this as well, but it will not auto refreshed while your Angular chages ).

Another Terminal , run : 
```sh
$ ng build --watch
```
This allows angular-cli to compile your Angular application into dist folder. 

If you need Mongo DB :
```sh
$ mongod
```
After installed mongodb in your compuer , you should put it into config.json 
Check [config.json](https://github.com/karocksjoelee/mean-ts-starter/blob/master/config.json).

Open Chrome and go to localhost:7000, this should render basic Angular App.



## Project Documents

- [Version Change Logs](www.github.com)


