This widget acts as the main app controller.

It handles route updates via a [Backbone Router](http://backbonejs.org/#Router) and displays a specific template for each route.

The content of the different views are delegated to other widgets that handle the fetching of their data...
We don't handle any data fetching here.

Also notice that we are using some templates as Handlebars partials here :
the 'nav' template is included in all other templates to display the bar-tab at the bottom of the app
