'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var render = require('./utils').render;

var watsonKeysPath = window.nw.App.dataPath + '/wttskeys.json';

/**
* Backbone view for transcription form for creating a new transcription
* @class TranscriptionFormView
* @constructor
* @extends Backbone.View
*/
module.exports = Backbone.View.extend({
   tagName: 'div',
  className: 'container',

 initialize: function(options){
 	 this.options = options;
 	 this.settings = options.settings;
    _.bindAll(this, 'render');
 },

  events :{
  	'click #submitBtn': 'save',
    "keypress .form-control": "onEnterListener"

  },

  onEnterListener: function(e){
    var key = e.which || e.keyCode;
    if (key === 13 ) { // 13 is enter
      // code for enter
       e.preventDefault();
    }
  },

  save: function(e){
  	e.preventDefault();

  	var ibmCredentials = {};
  		ibmCredentials.username  = this.$('input[name=username]').val().trim();
    	ibmCredentials.password  = this.$('input[name=password]').val().trim();

   		console.log("ibmCredentials", ibmCredentials);
   //TODO: co
   if((ibmCredentials.username  != "") && (ibmCredentials.password != "")){
   	//save 
   		// console.log("ibmCredentials", ibmCredentials);
   		 // fs.writeFileSync(watsonKeysPath, JSON.stringify(tempKeys));
	   
   		window.setWatsonAPIkeys(ibmCredentials)
   		window.alert("Thank you! Saved the keys so you don't have to enter them again.");
   				
   		// window.setWatsonAPIkeys({username: "24b4bebe-cef4-45b4-83b6-9c2fe7d8752e", password: "dol7y18yoIlH"})
	    
   }else{
   	alert("Please add valid credentials to save");

   }
  },


  render: function(){
  	// console.log(this.model);
  	// console.log(render('settingsTemplate'));
  	// console.log(render('settingsTemplate', this.model));
  	// var crd = { "crd":"hello world"};
  	console.log("this.settings",this.settings, this.options);

    this.$el.html(render('settingsTemplate',  this.settings));
      // this.$el.html(JSON.stringify(this.model));
    console.log(this.$el);
    return this;
  }
});