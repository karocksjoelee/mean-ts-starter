# MEAN-TYPESCRIPT-STARTER
**Current Version : 0.2.0**.   
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
v8.9.4
```

3.   [Install Angular-Cli](https://github.com/angular/angular-cli) - Front-end frame-work for building Single Page Application

```sh
$ npm install -g @angular/cli
```

4.   Development Enviroment: ( ver. 1.2.0 ) 

```console
Angular CLI: 6.1.5
Node: 8.9.4
OS: darwin x64
Angular: 6.1.4
... animations, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.7.5
@angular-devkit/build-angular     0.7.5
@angular-devkit/build-optimizer   0.7.5
@angular-devkit/build-webpack     0.7.5
@angular-devkit/core              0.7.5
@angular-devkit/schematics        0.7.5
@angular/cli                      6.1.5
@ngtools/webpack                  6.1.5
@schematics/angular               0.7.5
@schematics/update                0.7.5
rxjs                              6.2.2
typescript                        2.7.2
webpack                           4.9.2
```

5.   [Install Gulp](https://gulpjs.com/) - Automate build work-flow (including typescript compiler / nodemon )

```sh
$ npm install -g gulp
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

Another Terminal , run : 
```sh
$ ng build --watch
```
This allows angular-cli to compile your angular application into dist folder. 

If you need Mongo DB ( In this project , we don't ) :
```sh
$ mongod
```
After installed mongodb in your compuer , you should put it into env-path.  
Check [config.json](www.github.com).

Open Chrome and go to localhost:7000, this should render basic Angular App.



## Project Documents

- [Version Change Logs](www.github.com)


