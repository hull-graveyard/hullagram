# About this project

This project is built on the [Hull platform](http://hull.io), with [Aura](github.com/aurajs/aura), [Backbone.js](https://github.com/documentcloud/backbone), [Ratchet](http://maker.github.com/ratchet/) and lots of other cool libraries.

**You don't need an account on [hull.io](http://hull.io) to use it locally, the `appId` is already present in this app.**

Implement cool features (see the last paragraph for ideas), contribute to this repo and we'll give you an early access to Hull so you can build and deploy your own apps !

-----------------------
# Hullagram

This is a fully contained demo of what you can achieve with [hull](http://hull.io).

It's somewhat of a clone of Instagram. [View demo](http://gram.hull.io/)

Currently, we use [Ratchet](http://maker.github.com/ratchet/), so it will work only on Webkit browsers, iOS and Android.

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

-----------------------
# Anatomy

Hullagram is built around the following apis of Hull

* [Activities](http://hull.io/docs/api#endpoint-activity)
* [Resources](http://hull.io/docs/api#endpoint-resources)
* [Comments](http://hull.io/docs/api#endpoint-comments)
* [Likes](http://hull.io/docs/api#endpoint-likes)
* [Friendships](http://hull.io/docs/api#endpoint-friends)

The code is a mix of [custom components](http://hull.io/docs/hull_js#creating-a-component) and [packaged components](http://hull.io/docs/components) distributed via hull.
Most of the packaged components are skinned by [overriding default templates](http://hull.io/docs/tutorials/how_to_customize_templates)

## Top level components

You can find an introduction on how Hull components work [here](http://hull.io/docs/components).

The document body initially contains only 2 components :

* [hullagram](app/widgets/hullagram/main.hbs) is a container that displays the login screen if the current user is not connected, and the [app](app/widgets/app/main.js) component if he is.
* [uploader](app/widgets/uploader/main.js) is used to display overlay notifications during file uploads.

Then when the user is connected via Twitter, the [app](app/widgets/app/main.js) component take over the whole page and starts to act as the main controller.

## Screens

### \#/pictures

The first screen is the public activity feed of the app.

It is implemented in the [pictures widget](app/widgets/pictures/main.js)

The data is fetched from the [Activities API](http://hull.io/docs/api#endpoint-activity)

The like buttons & like counts on the images comme from a component distributed with hull (like_button@hull) and that is just skinned here

### \#/likes

The pictures displayed are those liked by the current user.

It is implemented in the [likes component](app/widgets/likes/main.js)

The data is fetched from the [Likes API](http://hull.io/docs/api#endpoint-likes)

### \#/friends

Here we display the list of people that the current user follows on Twitter that also have a profile on the app.

We use the [packaged components](http://hull.io/docs/components) `friends_list@hull` and just override its [main template](app/widgets/friends_list/friends_list.hbs)

### \#/profile

Just displaying a user profile, the component is [here](app/widgets/profile)

### \#/comments

Comments use the packaged component comments@hull, with a [local template override](app/widgets/comments/comments.hbs).


## Taking pictures

We use the apis available on iOS6+ to have access to the camera, and a little trickery to give it a nice appearance.

    <input type="file" name="file" accept="image/*" capture="camera">

### Upload

The pictures are then uploaded to a [HullStore](http://hull.io/docs/services#hull-store) (wich is an S3 bucket with CORS activated) via the packaged `upload@hull` component.

The [uploader component](app/widgets/uploader) then reacts to events emmited by the `upload@hull` component to display upload status info. (by the way, it's a good example of the way components are supposed to interact in a components based [aura](https://github.com/aurajs/aura) / [hull](http://hull.io) app).


### Publication

Once the component is uploaded, the user gets a chance to review and describe it before its actual publication.

Confirming the publication then stores the picture as an [Image](http://hull.io/docs/api#endpoint-resources) that belongs to the user.

-----------------------
# Installing

First, clone this repository :

    git clone git://github.com/hull/hullagram.git

Install [node.js](http://nodejs.org) (Only used for building the app, not needed for deployment)

[grunt-cli](https://github.com/gruntjs/grunt-cli) as a global module.
It's amazing so you should do it anyways.

    [sudo] npm install grunt-cli -g

then install grunt and it's modules in the project's folder.

    cd hullagram/
    npm install

-----------------------
# Running the app

### To run the app locally, run:

    grunt server

-----------------------
# Deploying the app

### App & Organization Setup on hull

Go to [your org's dashboard](http://accounts.alpha.hullapp.io) and setup a few services :

Required services :

* A [Twitter App](http://hull.io/docs/services#twitter) to setup auth
* A [Hull store](http://hull.io/docs/services#hull-store) to store the uploaded images

Optional anlytics services :

* [Mixpanel](http://hull.io/docs/services#mixpanel) and / or
* [Google Analytics](http://hull.io/docs/services#google-analytics)

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

    git push git@heroku.com:my-own-hullagram.git `git subtree split --prefix dist deploy`:master --force
    open http://my-own-hullagram.herokuapp.com

-----------------------
# Next steps

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
* _Your idea here… ?_

