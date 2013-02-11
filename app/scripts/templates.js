this["Hull"] = this["Hull"] || {};
this["Hull"]["templates"] = this["Hull"]["templates"] || {};

this["Hull"]["templates"]["app/comments"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<header class=\"bar-title\">\n  <a class=\"button-prev\" onclick=\"window.history.back()\">Back</a>\n  <h1 class=\"title\">Comments</h1>\n</header>\n<div class=\"content\" data-hull-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-hull-widget=\"comment\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['app/nav'], 'app/nav', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["app/friends"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<header class=\"bar-title\">\n  <h1 class=\"title\">Friends</h1>\n</header>\n<div class=\"content\" data-hull-widget=\"friends_list@hull\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['app/nav'], 'app/nav', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;});

this["Hull"]["templates"]["app/likes"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<header class=\"bar-title\">\n  <h1 class=\"title\">Likes</h1>\n</header>\n<div class=\"content\"  data-hull-widget=\"likes\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['app/nav'], 'app/nav', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["app/nav"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<nav class=\"bar-tab\">\n  <ul class=\"tab-inner\">\n    <li class=\"tab-item pictures share comments\">\n      <a href=\"#/pictures\">\n        <i class=\"icon-home icon-2x\"></i>\n        <div class=\"tab-label\">Home</div>\n      </a>\n    </li>\n    <li class=\"tab-item likes\">\n      <a href=\"#/likes\">\n        <i class=\"icon-heart icon-2x\"></i>\n        <div class=\"tab-label\">Likes</div>\n      </a>\n    </li>\n    <li class=\"tab-item\">\n      <a href=\"#\">\n        <div data-hull-widget=\"upload@hull\"></div>\n        <i class=\"icon-camera icon-2x\"></i>\n        <div class=\"tab-label\">New picture</div>\n      </a>\n    </li>\n    <li class=\"tab-item friends users\">\n      <a href=\"#/friends\">\n        <i class=\"icon-group icon-2x\"></i>\n        <div class=\"tab-label\">My friends</div>\n      </a>\n    </li>\n    <li class=\"tab-item profile\">\n      <a href=\"#/profile\">\n        <i class=\"icon-user icon-2x\"></i>\n        <div class=\"tab-label\">Me</div>\n      </a>\n    </li>\n  </ul>\n</nav>\n";});

this["Hull"]["templates"]["app/new_picture"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div  data-hull-source-url=\"";
  foundHelper = helpers.source_url;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.source_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"\n      data-hull-blob=\"";
  foundHelper = helpers.blob;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.blob; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"\n      data-hull-name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"\n      data-hull-widget=\"new_picture\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  return buffer;});

this["Hull"]["templates"]["app/pictures"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <a class=\"button-prev\" onclick=\"window.history.back()\">Back</a>\n  ";}

function program3(depth0,data) {
  
  
  return "\n  <h1 class=\"title\">Feed</h1>\n  ";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "data-hull-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

  buffer += "<header class=\"bar-title\">\n  ";
  stack1 = depth0.id;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</header>\n<div class=\"content\" ";
  stack1 = depth0.id;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-hull-widget=\"pictures\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['app/nav'], 'app/nav', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["app/profile"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, self=this;


  stack1 = depth0;
  stack1 = self.invokePartial(partials['app/users'], 'app/users', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["app/share"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "<header class=\"bar-title\">\n  <a class=\"button-prev\" onclick=\"window.history.back()\">Back</a>\n  <h1 class=\"title\">Share</h1>\n</header>\n<div class=\"content\" data-hull-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-hull-widget=\"share\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['app/nav'], 'app/nav', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["app/users"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n  <a class=\"button-prev\" onclick=\"window.history.back()\">Back</a>\n  ";}

function program3(depth0,data) {
  
  
  return "\n  <h1 class=\"title\">My Profile</h1>\n  <a class=\"button\" data-hull-action=\"logout\">Logout</a>\n  ";}

  buffer += "<header class=\"bar-title\">\n  ";
  stack1 = depth0.currentView;
  stack2 = {};
  foundHelper = helpers.ifEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "users", {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data}) : helperMissing.call(depth0, "ifEqual", stack1, "users", {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</header>\n\n<div class=\"content\" data-hull-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-hull-widget=\"profile\">\n  <i class=\"icon-spinner icon-spin loading-spinner\"></i>\n</div>\n\n";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['app/nav'], 'app/nav', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["comment/likes"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\"#/users/";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>";
  return buffer;}

  buffer += "<div class=\"list-likes media cf\">\n    <i class=\"icon-heart img\"></i>\n    <div class=\"bd\">\n        ";
  stack1 = depth0.likes;
  stack2 = {};
  stack2['lastSep'] = " and ";
  foundHelper = helpers.join;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}) : helperMissing.call(depth0, "join", stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        like this.\n    </div>\n</div>\n";
  return buffer;});

this["Hull"]["templates"]["comment/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['comment/likes'], 'comment/likes', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}

  stack1 = depth0.likes;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div data-hull-id=\"";
  foundHelper = helpers.comment_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.comment_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-hull-widget=\"comments@hull\"></div>\n";
  return buffer;});

this["Hull"]["templates"]["comments/comments"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "<ul class=\"list-comments\">";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n  <li>\n    <div class=\"author media cf\">\n        <div class=\"img author-picture\">\n            <a href=\"#/users/";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n              <img src=\"";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.picture;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n            </a>\n        </div>\n        <div class=\"bd author-metas\">\n          <time class=\"author-timestamp float-right\">";
  stack1 = depth0.updated_at;
  stack2 = {};
  foundHelper = helpers.fromNow;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "fromNow", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</time>\n            <h3 class=\"author-title\"><a href=\"#/users/";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></h3>\n            <div class=\"author-body\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n        </div>\n    </div>\n  </li>\n  ";
  return buffer;}

function program5(depth0,data) {
  
  
  return "</ul>";}

  stack1 = depth0.comments;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  foundHelper = helpers.comments;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  else { stack1 = depth0.comments; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.comments) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = depth0.comments;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<nav>\n    <form class=\"post-comment media cf\">\n        <a class=\"button button-main button-block imgExt\" data-hull-action=\"comment\">Send</a>\n        <div class=\"bd\">\n          <textarea autofocus=\"autofocus\" placeholder=\"Write something\"></textarea>\n        </div>\n    </form>\n</nav>\n\n";
  return buffer;});

this["Hull"]["templates"]["friends_list/friends_list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n  <ul class=\"list list-friends\">\n      ";
  foundHelper = helpers.friends;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  else { stack1 = depth0.friends; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.friends) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <li>\n          <a href=\"#/users/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n              <div class=\"author\">\n                  <div class=\"media cf\">\n                      <div class=\"img author-picture\">\n                          <img src=\"";
  foundHelper = helpers.picture;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.picture; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n                      </div>\n                      <div class=\"bd author-metas\">\n                          <h3 class=\"author-title\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h3>\n                          <h4 class=\"author-updated\">joined ";
  stack1 = depth0.created_at;
  stack2 = {};
  foundHelper = helpers.fromNow;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "fromNow", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</h4>\n                      </div>\n                  </div>\n              </div>\n              <span class=\"chevron\"></span>\n              <span class=\"count\">\n                ";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.images;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + " <i class=\"icon-camera\"></i>\n              </span>\n            </a>\n      </li>\n  ";
  return buffer;}

function program4(depth0,data) {
  
  
  return "\n  <div class=\"empty-state\">\n    <i>&#9785;</i>\n    <h3>No friends yet</h3>\n  </div>\n";}

  stack1 = depth0.friends;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;});

this["Hull"]["templates"]["hullagram/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, self=this;

function program1(depth0,data) {
  
  
  return "\n<div data-hull-widget=\"app\"></div>\n";}

function program3(depth0,data) {
  
  
  return "\n\n<section class=\"login\">\n  <div class=\"login-center\">\n    <h1 class=\"logo\">Hullagram</h1>\n    Insta-lolcats\n  </div>\n  <div class=\"login-bottom\">\n    <a class=\"button-main button-twitter button-block\" data-hull-provider=\"twitter\" data-hull-action=\"login\">\n      Login with Twitter\n    </a>\n  </div>\n</section>\n\n";}

  stack1 = depth0.loggedIn;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["like_button/like_button"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "liked";}

function program3(depth0,data) {
  
  
  return "liked";}

function program5(depth0,data) {
  
  
  return "unlike";}

function program7(depth0,data) {
  
  
  return "like";}

function program9(depth0,data) {
  
  
  return "\n    Unlike\n  ";}

function program11(depth0,data) {
  
  
  return "\n    Like\n  ";}

  buffer += "<span class=\"stat ";
  stack1 = depth0.isLiked;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n  <i class=\"icon-heart\"></i>\n  ";
  foundHelper = helpers.likesCount;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.likesCount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\n</span>\n<a class=\"action ";
  stack1 = depth0.isLiked;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-hull-action=\"";
  stack1 = depth0.isLiked;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n  ";
  stack1 = depth0.isLiked;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</a>\n";
  return buffer;});

this["Hull"]["templates"]["likes/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n  <ul class=\"list-grid cf\">\n  ";
  foundHelper = helpers.pictures;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  else { stack1 = depth0.pictures; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.pictures) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n      <li>\n          <a href=\"#/pictures/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n              <img src=\"";
  stack1 = depth0.id;
  stack2 = {};
  foundHelper = helpers.imageUrl;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "square", {hash:stack2,data:data}) : helperMissing.call(depth0, "imageUrl", stack1, "square", {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "\"  />\n          </a>\n      </li>\n  ";
  return buffer;}

function program4(depth0,data) {
  
  
  return "\n  <div class=\"empty-state\">\n    <i>&#9785;</i>\n    <h3>No photos yet</h3>\n  </div>\n";}

  buffer += "\n";
  stack1 = depth0.pictures;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["new_picture/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<header class=\"bar-title\">\n  <a class=\"button-prev\" onclick=\"window.history.back()\">\n    Cancel\n  </a>\n  <h1 class=\"title\">Publish</h1>\n  <a class=\"button\" href=\"#\" data-hull-action=\"send\">\n    Send\n  </a>\n</header>\n<div class=\"content\">\n  <div class=\"new-picture-placeholder\">\n    <img src=\"";
  foundHelper = helpers.blob;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.blob; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n  </div>\n  <div class=\"new-picture-description\">\n    <textarea id=\"picture-description\" row=\"2\" placeholder=\"Write something here\"></textarea>\n  </div>\n</div>\n";
  return buffer;});

this["Hull"]["templates"]["pictures/likes"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a href=\"#/users/";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a>";
  return buffer;}

  buffer += "<div class=\"list-likes media cf\">\n    <i class=\"icon-heart img\"></i>\n    <div class=\"bd\">\n        ";
  stack1 = depth0.likes;
  stack2 = {};
  stack2['lastSep'] = " and ";
  foundHelper = helpers.join;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}) : helperMissing.call(depth0, "join", stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        like this.\n    </div>\n</div>\n";
  return buffer;});

this["Hull"]["templates"]["pictures/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, stack2, self=this, functionType="function", escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n<ul class=\"list-pictures\">\n";
  foundHelper = helpers.pictures;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  else { stack1 = depth0.pictures; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.pictures) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n";
  stack1 = depth0.single_picture_id;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['pictures/picture'], 'pictures/picture', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials['pictures/likes'], 'pictures/likes', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div data-hull-id=\"";
  foundHelper = helpers.single_picture_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.single_picture_id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-hull-widget=\"comments@hull\" class=\"hull-comments-embed\"></div>\n";
  return buffer;}

function program6(depth0,data) {
  
  
  return "\n<div class=\"empty-state\">\n  <i>&#9785;</i>\n  <h3>No photos yet</h3>\n</div>\n";}

  stack1 = depth0.pictures;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["pictures/picture"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <div class=\"author-description\">\n      ";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\n    </div>\n  ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          ";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.comments;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\n        ";
  return buffer;}

function program5(depth0,data) {
  
  
  return "\n          0\n        ";}

  buffer += "<li class=\"island\">\n  <div class=\"author\">\n    <div class=\"media cf\">\n      <div class=\"img author-picture\">\n        <a href=\"#/users/";
  stack1 = depth0.actor;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n          <img src=\"";
  stack1 = depth0.actor;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.picture;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n        </a>\n      </div>\n      <div class=\"bd author-metas\">\n        <a href=\"#/users/";
  stack1 = depth0.actor;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n          <h3 class=\"author-title\">";
  stack1 = depth0.actor;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3>\n        </a>\n        <time class=\"author-timestamp\">";
  stack1 = depth0.created_at;
  stack2 = {};
  foundHelper = helpers.fromNow;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "fromNow", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</time>\n      </div>\n    </div>\n  </div>\n  <div class=\"picture\">\n    <img src=\"";
  stack1 = depth0.id;
  stack2 = {};
  foundHelper = helpers.imageUrl;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "medium", {hash:stack2,data:data}) : helperMissing.call(depth0, "imageUrl", stack1, "medium", {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "\"  />\n  </div>\n  ";
  stack1 = depth0.description;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"list-actions cf\">\n    <a href=\"#/pictures/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/comments\" class=\"stat\">\n      <i class=\"icon-comment\"></i>\n        ";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.comments;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n    <span data-hull-widget=\"like_button@hull\" data-hull-id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\" data-hull-likes-count=\"";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.likes;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"></span>\n    &middot;\n    <a href=\"#/pictures/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/comments\" class=\"action\">\n      Comment\n    </a>\n    &middot;\n    <a href=\"#/pictures/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "/share\" class=\"action\">\n      Share\n    </a>\n  </div>\n</li>\n";
  return buffer;});

this["Hull"]["templates"]["profile/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"profile island\">\n  <div class=\"author\">\n    <div class=\"media cf\">\n      <div class=\"img author-picture\">\n        <img src=\"";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.picture;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">\n      </div>\n      <div class=\"bd author-metas\">\n        <h3 class=\"author-title\">";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h3>\n        <h4 class=\"author-location\">Paris, France</h4>\n        <h4 class=\"author-updated\">";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.created_at;
  stack2 = {};
  foundHelper = helpers.fromNow;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "fromNow", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</h4>\n      </div>\n    </div>\n  </div>\n  <ul class=\"profile-stats cf\">\n    <li>\n      <strong>";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.images;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</strong>\n      <small>Photos</small>\n    </li>\n    <li>\n      <strong>";
  stack1 = depth0.friends;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.length;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</strong>\n      <small>Friends</small>\n    </li>\n    <li>\n      <strong>";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.liked;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</strong>\n      <small>Likes</small>\n    </li>\n  </ul>\n</div>\n\n<h3 class=\"heading-body\">Latest Pictures</h3>\n<div data-hull-widget='pictures' data-hull-user-id=\"";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"></div>\n";
  return buffer;});

this["Hull"]["templates"]["share/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n  <div class=\"share-picture\">\n\n    <div class=\"media\">\n      <div class=\"img\">\n        <img src=\"";
  stack1 = depth0.id;
  stack2 = {};
  foundHelper = helpers.imageUrl;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "square", {hash:stack2,data:data}) : helperMissing.call(depth0, "imageUrl", stack1, "square", {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "\" alt=\"\">\n      </div>\n      <div class=\"bd\">\n        <textarea id=\"share-description\" rows=\"3\" placeholder=\"Write something\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</textarea>\n      </div>\n    </div>\n\n    <a class=\"button button-block button-share\" data-hull-action=\"share\" data-hull-network=\"twitter\" data-hull-source-url=\"";
  stack1 = depth0.id;
  stack2 = {};
  foundHelper = helpers.imageUrl;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "medium", {hash:stack2,data:data}) : helperMissing.call(depth0, "imageUrl", stack1, "medium", {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "\">\n      <i class=\"icon-twitter\"></i>\n      Share on Twitter\n    </a>\n\n  </div>\n";
  return buffer;}

  foundHelper = helpers.pictures;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.pictures; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.pictures) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});

this["Hull"]["templates"]["uploader/uploader"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"notification\">\n  <i></i>\n  <p></p>\n</div>\n";});