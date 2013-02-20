-----------------------
# About this project

This project is built on the Hull platform, with [Aura](github.com/aurajs/aura), [Backbone.js](https://github.com/documentcloud/backbone) and lots of other cool libraries.

**You don't need an account on Hull to use it locally, the App key is already present in this app.**

Implement cool features (see the last paragraph for ideas), improve the repo and we'll give you an early access to Hull so you can build your own apps !


-----------------------
# Hullagram

[View demo (http://gram.hull.io/)](http://gram.hull.io/)

We use [Ratchet](http://maker.github.com/ratchet/), so it will work only on Webkit browsers, iOS and Android.

This is a fully contained demo of what you can achieve with hull.

* Login with Twitter
* Upload photos
* Like them
* Comment on them
* List you Twitter friends who also use the app
* Get the public activity feed
* See what your friends have done

Best of all, it has no server code and barely any Javascript.
Prepare to be amazed.

The steps below are tailored for Mac environments :
Linux should mostly work the same.


## Installing

First, clone this repository :

    git clone git://github.com/hull/hullagram.git

Install [node.js](http://nodejs.org) (Only used for building the app, not needed for deployment)

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
    cd dist
    git init
    git add dist
    git commit -m "Deployment build"

Deploy your app to heroku:

    git subtree push --prefix dist heroku master
    open http://your_amazing_app.herokuapp.com
    
  
-----------------------
# Possible evolutions

Here are a few ideas for further improvement :

* Photo Filters
  With caman.js/vintage.js
  or https://github.com/kudakurage/CSS-PhotoEditor-for-iOS6 + svg foreignObject + canvas drawImage()

* Tapping once on an image in a feed could open a detail view
* Tapping on the likes count cell in a profile view could show likes
* Doubletapping an image could like/unlike it 
* Pull to refresh
* Add error handling to image uploads
* PushState support
