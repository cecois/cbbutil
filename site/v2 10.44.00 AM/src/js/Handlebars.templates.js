(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['activityViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"\">\n      <div class=\"throb pull-left\"></div>\n      <div class=\"message\">";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n</div>";
  return buffer;
  });
templates['baseMapMnu'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"#\" class=\"mnuThumbnail ";
  if (stack1 = helpers.active) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.active; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.nom) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nom; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" title=\"";
  if (stack1 = helpers.nom) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nom; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n      <img src=\"";
  if (stack1 = helpers.thumb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.thumb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"\" />\n    </a>";
  return buffer;
  });
templates['betaSplashViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<div class=\"container\">\n  <div class=\"marketing\" style=\"padding-top:50px;\">\n\n    <div class=\"appname offset4\">It's a Beta!</div>\n\n    <div class=\"row-fluid\">\n\n      <div class=\"featurette\">\n        <img class=\"featurette-image pull-right\" src=\"images/betababy.png\">\n        <h2 class=\"featurette-heading\">What to Expect</span></h2>\n        <p class=\"lead\">As you use this application, here are a couple of notes that may clarify the experience:</p>\n        <p>\n          <ul>\n          <li>Hope you weren't planning on (or are!) <strong>using IE</strong>. The Lab restricts IE so tightly due to security concerns that it is basically an unusable browser for an application like this. We use a handful of third-party utilities (all basemaps, for example, as well as the search's auto-complete feature and some style components such as fonts and stylesheets), which we can't even <em>test</em> in IE, let alone work around that browser's legendarily \"unique\" behavior. Surely if you use IE regularly you've run into such things before, but even still we apologize if it is an inconvenience.</li>\n            <li>This is stated elsewhere, but not having <strong>cookies</strong> enabled will empact the persistence of your download session. Not having <strong>JavaScript</strong> enabled is basically a non-starter.</li>\n            <li>Most of the notifications and feedback you'll get will appear in the lower right corner.</li>\n            <li><em>Queing</em> something for download (<i class=\"icon-awesome-download\"></i>) is not the same as downloading. Your queue is filled up with your selections and then you can manage that separately at any time by visiting the <a href=\"#download\">Download Queue</a> tab.</li>\n            <li>Not all of our data are available yet. <strong>CIB 1-meter</strong> imagery, perhaps most notably, is not yet available (a suitable proxy might be <a href=\"#search/p1/cib10\">cib10</a> if you want to see how [a subset of a lesser-resolution] CIB01 might look). We also have NAIP, CDRG and LandSat material sitting around (among a few others) that are simply too bulky or differently-arranged to have been prepared before the beta phase of the application itself was ready.</li>\n            <li>But that's it. Enjoy! And don't forget we have a <a href=\"https://c3.llan.ll.mit.edu/blogs/249650e6-9c85-498a-bd0d-59b7b602623a/?lang=\">community on c3</a> for this project.</li>\n          </ul>\n        </p>\n      </div>\n\n    </div> <!-- ./ row-fluid -->\n\n  </div>\n\n</div>\n";
  });
templates['consoleViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function";


  buffer += "<div class=\"alert alert-info\">\n  ";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });
templates['contactViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-header\">\n           <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n           <h3>Contact Us -- Anything Goes!</h3>\n       </div>\n       <div class=\"modal-body\">\n           <div class=\"control-group clearfix\">\n               <div class=\"controls\">\n               <form class=\"form-inline\">\n                   <div class=\"input-prepend input-append pull-left\" style=\"margin-right:13px;\">\n                       <span class=\"add-on\" style=\"height:2em;\"> <i class=\"icon-envelope\"></i>\n                       </span>\n                       <input class=\"span3\" id=\"contactInputEmail\" type=\"text\" placeholder=\"optional email\" style=\"height:2em;\">\n                       <span class=\"add-on\" style=\"height:2em;\">@ll.mit.edu</span>\n                       </div>\n                   <div class=\"input-append\">\n                       <input class=\"span2\" id=\"contactInputBadge\" type=\"text\" placeholder=\"optional badge\" style=\"height:2em;\">       \n                       <span class=\"add-on\" style=\"height:2em;\"> <i class=\"icon-user\"></i>\n                       </span>\n                   </div>\n                   </form>\n               </div>\n           </div>\n           <p><textarea id=\"contactInputMessage\" class=\"span7\" rows=\"3\">";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</textarea></p>\n       </div>\n       <div class=\"modal-footer\">\n           <a href=\"#\" class=\"btn btn-primary\">Send!</a>\n       </div>";
  return buffer;
  });
templates['cookieWarningTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"appWarning\" class=\"offset2 modal span6 alert alert-error\">\n<button type=\"button\" class=\"close\" data-dismiss=\"alert\">x</button>\n";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;
  });
templates['detailViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "active";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n         <a class=\"btn btnCoverage\" rel=\"popover\"><i class=\"icon-grid ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.covonoff, true, options) : helperMissing.call(depth0, "equal", depth0.covonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\" style=\"margin-left:-3px;\"></i></a>\n       ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "<a class=\"btn btnZoomto\" ><i class=\"icon-zoomin\"></i></a>";
  }

function program7(depth0,data) {
  
  
  return "glowing";
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n       <li>\n         <span class=\"label\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\n       </li>\n       ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n       <dt>Resolution</dt>\n       <dd>";
  if (stack1 = helpers.resolution) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.resolution; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</dd>\n   ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n       <dt class=\"sourcelist\">Publishers/Providers</dt>\n       ";
  stack1 = helpers.each.call(depth0, depth0.source, {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n       ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "";
  buffer += "\n       <dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>\n       ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"anno span4 offset3\">";
  if (stack1 = helpers.notes) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.notes; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n";
  return buffer;
  }

  buffer += "   <div class=\"span1\"></div>\n   <div class=\"title span11 pull-left\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n\n   <div class=\"span2\"></div>\n   \n<div class=\"button-wrapper pull-left span4\">\n              <div class=\"btn-group btn-group-vertical pull-right\">\n         <a class=\"btn btnEnvelope\"><i class=\"icon-rectangleselection ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.envelonoff, true, options) : helperMissing.call(depth0, "equal", depth0.envelonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\"></i></a>\n         ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.format, "raster", options) : helperMissing.call(depth0, "equal", depth0.format, "raster", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n       <a class=\"btn btnDownload\" ><i class=\"icon-awesome-download\"></i></a>\n";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.envelonoff, true, options) : helperMissing.call(depth0, "equal", depth0.envelonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "       \n";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.covonoff, true, options) : helperMissing.call(depth0, "equal", depth0.covonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "       \n";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.prevonoff, true, options) : helperMissing.call(depth0, "equal", depth0.prevonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "       \n     </div>\n     <div class=\"thumbnail pull-right span3 btnPreview ";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.prevonoff, true, options) : helperMissing.call(depth0, "equal", depth0.prevonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\">\n         <div class=\"badge span1 pull-right\">";
  if (stack2 = helpers.format) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.format; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n         <img src=\"";
  if (stack2 = helpers.thumb) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.thumb; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" width=\"270px\" height=\"145px\" alt=\"series thumbnail\">   \n         <p><span class=\"text-info\"><strong>click for preview</strong></span></p>\n       </div>\n\n\n   <div class=\"subjectlist pull-left span3\">\n     <ul>\n       ";
  stack2 = helpers.each.call(depth0, depth0.subject, {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n     </ul>\n   </div>\n   </div>\n\n<div class=\"span2\"></div>\n      <div class=\"details-rest pull-right span6\">\n     <dl class=\"dl-horizontal\">\n       <dt>Temporal Coverage: Start</dt>\n       <dd>";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers['time-year-month'] || depth0['time-year-month']),stack1 ? stack1.call(depth0, depth0.date_start, options) : helperMissing.call(depth0, "time-year-month", depth0.date_start, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</dd>\n\n       <dt>Temporal Coverage: End</dt>\n       <dd>";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers['time-year-month'] || depth0['time-year-month']),stack1 ? stack1.call(depth0, depth0.date_end, options) : helperMissing.call(depth0, "time-year-month", depth0.date_end, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</dd>\n\n       <dt>Last Updated</dt>\n       <dd>";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers['time-year-month'] || depth0['time-year-month']),stack1 ? stack1.call(depth0, depth0.updated, options) : helperMissing.call(depth0, "time-year-month", depth0.updated, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</dd>\n\n       <dt>Classified</dt>\n       <dd>";
  if (stack2 = helpers.classification) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.classification; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</dd>\n\n       <dt>Format</dt>\n       <dd>";
  if (stack2 = helpers.format) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.format; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</dd>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.format, "raster", options) : helperMissing.call(depth0, "equal", depth0.format, "raster", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "    \n       ";
  stack2 = helpers['if'].call(depth0, depth0.source, {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n     </dl>\n   </div>\n     ";
  options = {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.prevonoff, true, options) : helperMissing.call(depth0, "equal", depth0.prevonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n     <div class=\"container details-container row span12\">\n      <div class=\"span1\"></div>\n<div class=\"description well muted pull-right span9\">\n     ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.sanitized || depth0.sanitized),stack1 ? stack1.call(depth0, depth0.description, options) : helperMissing.call(depth0, "sanitized", depth0.description, options)))
    + "\n     <div class=\"pull-right muted minutiae\">source(";
  if (stack2 = helpers.description_source) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.description_source; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + ")</div>\n   </div>\n     \n   </div>";
  return buffer;
  });
templates['downloadQueueViewOversizeTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n<div class=\"statspane span4\">\n    <div>\n        <span class=\"muted\">total payload size: ~</span>\n        ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.sizeBeautified || depth0.sizeBeautified),stack1 ? stack1.call(depth0, depth0.loadsize, options) : helperMissing.call(depth0, "sizeBeautified", depth0.loadsize, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n\n    <div>\n        <span class=\"muted\">total files:</span>\n        ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dlcnt || depth0.dlcnt),stack1 ? stack1.call(depth0, depth0.outfiles, options) : helperMissing.call(depth0, "dlcnt", depth0.outfiles, options)))
    + "\n    </div>\n    <div class=\"chart-wrapper pull-right\">\n        <span class=\"muted pull-left\">% completed:</span>\n        <div class=\"chart pull-right row\"></div>\n    </div>\n</div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += " \n<div class=\"btnDLGroup btn-group btn-group-vertical pull-right\">\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.format, "raster", options) : helperMissing.call(depth0, "compare", depth0.format, "raster", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    <a class=\"btn btnDLRemove pull-right \" data-original-title=\"permanently remove this download from the queue\"><i class=\"icon-x-altx-alt\"></i></a>\n</div>\n\n    <div class=\"span7 alert alert-error\" style=\"font-weight:bold;\"><p>The requested payload would amount to approximately ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.sizeBeautified || depth0.sizeBeautified),stack1 ? stack1.call(depth0, depth0.loadsize, options) : helperMissing.call(depth0, "sizeBeautified", depth0.loadsize, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += ", which we feel is just too much to deliver over the lab's network. Please consider using the tool at right to choose a subset of the dataset for immediate download.</p>\n    <p>If you feel you do, in fact, need a massive transfer of data, please contact us either through this site's contact utility (the \"Tell Us\" button at the top of the page) or by emailing <a href=\"mailto:christopher.miller@ll.mit.edu\">Chris Miller</a> or <a href=\"mailto:bmenk@ll.mit.edu\">Bobb Menk</a> directly and we'll work out a solution (probably involving the physical transfer of pluggable hard drives).</p></div>\n\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\n\n    <a class=\"btn btnDLSubset pull-right\" aria-hidden=\"true\" data-original-title=\"select a subset of this resource\"><i class=\"icon-pointer\"></i></a>\n    ";
  }

function program6(depth0,data) {
  
  
  return "\n    <div class=\"span8 rightsWarning alert-completed\">this download has been removed from the queue</div>\n    ";
  }

  buffer += "<div class=\"span1\"></div><div class=\"dlsession span9\">\n<div class=\"titlepane span4\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.queued, true, options) : helperMissing.call(depth0, "equal", depth0.queued, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n\n<ul class=\"row span9 well dlFileList\">  \n ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.queued, true, options) : helperMissing.call(depth0, "compare", depth0.queued, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.queued, false, options) : helperMissing.call(depth0, "compare", depth0.queued, false, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</ul>\n\n\n\n<div class=\"divider span9\">\n    <hr>\n</div>\n</div>";
  return buffer;
  });
templates['downloadQueueViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n<div class=\"statspane span4\">\n    <div>\n        <span class=\"muted\">total payload size: ~</span>\n        ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.sizeBeautified || depth0.sizeBeautified),stack1 ? stack1.call(depth0, depth0.loadsize, options) : helperMissing.call(depth0, "sizeBeautified", depth0.loadsize, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n\n    <div>\n        <span class=\"muted\">total files:</span>\n        ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dlcnt || depth0.dlcnt),stack1 ? stack1.call(depth0, depth0.outfiles, options) : helperMissing.call(depth0, "dlcnt", depth0.outfiles, options)))
    + "\n    </div>\n    <div class=\"chart-wrapper pull-right\">\n        <span class=\"muted pull-left\">% completed:</span>\n        <div class=\"chart pull-right row\"></div>\n    </div>\n</div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n\n<div class=\"btnDLGroup btn-group btn-group-vertical pull-right\">\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.format, "raster", options) : helperMissing.call(depth0, "compare", depth0.format, "raster", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    <a class=\"btn btnDLRemove pull-right \" data-original-title=\"permanently remove this download from the queue\"><i class=\"icon-x-altx-alt\"></i></a>\n</div>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\n\n    <a class=\"btn btnDLSubset pull-right\" aria-hidden=\"true\" data-original-title=\"select a subset of this resource\"><i class=\"icon-pointer\"></i></a>\n    ";
  }

function program6(depth0,data) {
  
  
  return "\n    <div class=\"span8 rightsWarning alert-completed\">this download has been removed from the queue</div>\n    ";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n    <div class=\"span7 rightsWarning alert alert-error\">";
  if (stack1 = helpers.rights) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rights; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n    ";
  options = {hash:{},inverse:self.noop,fn:self.programWithDepth(9, program9, data, depth0),data:data};
  stack2 = ((stack1 = helpers.each_with_index || depth0.each_with_index),stack1 ? stack1.call(depth0, depth0.outfiles, options) : helperMissing.call(depth0, "each_with_index", depth0.outfiles, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            <div class=\"details span3 pull-right\"><div style=\"float:right\">expires: ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.timestamp_format || depth0.timestamp_format),stack1 ? stack1.call(depth0, depth0.expiration, options) : helperMissing.call(depth0, "timestamp_format", depth0.expiration, options)))
    + "</div></div>\n    ";
  return buffer;
  }
function program9(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n    <li class=\"span2\" class=\"";
  if (stack1 = helpers.colx) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.colx; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ";\">\n\n        ";
  options = {hash:{},inverse:self.noop,fn:self.programWithDepth(10, program10, data, depth1),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.clicked, false, options) : helperMissing.call(depth0, "compare", depth0.clicked, false, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        ";
  options = {hash:{},inverse:self.noop,fn:self.programWithDepth(12, program12, data, depth1),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.clicked, true, options) : helperMissing.call(depth0, "compare", depth0.clicked, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </li>\n    ";
  return buffer;
  }
function program10(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <a href=\"../api/v1/download/"
    + escapeExpression(((stack1 = depth2.apikey),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth2.sessionid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = depth2._fakeid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/";
  if (stack2 = helpers.realindex) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.realindex; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\">\n            "
    + escapeExpression(((stack1 = depth2.handle),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-";
  if (stack2 = helpers.realindex) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.realindex; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n        </a>\n        ";
  return buffer;
  }

function program12(depth0,data,depth2) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n        <span class=\"completed\">\n            "
    + escapeExpression(((stack1 = depth2.handle),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-";
  if (stack2 = helpers.realindex) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.realindex; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n        </span>\n        ";
  return buffer;
  }

  buffer += "<div class=\"span1\"></div><div class=\"dlsession span9\">\n<div class=\"titlepane span4\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.queued, true, options) : helperMissing.call(depth0, "equal", depth0.queued, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n\n<ul class=\"row span9 well dlFileList\">    \n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.queued, true, options) : helperMissing.call(depth0, "compare", depth0.queued, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.queued, false, options) : helperMissing.call(depth0, "compare", depth0.queued, false, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n    ";
  options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
  stack2 = ((stack1 = helpers.compare || depth0.compare),stack1 ? stack1.call(depth0, depth0.queued, true, options) : helperMissing.call(depth0, "compare", depth0.queued, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n\n</ul>\n\n\n\n<div class=\"divider span9\">\n    <hr>\n</div>\n</div>";
  return buffer;
  });
templates['downloadSubsetViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n<div><span class=\"muted\">estimated <span class=\"text-info\"><strong>new</strong></span> payload size:</span> ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.sizeBeautified || depth0.sizeBeautified),stack1 ? stack1.call(depth0, depth0.estimatedloadsize, options) : helperMissing.call(depth0, "sizeBeautified", depth0.estimatedloadsize, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div><span class=\"muted\">estimated <span class=\"text-info\"><strong>new</strong></span> total files:</span> ";
  if (stack1 = helpers.estimateddlcnt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.estimateddlcnt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n";
  return buffer;
  }

  buffer += "<div class=\"dlsession offset1 span9\">\n<div class=\"titlepane span4 pull-left\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n\n<div class=\"statspane span4 pull-right\">\n<div><span class=\"muted\">total payload size:</span> ";
  options = {hash:{},data:data};
  stack2 = ((stack1 = helpers.sizeBeautified || depth0.sizeBeautified),stack1 ? stack1.call(depth0, depth0.loadsize, options) : helperMissing.call(depth0, "sizeBeautified", depth0.loadsize, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n";
  stack2 = helpers['if'].call(depth0, depth0.estimatedloadsize, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n<div><span class=\"muted\">total files:</span> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.dlcnt || depth0.dlcnt),stack1 ? stack1.call(depth0, depth0.outfiles, options) : helperMissing.call(depth0, "dlcnt", depth0.outfiles, options)))
    + "</div>\n";
  stack2 = helpers['if'].call(depth0, depth0.estimateddlcnt, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n\n<div id=\"subsetToolbar\" class=\"span8 pull-right\">\n\n<span id=\"btnSubsetAccept\" class=\"pull-right icon-checkmark span1\" title=\"accept changes to and return to list\">\n</span>\n\n<span id=\"btnSubsetCancel\" class=\"pull-right icon-x-altx-alt\" title=\"nevermind (return to download list)\"></span>\n\n<span id=\"btnDrawDrag\" class=\"pull-right icon-target\" title=\"enables the drag cursor you use to drag a box on the map to subset/superset your existing choice\"></span>\n</div>\n<div class=\"divider span9\">\n<hr>\n</div>\n</div>";
  return buffer;
  });
templates['helpNag'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"btHelpNag\">\n\n<span aria-hidden=\"true\" class=\"icon-bubbles ";
  if (stack1 = helpers.status) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"width:100%;\"></span>\n</div>";
  return buffer;
  });
templates['helpViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n            <div class=\"key\">"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <div>\n              <div class=\"description muted\">\n                "
    + "\n                <em>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.joinDescription || depth0.joinDescription),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), options) : helperMissing.call(depth0, "joinDescription", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), options)))
    + "</em>\n              </div>\n              "
    + "\n                                      ";
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "format", options) : helperMissing.call(depth0, "equal", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "format", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                        \n\n                                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "handle", options) : helperMissing.call(depth0, "equal", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "handle", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                        \n\n                                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "location", options) : helperMissing.call(depth0, "equal", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "location", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                        \n\n                                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "resolution", options) : helperMissing.call(depth0, "equal", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "resolution", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                        \n\n                                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "series", options) : helperMissing.call(depth0, "equal", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "series", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                        \n\n                                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "subject", options) : helperMissing.call(depth0, "equal", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "subject", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                        \n\n                                        ";
  options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "tags", options) : helperMissing.call(depth0, "equal", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.key), "tags", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n            </div>\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <div class=\"sample_terms\">\n                Sample Terms:\n                <ul>\n                  ";
  stack1 = helpers.each.call(depth0, depth0.topTerms, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n              </div>\n              ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                                            "
    + "\n                                              ";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  stack2 = ((stack1 = helpers.isString || depth0.isString),stack1 ? stack1.call(depth0, depth0, true, options) : helperMissing.call(depth0, "isString", depth0, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                            ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n                  <li>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n                  ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <div class=\"sample_terms\">\n                Sample Terms:\n                <ul>\n                  ";
  stack1 = helpers.each.call(depth0, depth0.topTerms, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n              </div>\n              ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                                          ";
  options = {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data};
  stack2 = ((stack1 = helpers.isString || depth0.isString),stack1 ? stack1.call(depth0, depth0, true, options) : helperMissing.call(depth0, "isString", depth0, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                                        ";
  return buffer;
  }

  buffer += "<div id=\"help-header\" class=\"help-header navbar navbar-static navbar-inverse row\">\n  <div class=\"navbar-inner\">\n    <div class=\"container\" style=\"width: auto;\">\n      <ul class=\"nav span8\" id=\"help-nav\">\n        <li class=\"active\">\n          <a href=\"#help-faq\">FAQ</a>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            General Notes <b class=\"caret\"></b>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li class=\"\">\n              <a href=\"#help-general-general\">General Notes</a>\n            </li>\n            <li class=\"\">\n              <a href=\"#help-general-webapp\">Web App Intricacies</a>\n            </li>\n            <li class=\"\">\n              <a href=\"#help-general-quality\">Quality Notes</a>\n            </li>\n          </ul>\n        </li>\n        <li class=\"\">\n          <a href=\"#help-searching\">Searching</a>\n        </li>\n        <li class=\"\">\n          <a href=\"#help-downloading\">Downloading</a>\n        </li>\n        <li class=\"dropdown\">\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n            API <b class=\"caret\"></b>\n          </a>\n          <ul class=\"dropdown-menu\">\n            <li class=\"active\">\n              <a href=\"#help-api-discs\">Discs (Clusters)</a>\n            </li>\n            <li class=\"\">\n              <a href=\"#help-api-rasterenvelopes\">Raster Envelopes</a>\n            </li>\n                        <li class=\"\">\n              <a href=\"#help-api-vectorenvelopes\">Vector Envelopes</a>\n            </li>\n            <li class=\"divider\"></li>\n            <li class=\"\">\n              <a href=\"#help-api-geonames\">GeoNames</a>\n            </li>\n          </ul>\n        </li>\n        <li class=\"\">\n          <a href=\"#help-updates\">Updates</a>\n        </li>\n        <li class=\"\">\n          <a href=\"#help-credits\">Credits</a>\n        </li>\n      </ul>\n      <form class=\"navbar-search pull-right\" action=\"\">\n        <input placeholder=\"filter this help content by keyword\" type=\"text\" id=\"input-faqfilter\" class=\"input-medium search-query span4\"></form>\n    </div>\n  </div>\n</div>\n\n<div class=\"helpcontainer marketing row\" data-spy=\"scroll\" data-target=\"#help-header.navbar\" data-offset=\"100\">\n\n  <section class=\"span11\" id=\"help-faq\">\n    <h2>FAQ</h2>\n    <div class=\"span4\"></div>\n    <div class=\"muted span7 homebody\" style=\"text-align:left;\">\n      <dl class=\"dl-horizontal\">\n        <dt>Can I press the 'z' key?</dt>\n        <dd>\n          Is this question a plant? Yes, you can. It will show/hide this pane entirely in order to better work with the map. If you have auto-search (where you start typing anywhere and the browser immediately begins looking for that text on the page), you may end up having to click somewhere on the page before you hit the key again, though. Otherwise very useful.\n        </dd>\n        <dt>Can I press the 'c' key?</dt>\n        <dd>\n          That, too, yes. It will toggle the position of this pane, pushing it almost entirely to the right side of the screen so you can see more of the map.\n        </dd>\n        <dt>Can I press the '`' key?</dt>\n        <dd>\n          Ok, seriously, who is this? Yes, you can press the '`' (backtick - aka the tilde) key to toggle almost the entire set of elements that hover over the map.\n        </dd>\n        <dt>What should I do first?</dt>\n        <dd>\n          You can either type your area of interest (e.g. \"South Korea\" or \"Flagstaff\") into the search box or type words you think define your data need (e.g. \"cib\" or \"elevation\"). If you typed a location you can either click from the picklist or click \"Find/Zoom to a Place\" and the map will snap to your area of interest. If you click \"Search for Data\" your terms will be queried against the library's catalog of data holdings.\n        </dd>\n\n        <dt>What data are here?</dt>\n        <dd>\n          Available here are data sets that are permanent additions to the Library's collection. In most cases, the sources have been manipulated to improve electronic discovery and access.\n        </dd>\n        <dt>\n          What data are <em>not</em>\n          here?\n        </dt>\n        <dd>\n          At this point we do not index or deliver data that are not under the library's purview. You will not, therefore, find data produced elsewhere in The Lab, nor will you find other commonly-requested sources such as\n          <a href=\"http://factfinder2.census.gov/faces/nav/jsf/pages/index.xhtml\">U.S. Census Data</a>\n          or Columbia's\n          <a href=\"http://sedac.ciesin.columbia.edu/gpw/index.jsp\">Gridded Population of the World</a>. If at any time you would like help identifying data not available here, you are very welcome to request our assistance.\n        </dd>\n        <dt>How much data can I get?</dt>\n        <dd>\n          Meaning are there limits on the download size? Yes and no. We cap how much data can be delivered <em>per download</em>. Meaning we just aren't going to tarball a 10 TB dataset and let you pull it down over the wires. For data requests that exceed the cap (as of this writing set at 500mb), the delivery is split across <em>n</em> downloads, and your progress is managed with cookies. Even <em>then</em> delivering terabyte after terabyte of data over the network is not ideal and we encourage you to evaluate whether you truly need that much material. If you really do, feel free to contact us and we can arrange for another way to access the material.\n        </dd>\n        <dt>What will I get?</dt>\n        <dd>\n          Please see the <a href=\"#help-downloading\">downloading</a> section for details on just what will show up in your downloads.\n        </dd>\n\n      </dl>\n\n    </div>\n  </section>\n\n  <section class=\"\">\n    <h2>General Notes</h2>\n    <div id=\"help-general-general\" class=\"muted homebody\" style=\"text-align:left;\">\n      <h4>General</h4>\n      <p>\n        This was built to facilitate electronic access to the store of digital geospatial data that formerly were available only on physical media in the Lincoln Laboratory Library &amp; Archives. As are most modern web applications, this is heavily dependent a more or less modern browser with javascript enabled. Strange behavior might result from using out-of-date browsers. And don't even get us started on IE -- it wasn't even available for testing during most of the development period due to security concerns, so we cannot at this point guarantee IE will execute as expected.\n      </p>\n      <p>\n        <img class=\"marketing-img img-polaroid pull-right\" src=\"images/cookie-warning.jpg\" height=\"\" width=\"363px\">\n        Likewise, because we didn't really want to force anybody to set up accounts and log in all the time, we manage downloads/sessions using cookies. If you do not have cookies enabled this will technically still work but if you close your tab/browser your information will not persist.\n      </p>\n    </div>\n\n    <div id=\"help-general-webapp\" class=\"muted homebody\" style=\"text-align:left;\">\n      <h4>Web App Intricacies</h4>\n      <p>\n        At any time, clicking the <i class=\"icon-bubbles \"></i>\n        icon will turn on inline annotations that might answer some immediate questions you have about this application's functionalities.\n      </p>\n      <p>\n        See the\n        <a href=\"#help-searching\">Searching</a>\n        section for details about how to execute a query for data, but the rest of what happens can be described per tab:\n        <dl>\n          <dt>Search Results</dt>\n          <dd>\n            <div>\n              Results are sorted by their ranking, which is informed by <a href=\"http://lucene.apache.org/solr/\">Solr</a>'s own ranking algorithm, which we in turn boost with a popularity value, a manually-applied weighting value, and the dataset's relationship to the basemap at the time of the search. More specifically, datasets whose spatial extent overlaps the map are ranked higher than other datasets that match the keyword and datasets whose spatial extent most closely matches the map's surface area will rank higher still.</div>\n            <div>\n              <p>\n                Moreover, each search hit comes with a set of nifty little buttons. To wit:\n\n                          <ul style=\"list-style:none;\">\n                                        <li style=\"padding-left:22px;margin-bottom:33px\">\n                                        <i class=\"icon-rectangleselection\" style=\"height:100%;float:left;font-size:3em; margin-right:35px;clear:both;\"></i>\n                                        toggles a rectangular envelope representing the spatial extent of the dataset\n                                        </li>\n                                        <li style=\"padding-left:22px;margin-bottom:33px\">\n                                        <i class=\"icon-grid\" style=\"height:100%;float:left;font-size:3em; margin-right:35px;clear:both;\"></i>\n                                        toggles a map layer depicting a grid of individual tiles (raster data only)\n                                        </li>\n                                        <li style=\"padding-left:22px;margin-bottom:33px\">\n                                        <i class=\"icon-read-more\" style=\"height:100%;float:left;font-size:3em; margin-right:35px;clear:both;\"></i>\n                                        sends the dataset directly to the Details pain (the search results will not be lost), where more information is available about the resource\n                                        </li>\n                                        <li style=\"padding-left:22px;margin-bottom:33px\">\n                                        <i class=\"icon-awesome-download\" style=\"height:100%;float:left;font-size:3em; margin-right:35px;clear:both;\"></i>\n                                        adds the dataset to your download queue, where it will be available in chunks and where you can make optional subselections\n                                        </li>\n                          <li style=\"padding-left:22px;margin-bottom:33px\">\n                                        <i class=\"icon-eye2\" style=\"height:100%;float:left;font-size:3em; margin-right:35px;clear:both;\"></i>\n                                        toggles a preview layer of the dataset -- vector data will be limitied to something like 50 features and raster data will appear as a lesser-quality rendering of source data. (See <a href=\"#help-general-quality\">Quality Notes</a> for an explanation.)\n                                        </li>\n                                </ul>\n                          </p>\n            </div>\n            \n          </dd>\n          <dt>Details</dt>\n          <dd>\n            Additional details about datasets are revealed here, including full abstracts (including notes we may have added in-house), publication dates, temporal coverage ranges, and other details.\n          </dd>\n          <dt>Download Queue</dt>\n          <dd>\n            <p>\n              At its most basic, this is a list of the datasets whose 'Download' button you have pressed. While the window remains open the list self-updates and indicates visually the download progress of the job (individual links that have completed downloading will be crossed out and a small %-complete guage fills in). At any time you can click the\n              <i class=\"icon-x-altx-alt\"></i>\n              button to remove the dataset from the queue completely.\n            </p>\n            <p>\n              For raster data, an additional option exists for selecting subsets of the data. Clicking the\n              <i class=\"icon-pointer\"></i>\n              button will activate the subselection tool and menu. A couple of notes about this procedure:\n              <ul>\n                <img class=\"marketing-img img-polaroid pull-right\" src=\"images/leo-download-subset.jpg\" height=\"\" width=\"213px\">\n                <li>\n                  The map will display a layer illustrating the individual tiles available for selection.\n                </li>\n                <li>The cursor will change to a crosshair.</li>\n                <li>\n                  Simply drag a box on the map over the area for which you want data.\n                </li>\n                <li>\n                  A rough estimate of the\n                  <em>new</em>\n                  download size will hover over the cursor as you drag.\n                </li>\n                <li>\n                  Upon completion of the rectangle, the new estimate will appear in the list of download details.\n                </li>\n                <li>\n                  The download job will not be redefined until you click\n                  <i class=\"icon-checkmark\"></i>\n                  to accept the changes.\n                </li>\n                <li>\n                  You may cancel the subset procedure by clicking\n                  <i class=\"icon-x-altx-alt\"></i>\n                  .\n                </li>\n                <li>\n                  If you lose the crosshair tool (e.g. you've drawn a box once and you've made a huge mistake), you can redraw by clicking\n                  <i class=\"icon-target\"></i>\n                  .\n                </li>\n              </ul>\n            </p>\n          </dd>\n        </dl>\n      </p>\n    </div>\n    <div id=\"help-general-quality\" class=\"muted homebody\" style=\"text-align:left;\">\n      <h4>Quality Notes</h4>\n      <p>\n        All downloads will deliver data at their original quality (though for vector data and some raster series, *not* in their original formats). The quality of the original data, of course, varies per series (often per sub-series).\n      </p>\n      <p>\n        For raster data in particular, however, the previews will be of, at times, noticeably lesser quality than the real sources from which they were derived. In order to efficiently deliver data to the browser, we both compress and resample the imagery (not to mention deliver as tiled .png images). This allows us to deliver more or less seamless previews of entire series at any scale but degrades the quality of the previews. See the following comparison:\n      </p>\n      <div class=\"row span9\" style=\"margin-bottom: 111px;\">\n        <!-- /.fudging layout bc lightbox height isn't accounted for -->\n        <div class=\"popup-gallery\">\n          <ul class=\"\">\n            <li class=\"span4\">\n              <div class=\"thumbnail pull-left\" style=\"background-color:black;\">\n                <a href=\"images/cib_res-jpg.jpg\" title=\"jpeg compressed, YCBCR GDAL color model, delivered to browser as png\" rel=\"noreferrer\">\n                  <img src=\"images/cib_res-jpg.jpg\" class=\"span3 marketing-img\" ></a>\n                <p>rendered preview sample</p>\n              </div>\n            </li>\n            <li class=\"span4\">\n              <div class=\"thumbnail pull-left\" style=\"background-color:black;\">\n                <a href=\"images/cib_res-full.jpg\" title=\"raw *.i4* tiles\" rel=\"noreferrer\">\n                  <img src=\"images/cib_res-full.jpg\" class=\"span3 marketing-img\" ></a>\n                <p>full resolution source sample</p>\n              </div>\n            </li>\n          </ul>\n        </div><!-- /.popup-gallery --> \n      </div>\n      <!-- /.row --> </section>\n\n    <section id=\"help-downloading\">\n      <h2>Downloading</h2>\n      <div class=\"muted homebody\" style=\"text-align:left;\">\n        <p>\n          <img src=\"images/leo-download-progress.jpg\" class=\"marketing-img img-polaroid pull-right\" style=\"width:160px;height:80px;\">\n          Vector data will download as a single zip archive of however much data you requested. At least upon initial release this will be hard-wired to the Shapefile format, although we do expect to ultimately offer a choice should users desire it.\n        </p>\n        <p>\n          The same is mostly true for raster data, but there is some nuance. First of all, in order to facilitate access to data below the level of the compact discs on which they ship, we deliver raster data in their native, tiled structures. A request for a rectangle's-worth of CIB01 data that happens to span multiple discs will grab up all the individual tiles under that envelope and return them, tarballed, in their native formats. All of the GIS packages we have tested read these formats natively, but if reports come in that suggest we need to pre-convert we will consider it. As with vector data we expect at some point to be able to offer an inline choice of delivery format (depending on the performance hit).\n        </p>\n        <p>\n          It's very likely that you'll be requesting data that eclipses the cap we put on individual downloads, which as of this writing is 500mb. When that happens, your download will be split across however many 500mb chunks will encompass the request. You can imagine that for big jobs equaling many individual downloads it might grow cumbersome to sit and click link after link after link. To that end, we're using cookies (and not accounts) to tie your browser to the downloads you've requested. If cookies are turned on in your browser, you will be able to quit/close your browser before you complete downloading all of the chunks of a request and still return at a later time to complete your work.\n        </p>\n        <p>\n          You're welcome to use a download manager as well (\n          <a href=\"https://addons.mozilla.org/en-US/firefox/addon/downthemall/\">DownThemAll!</a>\n          for Firefox,\n          <a href=\"https://chrome.google.com/webstore/detail/downloadall/ajffocjdcmpgjmdfdfkdfdbkjafbkcke?hl=en\">DownloadAll</a>\n          for Chrome, et al). If we start seeing performance issues at some point we will adjust how we handle bulk downloading.\n        </p>\n      </div>\n      <!-- /.muted homebody --> </section>\n    <!-- /.help-downloading -->\n\n    <section class=\"span11\" id=\"help-searching\">\n      <h2>Searching</h2>\n      <div class=\"muted homebody\" style=\"text-align:left;\">\n        <h4>The Search Box</h4>\n        <p>\n          The search box actually pulls double-duty as both a placename finder and data query input field. Any term typed into the search input field will be shopped on the fly against the\n          <a href=\"http://www.freebase.com/\">Freebase</a>\n          API. If the result contains geographic entities (cities, countries, states, national parks, famous naturally-occurring features, etc.) they can be clicked to make the map zoom and identify that entity. (\n          <em>Technically</em>\n          what's happening here is that the term is re-shopped to the <a href=\"http://developer.mapquest.com/web/products/open/nominatim\">Nominatum API</a> to pull out the geographic representation of that place for rendering on a map. If Nominatum does not respond with valid geography, we re-shop the term to our\n          <a href=\"#help-api-geonames\">in-house instance</a>\n          of the\n          <a href=\"http://geonames.org\">GeoNames</a>\n          database to at least pull out a coordinate pair of that place.) Any other word can be left in the input field and when \"Search for Data\" is clicked the term will be used as a query of our data catalog.\n        </p>\n        <div class=\"row\">\n          <div class=\"popup-gallery\">\n            <a href=\"images/leo-freebase-picklist.jpg\">\n              <img src=\"images/leo-freebase-picklist.jpg\" class=\"marketing-img img-polaroid pull-left span3\"></a>\n            <a href=\"images/leo-freebase-poly.jpg\">\n              <img src=\"images/leo-freebase-poly.jpg\" class=\"marketing-img img-polaroid pull-left span3\"></a>\n            <a href=\"images/leo-search-results.jpg\">\n              <img src=\"images/leo-search-results.jpg\" class=\"marketing-img img-polaroid pull-left span3\"></a>\n          </div>\n          <!-- /.popup-gallery --> </div>\n        <h4>The Search Algorithm</h4>\n        <p>\n          We take pains to make the search algorithm here return good results with minimal cognitive overhead. Most of the time, therefore, we expect a halfway decently-contructed keyword search will suffice. Power users, however, might be pleased to know that because we use Solr for searching/indexing there is the full complement of Solr (Lucene) search tricks at your disposal. There is plenty of help on the greater web for interacting with Solr-backed search services, but a good place to start is the\n          <a href=\"http://wiki.apache.org/solr/SolrQuerySyntax\">Solr Wiki</a>. The list of indexed metadata fields below should be of some use to those who want to bend our search to their will or who otherwise need a fuller understanding of what we catalog.\n        </p>\n        <p>\n          <div class=\"solr_fields\">\n            ";
  stack1 = helpers.each.call(depth0, depth0.fields, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </div>\n          <!-- /.solr_fields --> </p>\n      </div>\n    </section>\n    <!-- /.help-searching -->\n    <section class=\"\" id=\"help-api\">\n      <h2>API</h2>\n      <div id=\"help-api-discs\" class=\"muted homebody\" style=\"text-align:left;\">\n        <h4>Discs (Clusters)</h4>\n        <dl class=\"apidoc\">\n          <div class=\"route\">GET->/discs/:series/:outform/:type</div>\n          <p class=\"desc\"> <em>For raster sources only, delivers an array of the individual discs (or other manual clusters) that have been processed and made available as part of the :series.</em> \n          </p>\n          <dt>series</dt>\n          <dd>\n            <p class=\"desc\">\n              This is the major series designator, as in \"cib01\" or \"dted02,\" et al. If passed a disc filename (e.g. \"CDRG-5NINM3134\" or \"CDRG-5NINM3134.zip\") <em>and</em> the \"type\" is set to \"searchwith\" (see below), the API returns the metadata record we have for the original disc that came in through the door.\n            </p>\n          </dd>\n          <dt>outform</dt>\n          <dd>\n            <p class=\"desc\">Format of the output, valid forms here are json. That's it!</p>\n          </dd>\n          <dt>type</dt>\n          <dd>\n            <p>\n              <span class=\"example\">individual</span>\n              will return an array of individual discs or organizing clusters\n            </p>\n            or\n            <p>\n              <span class=\"example\">aggregate</span>\n              will return the starting publication date and ending publication date for the given series -- typically used internally and not of public interest\n            </p>\n          </dd>\n          <dt>example</dt>\n          <dd>\n            <p class=\"call\">http://host/api/v1/discs/dted01/json/individual</p>\n            <p class=\"response well\">\n              [{&quot;resid&quot;:&quot;dted101&quot;},{&quot;resid&quot;:&quot;dted102&quot;},{&quot;resid&quot;:&quot;dted103&quot;},...\n            </p>\n            <p class=\"desc\">\n              ...where the resid values are IDs of individual discs or clusters of discs\n            </p>\n          </dd>\n          <dt>example</dt>\n          <dd>\n            <p class=\"call\">http://host/api/v1/discs/CDRG-5NINM3134/json/searchwith</p>\n            <p class=\"response well\">\n              [{\"title\":\"Compressed ARC Digitized Raster Graphics (CADRG): (Italy France Belgium Netherlands Germany Poland Czech Republic Slovakia Hungary Austria Switzerland Croatia Bosnia Herzegovina Serbia Ukraine Romania Bulgaria Macedonia Greece Albania Algeria Tunisia Libya Spain)\",\"series\":\"cdrg\",\"resid\":\"CDRG-5NINM3134\",\"envelope\":\"POLYGON ((-0.514152168267998 52.29146692233941,24.213325859075752 52.29146692233941,24.213325859075752 31.581975071908076,-0.514152168267998 31.581975071908076,-0.514152168267998 52.29146692233941))\"}]\n            </p>\n            <p class=\"desc\">\n              ...where the \"envelope\" block is the spatial extent of the disc's full contents, no matter any gaps\n            </p>\n          </dd>\n        </dl>\n</div>\n<div id=\"help-api-rasterenvelopes\" class=\"muted homebody\" style=\"text-align:left;\">\n  <h4>Raster Envelopes</h4>\n <dl class=\"apidoc\">\n          <div class=\"route\">GET->/rasterenvelopes/:series/:disc/:outform/:type</div>\n          <p class=\"desc\">This route is designed primarily to deliver spatial extents of raster sources. It's used by the GUI's <i class=\"icon-expand\"></i> button. The variables here determine whether entire series' envelopes are returned versus some sub-series slice.\n          </p>\n          <dt>series</dt>\n          <dd>\n            <p class=\"desc\">\n              This is the major series designator, as in \"cib01\" or \"dted02,\" et al.\n            </p>\n          </dd>\n          <dt>disc</dt>\n          <dd>\n            <p class=\"desc\">\n              Which piece of the series do you want to represent? Valid values are individual disc IDs (e.g. \"dted104\") or \"all,\" in which case all available discs in the series are returned.\n            </p>\n          </dd>\n          <dt>outform</dt>\n          <dd>\n            <p class=\"desc\">\n              Format of response. Valids are\n              <span class=\"example\">geojson</span>\n              ,\n              <span class=\"example\">json</span>\n              ,\n              <span class=\"example\">kml</span>\n              , and\n              <span class=\"example\">wkt</span>\n              .\n            </p>\n          </dd>\n          <dt>type</dt>\n          <dd>\n            <p class=\"desc\">\n              Do you want envelopes for each component (disc/cluster/etc.) of the series or the entire series? Use\n              <span class=\"example\">individual</span>\n              or\n              <span class=\"example\">aggregate</span>\n              , respectively.\n            </p>\n          </dd>\n\n          <dt>example</dt>\n          <dd>\n            <p class=\"call\">\n              http://host/api/v1/rasterenvelopes/dted01/dted104/json/aggregate\n            </p>\n            <p class=\"response well\">\n              {\n  &quot;results&quot; : [\n    [\n      {\n        &quot;location&quot; : &quot;aggregated envelope - you should know that coverage is probably not contiguous&quot;,\n        &quot;bbox_south&quot; : &quot;65.9995833333333&quot;,\n        &quot;bbox_west&quot; : &quot;-24.00125&quot;,\n        &quot;id&quot; : &quot;1&quot;,\n        &quot;st_extent&quot; : &quot;BOX(-24.00125 65.9995833333333,72.00125 82.0004166666667)&quot;,\n        &quot;bbox_north&quot; : &quot;82.0004166666667&quot;,\n        &quot;bbox_east&quot; : &quot;72.00125&quot;\n      }\n    ]\n  ]\n}\n            </p>\n            <p class=\"desc\">\n              Here, disc/cluster dted104 was requested with an\n              <span class=\"example\">aggregate</span>\n              type, and the result will be the max spatial extent of all of the dted104 tiles.\n            </p>\n          </dd>\n          <dt>example</dt>\n          <dd>\n            <p class=\"call\">\n              http://host/api/v1/rasterenvelopes/dted01/dted104/json/individual\n            </p>\n            <p class=\"response well\">\n              {\n  &quot;results&quot; : [\n    [\n      {\n        &quot;location&quot; : &quot;sources/DTED104/DTED/E010/N78.DT1&quot;,\n        &quot;bbox_south&quot; : &quot;77.9995833333333&quot;,\n        &quot;grouping&quot; : &quot;dted104&quot;,\n        &quot;id&quot; : &quot;13905&quot;,\n        &quot;bbox_west&quot; : &quot;9.99833333333333&quot;,\n        &quot;st_transform&quot; : &quot;0106000020E61000000100000001030000000100000005000000BF58F28B25FF23403A6DA0D306C0534041A70D74DA0026403A6DA0D306C0534041A70D74DA002640C6925F2CF97F5340BF58F28B25FF2340C6925F2CF97F5340BF58F28B25FF23403A6DA0D306C05340&quot;,\n        &quot;bbox_north&quot; : &quot;79.0004166666667&quot;,\n        &quot;bbox_east&quot; : &quot;11.0016666666667&quot;\n      },\n      {\n        &quot;location&quot; : &quot;sources/DTED104/DTED/E010/N79.DT1&quot;,\n        &quot;bbox_south&quot; : &quot;78.9995833333333&quot;,\n        &quot;grouping&quot; : &quot;dted104&quot;,\n        &quot;id&quot; : &quot;13906&quot;,\n        &quot;bbox_west&quot; : &quot;9.99833333333333&quot;,\n        &quot;st_transform&quot; : &quot;0106000020E61000000100000001030000000100000005000000BF58F28B25FF23403A6DA0D30600544041A70D74DA0026403A6DA0D30600544041A70D74DA002640C6925F2CF9BF5340BF58F28B25FF2340C6925F2CF9BF5340BF58F28B25FF23403A6DA0D306005440&quot;,\n        &quot;bbox_north&quot; : &quot;80.0004166666667&quot;,\n        &quot;bbox_east&quot; : &quot;11.0016666666667&quot;\n      },\n            </p>\n            <p class=\"desc\">\n              Here, disc/cluster dted104 was requested with an\n              <span class=\"example\">individual</span>\n              type, so the result will be a collection of\n              <em>each</em>\n              graticule/tile on that disc/cluster.\n            </p>\n          </dd>\n          <dt>example</dt>\n          <dd>\n            <p class=\"call\">http://host/api/v1/rasterenvelopes/dted01/all/json/aggregate</p>\n            <p class=\"response well\">\n              {\n  &quot;results&quot; : [\n    [\n      {\n        &quot;location&quot; : &quot;aggregated envelope - you should know that coverage is probably not contiguous&quot;,\n        &quot;bbox_south&quot; : &quot;-54.0004166666667&quot;,\n        &quot;bbox_west&quot; : &quot;-180.00125&quot;,\n        &quot;id&quot; : &quot;1&quot;,\n        &quot;st_extent&quot; : &quot;BOX(-180.00125 -54.0004166666667,180.00125 82.0004166666667)&quot;,\n        &quot;bbox_north&quot; : &quot;82.0004166666667&quot;,\n        &quot;bbox_east&quot; : &quot;180.00125&quot;\n      }\n    ]\n  ]\n}\n            </p>\n            <p class=\"desc\">\n              Here, all discs/clusters for series dted01 were requested with an\n              <span class=\"example\">aggregate</span>\n              type, so the result will be the full extent of all the series' disc/clusters taken together.\n            </p>\n          </dd>\n          <dt>example</dt>\n          <dd>\n            <p class=\"call\">\n              http://host/api/v1/rasterenvelopes/dted01/all/json/individual\n            </p>\n            <p class=\"response well\">\n              {\n  &quot;results&quot; : [\n    [\n      {\n        &quot;location&quot; : &quot;sources/DTED101/dted/w110/n67.dt1&quot;,\n        &quot;bbox_south&quot; : &quot;66.9995833333333&quot;,\n        &quot;grouping&quot; : &quot;dted101&quot;,\n        &quot;id&quot; : &quot;13357&quot;,\n        &quot;bbox_west&quot; : &quot;-110.000833333333&quot;,\n        &quot;st_transform&quot; : &quot;0106000020E6100000010000000103000000010000000500000074DA40A70D805BC03A6DA0D3060051408C25BF58F23F5BC03A6DA0D3060051408C25BF58F23F5BC0C6925F2CF9BF504074DA40A70D805BC0C6925F2CF9BF504074DA40A70D805BC03A6DA0D306005140&quot;,\n        &quot;bbox_north&quot; : &quot;68.0004166666667&quot;,\n        &quot;bbox_east&quot; : &quot;-108.999166666667&quot;\n      },\n      {\n        &quot;location&quot; : &quot;sources/DTED101/dted/w110/n68.dt1&quot;,\n        &quot;bbox_south&quot; : &quot;67.9995833333333&quot;,\n        &quot;grouping&quot; : &quot;dted101&quot;,\n        &quot;id&quot; : &quot;13358&quot;,\n        &quot;bbox_west&quot; : &quot;-110.000833333333&quot;,\n        &quot;st_transform&quot; : &quot;0106000020E6100000010000000103000000010000000500000074DA40A70D805BC03A6DA0D3064051408C25BF58F23F5BC03A6DA0D3064051408C25BF58F23F5BC0C6925F2CF9FF504074DA40A70D805BC0C6925F2CF9FF504074DA40A70D805BC03A6DA0D306405140&quot;,\n        &quot;bbox_north&quot; : &quot;69.0004166666667&quot;,\n        &quot;bbox_east&quot; : &quot;-108.999166666667&quot;\n      },\n            </p>\n            <p class=\"desc\">\n              Here, all discs/clusters for series dted01 were requested with an\n              <span class=\"example\">individual</span>\n              type, so the result will be individual features for each disc/cluster that comprise the series.\n            </p>\n\n          </dd>\n        </dl>\n        <div class=\"row popup-gallery span11\" style=\"\">\n          <ul class=\"span8\" style=\"margin-left: 0px;\">\n            <li class=\"\">\n              <div style=\"background-color:black;\" class=\"thumbnail\">\n                <a rel=\"noreferrer\" title=\"/api/v1/rasterenvelopes/dted01/all/json/aggregate\" href=\"images/api-dted01-all_aggregate.jpg\">\n                  <img class=\"span3 marketing-img\" src=\"images/api-dted01-all_aggregate.jpg\"></a>\n                <p>/api/v1/rasterenvelopes/dted01/all/json/aggregate</p>\n              </div>\n            </li>\n            <li class=\"\">\n              <div style=\"background-color:black;\" class=\"thumbnail\">\n                <a rel=\"noreferrer\" title=\"/api/v1/rasterenvelopes/dted01/all/json/individual\" href=\"images/api-dted01-all_individual.jpg\">\n                  <img class=\"span3 marketing-img\" src=\"images/api-dted01-all_individual.jpg\"></a>\n                <p>/api/v1/rasterenvelopes/dted01/all/json/individual</p>\n              </div>\n            </li>\n\n            <li class=\"\">\n              <div style=\"background-color:black;\" class=\"thumbnail\">\n                <a rel=\"noreferrer\" title=\"/api/v1/rasterenvelopes/dted01/dted104/json/aggregate\" href=\"images/api-dted01-dted104_aggregate.jpg\">\n                  <img class=\"span3 marketing-img\" src=\"images/api-dted01-dted104_aggregate.jpg\"></a>\n                <p>/api/v1/rasterenvelopes/dted01/dted104/json/aggregate</p>\n              </div>\n            </li>\n\n          </ul>\n        </div><!-- /.popup-gallery --> \n\n      </div>\n      <div id=\"help-api-vectorenvelopes\" class=\"muted homebody\" style=\"text-align:left;\">\n        <h4>Vector Envelopes</h4>\n        <dl class=\"apidoc\">\n        <div class=\"route\">GET->/vectorenvelopes/:series/:handle/:outform</div>\n        <p class=\"desc\"> vectorenvelopes returns similar to rasterenvelopes, but has no control over pulling out the component pieces (discs/clusters) since our vector data aren't organized as such. \n        </p>\n        <dt>series</dt>\n        <dd>\n          <p class=\"desc\">\n            major vector series descripter (e.g. \"vmap01\" or \"vmap02\")\n          </p>\n        </dd>\n        <dt>handle</dt>\n        <dd>\n          <p class=\"desc\">\n            minor vector series descripter (e.g. \"bnd_barrierl\" or \"elev_countourl\")\n          </p>\n        </dd>\n                <dt>outform</dt>\n        <dd>\n          <p class=\"desc\">\n            output format; valids are\n              <span class=\"example\">geojson</span>\n              ,\n              <span class=\"example\">json</span>\n              ,\n              <span class=\"example\">kml</span>\n              , and\n              <span class=\"example\">wkt</span>\n              .\n          </p>\n        </dd>\n        \n        <dt>example</dt>\n        <dd>\n          <p class=\"call\">http://host/leo/api/v1/vectorenvelopes/vmap01/libref_libref/json</p>\n          <p class=\"response\">{\n  &quot;results&quot; : [\n    [\n      {\n        &quot;bbox_south&quot; : &quot;-84&quot;,\n        &quot;bbox_west&quot; : &quot;-179.9999&quot;,\n        &quot;st_extent&quot; : &quot;BOX(-179.9999 -84,179.9999 83.6539840698242)&quot;,\n        &quot;bbox_north&quot; : &quot;83.6539840698242&quot;,\n        &quot;bbox_east&quot; : &quot;179.9999&quot;\n      }\n    ]\n  ]\n}</p>\n        </dd>\n      </dl> <!-- /.apidoc -->\n      </div>\n      <div id=\"help-api-geonames\" class=\"muted homebody\" style=\"text-align:left;\">\n        <h4>GeoNames</h4>\n        <p class=\"desc\">Recall that the search box is multi-functional. One thing you can do is type placenames (or other known locations) into the box and pick from the popout list. You'll be zoomed to that location so any ensuing searches will be informed by the map's state. Then of course you can type your keywords into the same box and click \"Search for Data\" in order to query our data catalog.</p>\n        <p class=\"desc\">But a little more about the former. When you type a location into the search field, your term is shopped against the Freebase api. <a href=\"http://freebase.com\">Freebase</a> is \"a community-curated database of well-known people, places, and things,\" and among its many virtues is that it often returns spatial objects with its search results. Entering \"Alaska\" into the search field and selecting the top hit will request Alaska's spatial object from Freebase, load it onto the map, and zoom to it. It's basic geocoding with the nifty bonus of actual spatial shapes.</p>\n        <p class=\"desc\">But Freebase sometimes fails to bring back results, and in order to have a fallback to still get you where you want to be on the map, we've stood up a local instance of the <a href=\"http://www.geonames.org/\">GeoNames</a> service. In front of GeoNames we have a Solr instance that allows for standard Solr (Lucene)-style searching of the GeoNames datastore. We built it largely for internal use, but since we have it, we might as well let you know about it, yeah?</p>\n              <dl class=\"apidoc\">\n        <div class=\"route\">GET->/geonames/collection1/select?q=&#60;key&#62;:&#60;value&#62;&amp;wt=&#60;format&#62;$sort=&#60;sortlist&#62;&amp;rows=&#60;rowsnum&#62;</div>\n        \n        <dt>key:value</dt>\n        <dd>\n          <p class=\"desc\">\n            Searchable keys include \"name,\" \"country_code,\" and \"feature_class.\" See the \"featureClass\" block in <a href=\"http://www.geonames.org/export/geonames-search.html\">GeoNames' own documentation</a> for valids. Note that the colon should stay but you're welcome (advised, even) to right-truncate using the * wildcard or other Solr tricks you might know.\n          </p>\n        </dd>\n\n        <dt>format</dt>\n        <dd>\n          <p class=\"desc\">\n            Output format. Defaults to xml, but valids include \"json,\" \"csv.\"\n          </p>\n        </dd>\n        \n        \n\n        <dt>sortlist</dt>\n        <dd>\n          <p class=\"desc\">\n            Space-delimited array of fields on which to sort, in order.\n          </p>\n        </dd>\n              \n\n        <dt>rowsnum</dt>\n        <dd>\n          <p class=\"desc\">\n            How many records do you want?\n          </p>\n        </dd>\n        \n        <dt>example</dt>\n        <dd>\n          <p class=\"call\">http://host/geonames/collection1/select?q=feature_class:R&wt=json&indent=on&sort=score desc,population desc&rows=11</p>\n          <p class=\"response\">{\n  &quot;responseHeader&quot;:{\n    &quot;status&quot;:0,\n    &quot;QTime&quot;:370,\n    &quot;params&quot;:{\n      &quot;sort&quot;:&quot;score desc,population desc&quot;,\n      &quot;indent&quot;:&quot;on&quot;,\n      &quot;q&quot;:&quot;feature_class:R&quot;,\n      &quot;wt&quot;:&quot;json&quot;,\n      &quot;rows&quot;:&quot;11&quot;}},\n  &quot;response&quot;:{&quot;numFound&quot;:29477,&quot;start&quot;:0,&quot;docs&quot;:[\n      {\n        &quot;geonameid&quot;:8347311,\n        &quot;name&quot;:&quot;Raparin&quot;,\n        &quot;asciiname&quot;:&quot;Raparin&quot;,\n        &quot;latitude&quot;:36.24254,\n        &quot;longitude&quot;:44.8828,\n        &quot;feature_class&quot;:&quot;R&quot;,\n        &quot;country_code&quot;:&quot;IQ&quot;,\n        &quot;population&quot;:4000,\n        &quot;_version_&quot;:1420981434598817807},</p>\n        </dd>\n      </dl><!-- /.apidoc -->\n\n </div> <!-- /.help-api-geonames -->\n    </section><!-- /.help-api -->\n\n    <section class=\"\" id=\"help-updates\">\n      <h2>Updates</h2>\n      <div class=\"muted homebody\" style=\"text-align:left;\">\n        <h4>In-App Updates Visualization</h4>\n        <p>\n          <img src=\"images/leo-updates-envelopes.jpg\" class=\"marketing-img img-polaroid pull-right span4\">\n          A little context for our procedure: we receive a stream of DVDs, which together comprise each \"series\" available here. For example, what's represented here as \"CIB 1\" is actually many\n          <em>thousands</em>\n          of optical discs that we're stitching together for discovery and download. As discs arrive, they are processed individually (or in clusters) and added to the series. The new cluster will either extend the coverage of the series (that is,it covers an area not already available in the series) or will replace an extant block. To monitor these additions, use the Updates tab (e.g. for <a href=\"#updates/srtm01\">SRTM01</a>). We will render there the bounding boxes of the individual clusters of data by the date they were made public.\n        </p>\n\n        <h4>RSS</h4>\n        <p>\n          Disc or sector updates are also announced via RSS,\n          <a href=\"../api/v1/rss/updates\">here</a>. If you're interested in following only series-level updates, there's a quieter rss\n          <a href=\"../api/v1/rss/new\">here</a>. And finally if you're interested more general news about the project (including upgrades to the web app, time-insensitive posts about the system's technology stack, downtime, and other developments), join or follow\n          <a href=\"https://c3.llan.ll.mit.edu/blogs/249650e6-9c85-498a-bd0d-59b7b602623a/?lang=en_us\">our c3 community</a>.\n        </p>\n      </div>\n    </section>\n    <!-- /.help-updates -->\n\n    <section class=\"span12\" id=\"help-credits\">\n      <!-- we r fudging this section to stuff in lots of credits so we need to de-fudge some margins y padding -->\n      <h2 style=\"padding-left:50px;\">Credits</h2>\n      <div class=\"muted homebody\" style=\"text-align:left;\">\n        <div class=\"credits-row row\">\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-cloudmade.png\" class=\"marketing-img img-circle pull-left\" alt=\"CloudeMade logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\"> <strong><a href=\"http://cloudmade.com\">CloudMade</a></strong> \n            </span>\n            , a maker of location-based applications and services platforms and products, designed and tiled some of our beautiful basemaps.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-mapquest.png\" class=\"marketing-img pull-left\" alt=\"MapQuest logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\"> <strong>MapQuest</strong>\n            </span>\n            has lately embraced its\n            <a href=\"http://developer.mapquest.com/web/products/open\">MapQuest Open Data APIs and Services</a>\n            efforts and the results are nice-looking\n            <a href=\"http://openstreetmap.org\">OpenStreetMap</a>\n            -derived basemaps available for use anywhere. Including here.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-stamen.png\" class=\"marketing-img img-circle pull-left\" alt=\"Stamen logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong><a href=\"http://stamen.com/cartography\">Stamen Design</a></strong> \n            </span>\n            , a datacentric design studio in San Francisco, created what is arguably our most beautiful basemap. The studio is responsible for both the Water Color and Toner basemaps, which are beautiful, artistic interpretations of (of course)\n            <a href=\"http://openstreetmap.org\">OpenStreetMap</a>\n            data.\n          </div>\n        </div>\n        <div class=\"credits-row row\">\n          <div class=\"span4 pull-left\">\n            <img src=\"http://b.tile3.opencyclemap.org/landscape/5/17/9.png\" class=\"marketing-img img-circle pull-left\" alt=\"OpenCycleMap logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>OpenCycleMap</strong>\n            </span>\n            is derived (again) from\n            <a href=\"http://openstreetmap.org\">OpenStreetMap.org</a>\n            .\n            <a href=\"http://opencyclemap.org/\">OCM</a>\n            designs some good-looking basemaps that at large scale focus on transportation but at small scale are nice, colorful maps of the world (more about OCM at\n            <a href=\"http://www.thunderforest.com/\">Thunderforest</a>\n            .\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-leaflet.png\" class=\"marketing-img img-circle pull-left\" alt=\"leaflet logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://leafletjs.com/\">Leaflet</a>\n              </strong>\n            </span>\n            (by\n            <a href=\"http://cloudmade.com\">CloudMade</a>\n            ) is an open source JavaScript library for delivering swift, beatiful maps through the web. Its clean, lightweight API makes it a good fit for delivering the different kinds of material that make up this application.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-bootstrap.png\" class=\"marketing-img pull-left\" alt=\"bootstrap logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://twitter.github.com/bootstrap/\">Twitter Bootstrap</a>\n              </strong>\n            </span>\n            is a very popular front-end web framework that makes publishing web applications faster, simpler, and better-organized. Easy on the eyes, too.\n          </div>\n        </div>\n        <div class=\"credits-row row\">\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-backbone.png\" class=\"marketing-img pull-left\" alt=\"backbone logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://backbonejs.org/\">Backbone.js</a>\n              </strong>\n            </span>\n            , by\n            <a href=\"http://documentcloud.org\">DocumentCloud</a>\n            , is an MVC-ish JavaScript framework that helps web apps organize assets and methods and simplifies the management of interaction and functionality. Huh? Basically...it helps divest functions from the way the results of those functions are displayed.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-jquery.png\" class=\"marketing-img pull-left\" alt=\"jquery logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://jquery.com/\">jQuery</a>\n              </strong>\n            </span>\n            is a small but very powerful wrapper around JavaScript that exposes the power of the language in a more succinct and easier-to-get-through API. As does everybody else, we extend jQuery with plugins like jQuery Cookie, jQuery FastLiveFilter, jQuery ScrollTo, and others.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-grunt.png\" class=\"marketing-img pull-left\" alt=\"grunt logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://gruntjs.com\">Grunt.js</a>\n              </strong>\n            </span>\n            is a JavaScript \"task runner\" that we use to automate each move from source to distributable application. This mostly means it minifies and concats javascript, CSS files, html templates, etc.\n          </div>\n        </div>\n        <div class=\"credits-row row\">\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-handlebars.png\" class=\"marketing-img pull-left\" alt=\"handlebars logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://handlebarsjs.com\">Handlebars.js</a>\n              </strong>\n            </span>\n            is a\n            <a href=\"http://mustache.github.com/\">Mustache</a>\n            -compatible semantic templating engine we use to write structured html that we bind to various views and fragments in Backbone.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-mongodb.png\" class=\"marketing-img img-circle pull-left\" alt=\"mongodb logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://www.mongodb.org/\">MongoDB</a>\n              </strong>\n            </span>\n            is an open source NoSQL database that is seeing rapid adoption due to its ease-of-use and scalability. MongoDB sits behind Slim and seeds all of our idle and runtime metadata functionality.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-slimframework.png\" class=\"marketing-img pull-left\" alt=\"slim logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://slimframework.com\">Slim Framework</a>\n              </strong>\n            </span>\n            is a \"micro\" framework for PHP that eases the creation of typical API elements (routes, models, etc.) and does so cleanly. Slim powers the API that sits behind our web app.\n          </div>\n        </div>\n        <div class=\"credits-row row\">\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-freebase.png\" class=\"marketing-img pull-left\" alt=\"freebase logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://freebase.com/\">Freebase</a>\n              </strong>\n            </span>\n            is an open data implement that endeavors to entity-graph the universe of information. Easy, right? We use it hear simply to offer predictive search of terms and locations, choosing Freebase specifically because it returns geojson polygons and points for locations it finds.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-icomoon.png\" class=\"marketing-img img-circle pull-left\" alt=\"icomoon logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://icomoon.io/\">IcoMoon</a>\n              </strong>\n            </span>\n            is one of many recent entry into the world of icon fonts for web design. IcoMoon is particularly interesting in that it allows custom uploads of svg or other graphic that you can then incorporate into your own work as an icon.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-nounproject.png\" class=\"marketing-img pull-left\" alt=\"noun project logo\" style=\"width:35px;height:45px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://thenounproject.com/\">The Noun Project</a>\n              </strong>\n            </span>\n            is an interesting, community-sourced project that endeavors to build and deliver a free \"global visual language\" using only graphic symbols. It also happens to be source of several of the icons at use here, including, of all things, the main logo and favico!\n          </div>\n        </div>\n        <div class=\"credits-row row\">\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-d3.png\" class=\"marketing-img img-circle pull-left\" alt=\"d3 logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://d3js.org/\">D3.js</a>\n              </strong>\n            </span>\n            is a JavaScript library for manipulating documents based on data. In the initial release of this application we use it only for the little chart that updates the progress of a download series.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-postgis.png\" class=\"marketing-img pull-left\" alt=\"postgis logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://postgis.refractions.net/\">PostGIS</a>\n              </strong>\n            </span>\n            adivs robust geographic data support to the\n            <a href=\"http://www.postgresql.org/\">PostgreSQL</a>\n            database system. PostGIS stores all of our vector data and provides various query/formatting services for the API that powers the bulk of this site (as well as some of our background processing workflows).\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-gdal.png\" class=\"marketing-img pull-left\" alt=\"gdal logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://gdal.org/\">GDAL</a>\n                and\n                <a href=\"http://gdal.org/ogr/index.html\">OGR</a>\n              </strong>\n            </span>\n            are very agile, powerful spatial data processing libraries whose data interrogations and manipulation capabilities make most of our work possible.\n          </div>\n        </div>\n        <div class=\"credits-row row\">\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-geoserver.png\" class=\"marketing-img pull-left\" alt=\"geoserver logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://geoserver.org\">GeoServer</a>\n              </strong>\n            </span>\n            , one of the great open source projects, is a robust, standards-compliant spatial data server that delivers most of our data to the web map as well as some of the downloads themselves. GeoServer integrates with\n            <a href=\"http://geowebcache.org/\">GeoWebcache</a>\n            , which generates the tiles we send to the browser (in lieu of, say, GB-sized tiffs).\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-solr.png\" class=\"marketing-img img-circle pull-left\" alt=\"solr logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://lucene.apache.org/solr/\">Apache Solr</a>\n              </strong>\n            </span>\n            is an indexer/search engine that powers a couple of pieces of this project. Solr has very robust and agile syntax and tuning capabilities, and we will always be monitoring the quality of the search of our metadata.\n          </div>\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-geonames.png\" class=\"marketing-img img-circle pull-left\" alt=\"geonames logo\" style=\"width:35px;height:35px;\">\n            Speaking of Solr,\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://www.geonames.org/\">GeoNames</a>\n              </strong>\n            </span>\n            maintains and publishes a vast database of authoritative geographic names. It's a gazetteer, basically, that happens to also allow bulk downloads of the data in order for developers (like us) to repurpose the data to better suit our needs. We use GeoNames as a backup placename search (if Freebase fails to return a usable result), but in so doing we just happen to be running a local geonames service that could feasibly be used labwide.\n            Contact us if you're interested.\n          </div>\n        </div>\n        <div class=\"credits-row row\">\n          <div class=\"span4 pull-left\">\n            <img src=\"images/credits/logo-opengeoportal.png\" class=\"marketing-img img-circle pull-left\" alt=\"opengeoportal logo\" style=\"width:35px;height:35px;\">\n            <span style=\"color:black;\">\n              <strong>\n                <a href=\"http://opengeoportal.org\">OpenGeoPortal</a>\n              </strong>\n            </span>\n            is a commendable collaboration between a number of institutions that endeavors to develop and implement a shared geospatial information portal. Although we found it to not meet our requirements here (hence the custom-built application you see before you), we did borrow a fragment of Solr search query syntax from the project and we are happy to credit that group for same.\n          </div>\n        </div>\n\n      </div>\n    </section>\n    <!-- /.help-credits --> </div>\n</div>";
  return buffer;
  });
templates['hitViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "active";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n       <a class=\"btn btnCoverage\" rel=\"popover\"><i class=\"icon-grid ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.covonoff, true, options) : helperMissing.call(depth0, "equal", depth0.covonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\" style=\"margin-top:-1px;font-size:1.3em;\"></i></a>\n       ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "<a class=\"btn btnZoomto\" ><i class=\"icon-zoomin\"></i></a>";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"anno span4\">";
  if (stack1 = helpers.notes) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.notes; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n";
  return buffer;
  }

  buffer += "<li class=\"hit row span5\">\n     <!--<div class=\"span2 thumbnail pull-left btnPreview\">\n       <div class=\"badge pull-left\">";
  if (stack1 = helpers.format) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.format; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n       <img src=\"";
  if (stack1 = helpers.thumb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.thumb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" width=\"95px\" height=\"93px \" alt=\"series thumbnail\">   \n        <p><span class=\"text-info\"><strong>click for preview</strong></span></p> \n       <p><span class=\"text-info\"><strong>preview</strong></span></p>\n     </div>\n        -->\n  <div class=\"pull-left title span3\">\n  <a href=\"#details/";
  if (stack1 = helpers.series) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.series; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/";
  if (stack1 = helpers.handle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.handle; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  ";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n  </a>\n\n\n   <span class=\"badge\">";
  if (stack1 = helpers.format) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.format; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n  </div> <!-- /.title -->\n   <!-- <div class=\"description span7 pull-left muted\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div> -->\n\n   <div class=\"button-wrapper span2 pull-right\">\n\n      <div class=\"btn-group span1 btn-group pull-left\">\n       <a class=\"btn btnEnvelope\">\n       <i class=\"icon-rectangleselection ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.envelonoff, true, options) : helperMissing.call(depth0, "equal", depth0.envelonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\"></i>\n       </a>\n       ";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.format, "raster", options) : helperMissing.call(depth0, "equal", depth0.format, "raster", options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n       <a class=\"btn btnDetails\"><i class=\"icon-read-more\"></i></a>\n       <a class=\"btn btnDownload\" ><i class=\"icon-awesome-download\"></i></a>\n       <a class=\"btn btnPreview\" ><i class=\"icon-eye2 ";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.prevonoff, true, options) : helperMissing.call(depth0, "equal", depth0.prevonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\"></i></a>\n\n       <div>";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.envelonoff, true, options) : helperMissing.call(depth0, "equal", depth0.envelonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "       \n";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.covonoff, true, options) : helperMissing.call(depth0, "equal", depth0.covonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "       \n";
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.prevonoff, true, options) : helperMissing.call(depth0, "equal", depth0.prevonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</div>\n     </div>\n   </div> <!-- /.button-wrapper -->\n\n  <!-- <div class=\"span1\"></div> -->\n  <!-- <div class=\"row span4\"> -->\n\n";
  options = {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data};
  stack2 = ((stack1 = helpers.equal || depth0.equal),stack1 ? stack1.call(depth0, depth0.prevonoff, true, options) : helperMissing.call(depth0, "equal", depth0.prevonoff, true, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n<!-- </div>/.row  -->\n</li><!-- ./ hit -->";
  return buffer;
  });
templates['homeViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n          <div class=\"homecontainer\">\n            <div class=\"marketing\">\n\n              <div class=\"appname\" style=\"\">LL GeoData:</div>\n              <p class=\"marketing-byline\">a spatial data distribution web app</p>\n\n              <div class=\"row-fluid\">\n\n                <div class=\"span4 offset1\">\n                  <img class=\"marketing-img pull-left\" src=\"images/leo-logo-navy.png\" width=\"80px\" style=\"margin-right:10px;\">          \n                  <h2>Maps &amp; Data</h2>\n                  <div class=\" homebody\" style=\"text-align:left;\">\n                    <p>\n                      This application was built for Library users to identify, preview, and download spatial data in our collection, which includes full and partial sets of DTED, SRTM, CIB, CDRG, VMAP, and several other series.\n                    </p>\n                    <p>\n                      Help is available\n                      <a href=\"#help\">here</a>\n                      (in the form of feature-by-feature documentation) as well as by turning on inline annotations (look for this button in the header):\n                    <span style=\"\" class=\"icon-bubbles \" aria-hidden=\"true\"></span>\n                    </p>\n                  </div>\n                </div>\n                <div class=\"span2\"></div>\n                <div class=\"span4\">\n                  <img class=\"marketing-img pull-right\" src=\"images/badge.png\" width=\"80px\">          \n                  <h2>And just FYI:</h2>\n                  <div class=\" homebody\" style=\"text-align:right;\">\n                    <p>\n                      This thing is young, brand new, in fact! Everything <em>should</em>\n                      work ;-) but\n                      <a href=\"#\" class=\"contact-trigger\">let us know</a>\n                      if not. Also note that you can hide this large, central pane at any time by pressing the 'z' key.\n                    </p>\n                    <p>\n                      If your browser blocks cookies your download sessions will not persist if the window is closed.\n                    </p>\n                    <p>\n                      This was built with the usual stuff (\n                      <a href=\"http://backbonejs.org/\">Backbone.js</a>\n                      ,\n                      <a href=\"http://handlebarsjs.com\">Handlebars.js</a>\n                      ,\n                      <a href=\"http://twitter.github.com/bootstrap\">Twitter Bootstrap</a>\n                      ,\n                      <a href=\"http://jquery.com\">jQuery</a>\n                      ,\n                      <a href=\"http://lesscss.org\">LESS</a>\n                      , etc.), so not having JavaScript enabled in your browser will make this a very painful experience. (Actually that's understating it -- it will certainly break.)\n                    </p>\n                    \n                  </div>\n                </div>\n              </div>\n\n            </div>\n\n          </div>\n";
  });
templates['modalViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-header\">\n\n    <h3 id=\"myModalLabel\">Download Notice</h3>\n  </div>\n  <div class=\"modal-body\">\n  <p>";
  if (stack1 = helpers.message) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n  </div>";
  return buffer;
  });
templates['searchStatsViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n    "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\n";
  return buffer;
  }

  buffer += "<div class=\"minutiae\" style=\"width:100%;position:relative;text-align:center;margin-bottom:8px;\">(the 'z' key will toggle this pane)</div> <!-- ./ anno -->\n\n<div class=\"hitcount\">";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  stack2 = ((stack1 = helpers.countcount || depth0.countcount),stack1 ? stack1.call(depth0, depth0.recordOffset, depth0.recordsPerPage, depth0.page, options) : helperMissing.call(depth0, "countcount", depth0.recordOffset, depth0.recordsPerPage, depth0.page, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += " of ";
  if (stack2 = helpers.hitcount) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.hitcount; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " total records\n\n</div>\n <div class=\"pagination pagination-mini pagination-centered\"><ul>\n";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  stack2 = ((stack1 = helpers.pageMaker || depth0.pageMaker),stack1 ? stack1.call(depth0, depth0.hitcount, depth0.recordsPerPage, options) : helperMissing.call(depth0, "pageMaker", depth0.hitcount, depth0.recordsPerPage, options));
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</ul></div> ";
  return buffer;
  });
templates['searchViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += " <input class=\"span3 offset0 pull-right\" id=\"appendedInputButtons\" size=\"16\" type=\"text\" \n            // data-provide=\"typeahead\" data-items=\"4\" \n            placeholder=\"query for a location or for data\" value='";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.cleanquery || depth0.cleanquery),stack1 ? stack1.call(depth0, depth0.querystring, options) : helperMissing.call(depth0, "cleanquery", depth0.querystring, options)))
    + "'>";
  return buffer;
  });
templates['updatesSliderViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });
templates['updatesViewTpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "series";
  }

function program3(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.series) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.series; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

function program5(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.mongoid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.mongoid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

  buffer += "<div class=\"title offset2 span7\" style=\"text-align:center;\"><h2>displaying ";
  if (stack1 = helpers.count) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.count; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " updates for ";
  stack1 = helpers['if'].call(depth0, depth0.series, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <span class=\"series\">";
  stack1 = helpers['if'].call(depth0, depth0.series, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, depth0.mongoid, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>:</h2>\n			<h4 class=\"muted\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.range_split || depth0.range_split),stack1 ? stack1.call(depth0, depth0.range, options) : helperMissing.call(depth0, "range_split", depth0.range, options)))
    + "</h4>\n<div class=\"muted minutiae\" style=\"font-size:.5em;\">(colors randomized)</div>\n		</div>\n";
  return buffer;
  });
})();