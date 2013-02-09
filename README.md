# Hullagram

This is a fully contained demo of what you can achieve with hull.

* Login with Twitter
* Upload photos
* Like them
* Comment on them
* See what friends of yours use the app
* Get the public activity feed
* See what your friends have done

Best of all, it has no server code and barely any Javascript.
Prepare to be amazed.

The steps below are tailored for Mac environments :
Linux should mostly work the same.

## Installing

First, clone this repository :

    git clone git://github.com/hull/hullagram.git

Install [node.js](http://nodejs.org)

[grunt-cli](https://github.com/gruntjs/grunt-cli) as a global module.
It's amazing so you should do it anyways.

    [sudo] npm install grunt-cli -g
    [sudo] npm install bower -g

then install grunt and it's modules in the project's folder.

    cd hullagram/
    npm install
    bower install



## Running the app

### To run the app locally, run:

    grunt server

## Deployment

First create your heroku app if it's not done yet :

    heroku create your_amazing_app

Build your app for deployement, and commit the compiled version:

    grunt build
    git add dist
    git commit -m "Deployment build"

Deploy your app to heroku:

    git subtree push --prefix dist heroku master
    open http://your_amazing_app.herokuapp.com
