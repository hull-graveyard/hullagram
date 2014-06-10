this["Hull"] = this["Hull"] || {};
this["Hull"]["templates"] = this["Hull"]["templates"] || {};

this["Hull"]["templates"]["app/comments"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<header class=\"bar-title\">\n  <a class=\"button-prev\" data-hull-action=\"back\">Back</a>\n  <h1 class=\"title\">Comments</h1>\n</header>\n\n"
    + "\n\n<div class=\"content\" data-hull-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-hull-widget=\"comment\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  stack1 = self.invokePartial(partials['app.nav'], 'app.nav', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["app/friends"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<header class=\"bar-title\">\n  <h1 class=\"title\">Friends</h1>\n</header>\n\n"
    + "\n\n<div class=\"content\" data-hull-widget=\"friends\" data-hull-limit=\"100\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  stack1 = self.invokePartial(partials['app.nav'], 'app.nav', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };

this["Hull"]["templates"]["app/likes"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<header class=\"bar-title\">\n  <h1 class=\"title\">Likes</h1>\n</header>\n\n"
    + "\n<div class=\"content\" data-hull-widget=\"likes\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  stack1 = self.invokePartial(partials['app.nav'], 'app.nav', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["app/nav"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav class=\"bar-tab\">\n  <ul class=\"tab-inner\">\n    <li class=\"tab-item pictures share comments\">\n      <a href=\"#/pictures\">\n        <i class=\"icon-home icon-2x\"></i>\n        <div class=\"tab-label\">Home</div>\n      </a>\n    </li>\n    <li class=\"tab-item likes\">\n      <a href=\"#/likes\">\n        <i class=\"icon-heart icon-2x\"></i>\n        <div class=\"tab-label\">Likes</div>\n      </a>\n    </li>\n    <li class=\"tab-item\">\n      <a href=\"#\">\n        <div data-hull-widget=\"upload@hull\"></div>\n        <i class=\"icon-camera icon-2x\"></i>\n        <div class=\"tab-label\">New picture</div>\n      </a>\n    </li>\n    <li class=\"tab-item friends users\">\n      <a href=\"#/friends\">\n        <i class=\"icon-group icon-2x\"></i>\n        <div class=\"tab-label\">My friends</div>\n      </a>\n    </li>\n    <li class=\"tab-item profile\">\n      <a href=\"#/profile\">\n        <i class=\"icon-user icon-2x\"></i>\n        <div class=\"tab-label\">Me</div>\n      </a>\n    </li>\n  </ul>\n</nav>\n";
  };

this["Hull"]["templates"]["app/new_picture"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div  data-hull-source_url=\"";
  if (stack1 = helpers.source_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.source_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n      data-hull-blob=\"";
  if (stack1 = helpers.blob) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.blob; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n      data-hull-name=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"\n      data-hull-widget=\"new_picture\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  return buffer;
  };

this["Hull"]["templates"]["app/pictures"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <a class=\"button-prev\" data-hull-action=\"back\">Back</a>\n  ";
  }

function program3(depth0,data) {
  
  
  return "\n  <h1 class=\"title\">Feed</h1>\n  ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-hull-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"";
  return buffer;
  }

  buffer += "<header class=\"bar-title\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.id, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</header>\n\n"
    + "\n\n<div class=\"content\" ";
  stack1 = helpers['if'].call(depth0, depth0.id, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-hull-widget=\"pictures\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n"
    + "\n\n";
  stack1 = self.invokePartial(partials['app.nav'], 'app.nav', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["app/profile"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  stack1 = self.invokePartial(partials['app.users'], 'app.users', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["app/share"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<header class=\"bar-title\">\n  <a class=\"button-prev\" data-hull-action=\"back\">Back</a>\n  <h1 class=\"title\">Share</h1>\n</header>\n<div class=\"content\" data-hull-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-hull-widget=\"share\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  stack1 = self.invokePartial(partials['app.nav'], 'app.nav', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["app/users"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n  "
    + "\n  <a class=\"button-prev\" data-hull-action=\"back\">Back</a>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n  "
    + "\n  <h1 class=\"title\">My Profile</h1>\n  <a class=\"button\" data-hull-action=\"logout\">Logout</a>\n  ";
  return buffer;
  }

  buffer += "\n\n<header class=\"bar-title\">\n  ";
  options = {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.ifEqual || depth0.ifEqual),stack1 ? stack1.call(depth0, depth0.currentView, "users", options) : helperMissing.call(depth0, "ifEqual", depth0.currentView, "users", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</header>\n\n"
    + "\n\n<div class=\"content\" data-hull-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-hull-widget=\"profile\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  stack2 = self.invokePartial(partials['app.nav'], 'app.nav', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["comment/main"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n  <div class=\"list-likes media cf\">\n    <i class=\"icon-heart img\"></i>\n    <div class=\"bd\">\n        ";
  options = {hash:{
    'lastSep': (" and ")
  },inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.join || depth0.join),stack1 ? stack1.call(depth0, depth0.likes, options) : helperMissing.call(depth0, "join", depth0.likes, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        like this.\n    </div>\n  </div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\"#/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.likes, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div data-hull-id=\"";
  if (stack1 = helpers.picture_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.picture_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-hull-widget=\"comments@hull\"></div>\n";
  return buffer;
  };

this["Hull"]["templates"]["comments/comments"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "<ul class=\"list-comments\">";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n  <li>\n    <div class=\"author media cf\">\n        <div class=\"img author-picture\">\n            <a href=\"#/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n              <img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.picture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            </a>\n        </div>\n        <div class=\"bd author-metas\">\n          <time class=\"author-timestamp float-right\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fromNow || depth0.fromNow),stack1 ? stack1.call(depth0, depth0.updated_at, options) : helperMissing.call(depth0, "fromNow", depth0.updated_at, options)))
    + "</time>\n            <h3 class=\"author-title\"><a href=\"#/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></h3>\n            <div class=\"author-body\">";
  if (stack2 = helpers.description) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n        </div>\n    </div>\n  </li>\n  ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "</ul>";
  }

  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, depth0.comments, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.comments) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.comments; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.comments) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, depth0.comments, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<nav class=\"hull-comments__form\">\n    <form class=\"post-comment media cf\">\n        <a class=\"button button-main button-block imgExt\" data-hull-action=\"comment\">Send</a>\n        <div class=\"bd\">\n          <textarea name=\"description\" autofocus=\"autofocus\" placeholder=\"Write something\"></textarea>\n        </div>\n    </form>\n</nav>\n\n";
  return buffer;
  };

this["Hull"]["templates"]["follow_user/main"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, stack2, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth0.following, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n  <button class=\"button button-positive\" data-hull-action=\"toggleFollow\">Unfollow</button>\n  ";
  }

function program4(depth0,data) {
  
  
  return "\n  <button class=\"button button-negative\" data-hull-action=\"toggleFollow\">Follow</button>\n  ";
  }

  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.options),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { return stack2; }
  else { return ''; }
  };

this["Hull"]["templates"]["friends/friends"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  <ul class=\"list list-friends\">\n      ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  if (stack1 = helpers.friends) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.friends; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.friends) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n      <li>\n          <a href=\"#/users/";
  if (stack1 = helpers.uid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.uid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n              <div class=\"author\">\n                  <div class=\"media cf\">\n                      <div class=\"img author-picture\">\n                          <img src=\"";
  if (stack1 = helpers.avatar) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.avatar; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"media-object img-round\">\n                      </div>\n                      <div class=\"bd author-metas\">\n                          <h3 class=\"author-title\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n                          <h4 class=\"author-updated\">Joined ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fromNow || depth0.fromNow),stack1 ? stack1.call(depth0, depth0.created_at, options) : helperMissing.call(depth0, "fromNow", depth0.created_at, options)))
    + "</h4>\n                      </div>\n                  </div>\n              </div>\n              <span class=\"chevron\"></span>\n              <span class=\"count\">\n                "
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.images)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <i class=\"icon-camera\"></i>\n              </span>\n            </a>\n      </li>\n  ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n  <div class=\"empty-state\">\n    <i>&#9785;</i>\n    <h3>No friends yet</h3>\n  </div>\n";
  }

  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, depth0.friends, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };

this["Hull"]["templates"]["hullagram/main"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n\n<div data-hull-widget=\"app\"></div>\n\n";
  }

function program3(depth0,data) {
  
  
  return "\n\n<section class=\"login\">\n  <div class=\"login-center\">\n    <h1 class=\"logo\">Hullagram</h1>\n    Insta-lolcats\n  </div>\n  <div class=\"login-bottom\">\n    <a class=\"button-main button-twitter button-block\" data-hull-provider=\"twitter\" data-hull-action=\"login\">\n      Login with Twitter\n    </a>\n  </div>\n</section>\n\n";
  }

  stack1 = helpers['if'].call(depth0, depth0.loggedIn, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["like_button/like_button"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <a class=\"liked\">\n    Loading...\n  </a>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, depth0.liked, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <a data-hull-action=\"unlike\" class=\"liked\">\n      Unlike\n      <i class=\"icon-heart\"> ";
  if (stack1 = helpers.likes) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.likes; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " </i>\n    </a>\n  ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <a data-hull-action=\"like\">\n      Like\n      <i class=\"icon-heart\"> ";
  if (stack1 = helpers.likes) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.likes; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " </i>\n    </a>\n  ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.working, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["likes/main"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  <ul class=\"list-grid cf\">\n  ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  if (stack1 = helpers.pictures) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.pictures; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.pictures) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n      <li>\n          <a href=\"#/pictures/";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"square_thumb\">\n              <img src=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.imageUrl || depth0.imageUrl),stack1 ? stack1.call(depth0, depth0.id, "square", options) : helperMissing.call(depth0, "imageUrl", depth0.id, "square", options)))
    + "\" width=\"135\" height=\"135\" />\n          </a>\n      </li>\n  ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n  <div class=\"empty-state\">\n    <i>&#9785;</i>\n    <h3>No photos yet</h3>\n  </div>\n";
  }

  stack1 = helpers['if'].call(depth0, depth0.pictures, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["new_picture/main"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header class=\"bar-title\">\n  <a class=\"button\" onclick=\"window.history.back()\">\n    Cancel\n  </a>\n  <h1 class=\"title\">Publish</h1>\n  <a class=\"button\" href=\"#\" data-hull-action=\"send\">\n    Send\n  </a>\n</header>\n<div class=\"content\">\n  <div class=\"new-picture-placeholder\">\n    <img src=\"";
  if (stack1 = helpers.blob) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.blob; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  </div>\n  <div class=\"new-picture-description\">\n    <textarea id=\"picture-description\" row=\"2\" placeholder=\"Write something here\"></textarea>\n  </div>\n</div>\n";
  return buffer;
  };

this["Hull"]["templates"]["pictures/likes"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n  <div class=\"list-likes media cf\">\n      <i class=\"icon-heart img\"></i>\n      <div class=\"bd\">\n          ";
  options = {hash:{
    'lastSep': (" and ")
  },inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.join || depth0.join),stack1 ? stack1.call(depth0, depth0.likes, options) : helperMissing.call(depth0, "join", depth0.likes, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          like this.\n      </div>\n  </div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\"#/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.likes, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["pictures/main"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n<ul class=\"list-pictures\">\n  ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  if (stack1 = helpers.pictures) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.pictures; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.pictures) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <li>\n    <button class=\"button\" data-hull-action=\"more\">Load more</button>\n  </li>\n</ul>\n\n";
  stack1 = helpers['if'].call(depth0, depth0.single_picture_id, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials['pictures.picture'], 'pictures.picture', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = self.invokePartial(partials['pictures.likes'], 'pictures.likes', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div data-hull-id=\"";
  if (stack1 = helpers.single_picture_id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.single_picture_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-hull-widget=\"comments@hull\" class=\"hull-comments-embed\"></div>\n";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "\n<div class=\"empty-state\">\n  <i>&#9785;</i>\n  <h3>No photos yet</h3>\n</div>\n";
  }

  stack1 = helpers['if'].call(depth0, depth0.pictures, {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["pictures/picture"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"author-description\">\n      ";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    </div>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              "
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.comments)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n              0\n            ";
  }

  buffer += "<li class=\"island\">\n  <div class=\"author\">\n    <div class=\"media cf\">\n      <div class=\"img author-picture\">\n        <a href=\"#/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.actor),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n          <img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.actor),stack1 == null || stack1 === false ? stack1 : stack1.picture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </a>\n      </div>\n      <div class=\"bd author-metas\">\n        <a href=\"#/users/"
    + escapeExpression(((stack1 = ((stack1 = depth0.actor),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n          <h3 class=\"author-title\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.actor),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n        </a>\n        <time class=\"author-timestamp\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fromNow || depth0.fromNow),stack1 ? stack1.call(depth0, depth0.created_at, options) : helperMissing.call(depth0, "fromNow", depth0.created_at, options)))
    + "</time>\n      </div>\n    </div>\n  </div>\n  ";
  stack2 = helpers['if'].call(depth0, depth0.description, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  <div class=\"picture\">\n    <a href=\"#/pictures/";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n      <img src=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.imageUrl || depth0.imageUrl),stack1 ? stack1.call(depth0, depth0.id, "medium", options) : helperMissing.call(depth0, "imageUrl", depth0.id, "medium", options)))
    + "\"  />\n    </a>\n  </div>\n  <div class=\"list-actions cf\">\n    <ul class=\"segmented-controller\">\n      <li data-hull-widget=\"like_button@hull\" data-hull-id=\"";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" data-hull-likes-count=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.likes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      </li>\n      <li>\n        <a href=\"#/pictures/";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "/comments\" class=\"\">\n          Comment \n          <i class=\"icon-comment\">\n            ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.comments), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n          </i>\n        </a>\n      </li>\n      <li>\n        <a href=\"#/pictures/";
  if (stack2 = helpers.id) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.id; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "/share\" class=\"\"> Share \n          <i class=\"icon-share-alt\"> </i>\n        </a>\n      </li>\n    </ul>\n  </div>\n</li>\n";
  return buffer;
  };

this["Hull"]["templates"]["profile/main"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"profile island\">\n  <div class=\"author\">\n    <div class=\"media cf\">\n      <div class=\"img author-picture\">\n        <img src=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.picture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      </div>\n      <div class=\"bd author-metas\">\n        <div data-hull-widget=\"follow_user\" data-hull-id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"pull-right\"></div>\n\n        <h3 class=\"author-title\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n\n        "
    + "\n        <h4 class=\"author-updated\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fromNow || depth0.fromNow),stack1 ? stack1.call(depth0, ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.created_at), options) : helperMissing.call(depth0, "fromNow", ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.created_at), options)))
    + "</h4>\n\n      </div>\n    </div>\n  </div>\n  <ul class=\"profile-stats cf\">\n    <li>\n      <strong>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.stats)),stack1 == null || stack1 === false ? stack1 : stack1.images)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n      <small>Photos</small>\n    </li>\n    <li>\n      <strong>"
    + escapeExpression(((stack1 = ((stack1 = depth0.friends),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n      <small>Friends</small>\n    </li>\n    <li>\n      <strong>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.stats)),stack1 == null || stack1 === false ? stack1 : stack1.liked)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n      <small>Likes</small>\n    </li>\n  </ul>\n</div>\n\n<h3 class=\"heading-body\">Latest Pictures</h3>\n\n"
    + "\n<div data-hull-widget='pictures' data-hull-user-id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.user),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\n";
  return buffer;
  };

this["Hull"]["templates"]["share/main"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n  <div class=\"share-picture\">\n    <div class=\"media\">\n      <div class=\"img\">\n        <img src=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.imageUrl || depth0.imageUrl),stack1 ? stack1.call(depth0, ((stack1 = depth0.picture),stack1 == null || stack1 === false ? stack1 : stack1.id), "small", options) : helperMissing.call(depth0, "imageUrl", ((stack1 = depth0.picture),stack1 == null || stack1 === false ? stack1 : stack1.id), "small", options)))
    + "\" alt=\"\">\n      </div>\n      <div class=\"bd\">\n        <textarea id=\"share-description\" rows=\"3\" placeholder=\"Write something\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.picture),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n      </div>\n    </div>\n\n    <a class=\"button button-block button-share\" data-hull-action=\"share\" data-hull-network=\"twitter\" data-hull-source-url=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.imageUrl || depth0.imageUrl),stack1 ? stack1.call(depth0, ((stack1 = depth0.picture),stack1 == null || stack1 === false ? stack1 : stack1.id), "medium", options) : helperMissing.call(depth0, "imageUrl", ((stack1 = depth0.picture),stack1 == null || stack1 === false ? stack1 : stack1.id), "medium", options)))
    + "\">\n      <i class=\"icon-twitter\"></i>\n      Share on Twitter\n    </a>\n  </div>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.picture, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["upload/file_single"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<span class=\"btn btn-success fileinput-button\">\n  <i class=\"icon-plus icon-white\"></i>\n  <input type=\"file\" name=\"file\" accept=\"image/*\" capture=\"camera\">\n</span>\n";
  };

this["Hull"]["templates"]["upload/upload"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n  <form action=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" method=\"post\" enctype=\"multipart/form-data\" class=\"hull_upload\">\n\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.key_value || depth0.key_value),stack1 ? stack1.call(depth0, depth0.params, options) : helperMissing.call(depth0, "key_value", depth0.params, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    <div class=\"dropzone well hidden-phone hidden-phone-tablet\" height=\"100px;\" width=\"100px;\">Drop an image here</div>\n\n    <input type=\"hidden\" name=\"Filename\" value=\"\"/>\n    <input type=\"hidden\" name=\"Content-Type\" value=\"\"/>\n    <input type=\"hidden\" name=\"name\" value=\"\"/>\n\n    <div class=\"fileupload-buttonbar row-fluid\">\n      <div class='span12'>\n        ";
  stack2 = self.invokePartial(partials['upload.file_single'], 'upload.file_single', depth0, helpers, partials, data);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      </div>\n    </div>\n\n    <div class=\"fileupload-progress fade row-fluid\">\n      <div class='span12'>\n        <div class=\"progress progress-success progress-striped active\" role=\"progressbar\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n          <div class=\"bar\" style=\"width:0%;\"></div>\n        </div>\n        <div class=\"progress-extended\">&nbsp;</div>\n      </div>\n    </div>\n\n\n    <div class='error'></div>\n    <div class='filescontainer'></div>\n  </form>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <input type=\"hidden\" name=\"";
  if (stack1 = helpers.key) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.key; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" value=\"";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"/>\n    ";
  return buffer;
  }

  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.upload_policy) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.upload_policy; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.upload_policy) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  };

this["Hull"]["templates"]["uploader/uploader"] = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"notification\">\n  <i></i>\n  <p></p>\n</div>\n";
  };