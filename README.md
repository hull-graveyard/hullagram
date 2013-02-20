-----------------------
# About this project

This project is built on the Hull platform, with [Aura](github.com/aurajs/aura), [Backbone.js](https://github.com/documentcloud/backbone) and lots of other cool libraries.

**You don't need an account on [hull.io](http://hull.io) to use it locally, the `appId` is already present in this app.**

Implement cool features (see the last paragraph for ideas), contribute to this repo and we'll give you an early access to Hull so you can build and deploy your own apps !


-----------------------
# Hullagram
This is a fully contained demo of what you can achieve with [hull](http://hull.io).

[View demo (http://gram.hull.io/)](http://gram.hull.io/)

We use [Ratchet](http://maker.github.com/ratchet/), so it will work only on Webkit browsers, iOS and Android.


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


-----------------------

# Anatomy of Hullagram

Hullagram is built around a the following apis available on Hull

* [Activities](http://hull.io/docs/api/activities)
* [Resources](http://hull.io/docs/api/resources/)
* [Comments](http://hull.io/docs/api/comments/)
* [Likes](http://hull.io/docs/api/likes/)
* [Friendships](http://hull.io/docs/api/friendships/)

The code is a mix of [custom widgets](http://hull.io/docs/widgets/creating_widgets/) and [packaged widgets](http://hull.io/docs/widgets/packaged_widgets/) distributed via hull.
Most of the packaged widgets are skinned by [overriding default templates](http://hull.io/docs/widgets/overriding_templates/)

## Top level widgets

You can find an introduction on how Hull widgets work [here](http://hull.io/docs/widgets/introduction/).

The document body initially contains only 2 widgets :

* [hullagram](app/widgets/hullagram/main.hbs) is a container that displays the login screen if the current user is not connected, and the [app](app/widgets/app/main.js) widget if he is.
* [uploader](app/widgets/uploader/main.js) is used to display overlay notifications during file uploads.

Then when the user is connected via Twitter, the [app](app/widgets/app/main.js) widget take over the whole page and starts to act as the main controller.


## Screens


### \#/pictures

The first screen is the public activity feed of the app.

It is implemented in the [pictures widget](app/widgets/pictures/main.js)

The data is fetched from the [Activities API](http://hull.io/docs/api/activities)

The like buttons & like counts on the images comme from a widget distributed with hull (like_button@hull) and that is just skinned here

### \#/likes

The pictures displayed are those liked by the current user.

It is implemented in the [likes widget](app/widgets/likes/main.js)

The data is fetched from the [Likes API](http://hull.io/docs/api/likes)

### \#/friends

Here we display the list of people that the current user follows on Twitter that also have a profile on the app.

We use the [packaged widgets](http://hull.io/docs/widgets/packaged_widgets/) `friends_list@hull` and just override its [main template](app/widgets/friends_list/friends_list.hbs)

### \#/profile

Just displaying a user profile, the widget is [here](app/widgets/profile)

### \#/comments

Comments use the packaged widget comments@hull, with a [local template override](app/widgets/comments/comments.hbs).


## Taking pictures

We use the apis available on iOS6+ to have access to the camera.

    <input type="file" name="file" accept="image/*" capture="camera">


### Upload

The pictures are then uploaded to a [HullStore](http://hull.io/docs/services/hull_store/) (wich is an S3 bucket with CORS activated) via the packaged `upload@hull` widget.

The [uploader widget](app/widgets/uploader) then reacts to events emmited by the `upload@hull` widget to display upload status info. (by the way, it's a good example of the way widgets are supposed to interact in a widgets based [aura](https://github.com/aurajs/aura) / [hull](http://hull.io) app).


### Publication

Once the widget is uploaded, the user gets a chance to review and describe it before its actual publication.

Confirming the publication then stores the picture as an [Image](http://hull.io/docs/api/resources/) that belongs to the user.


-----------------------


# Deploying the app

### App & Organization Setup on hull

Go to [your org's dashboard](http://accounts.alpha.hullapp.io) and setup a few services :

Required services :

* A [Twitter App](http://hull.io/docs/services/twitter/) to setup auth
* A [Hull store](http://hull.io/docs/services/hull_store/) to store the uploaded images

Optional anlytics services :

* [Mixpanel](http://hull.io/docs/services/mixpanel/) and / or
* [Google Analytics](http://hull.io/docs/services/google_analytics/)

Then create a new hull app.

_Don't forget to whitelist your domains and to setup your `appId` and `orgUrl`in the Hull.init method (which is in located in the [index.html](app/index.html#L33-L38) file)._



### Deployment on Heroku

First create your heroku app if it's not done yet :

    heroku create my-own-hullagram

Build your app for deployement, and commit the compiled version:

    git checkout -b deploy
    grunt build
    git add -f dist
    git commit -m "Deployment build"

Deploy your app to heroku:

    git subtree push --prefix dist git@heroku.com:my-own-hullagram.git master
    open http://my-own-hullagram.herokuapp.com




-----------------------

# Possible evolutions

Here are a few ideas for further improvement :

* Photo Filters
  With [caman.js](http://camanjs.com/)/[vintage.js](http://vintagejs.com/)
  or https://github.com/kudakurage/CSS-PhotoEditor-for-iOS6 + [svg foreignObject](https://developer.mozilla.org/en-US/docs/HTML/Canvas/Drawing_DOM_objects_into_a_canvas) + canvas drawImage()

* Tapping once on an image in a feed could open a detail view
* Tapping on the likes count cell in a profile view could show likes
* Doubletapping an image could like/unlike it
* Pull to refresh
* Add error handling to image uploads
* PushState support

