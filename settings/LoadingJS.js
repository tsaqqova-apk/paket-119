var styleCss = "<style>"+
	"@keyframes loadingAnimate{from {-webkit-transform: rotateY(0deg);-o-transform: rotateY(0deg);-ms-transform: rotateY(0deg);-moz-transform: rotateY(0deg);transform: rotateY(0deg);}to {-webkit-transform: rotateY(-180deg);-o-transform: rotateY(-180deg);-ms-transform: rotateY(-180deg);-moz-transform: rotateY(-180deg);transform: rotateY(-180deg);}}"+
	"@-webkit-keyframes loadingAnimate{from {-webkit-transform: rotateY(0deg);-o-transform: rotateY(0deg);-ms-transform: rotateY(0deg);-moz-transform: rotateY(0deg);transform: rotateY(0deg);}to {-webkit-transform: rotateY(-180deg);-o-transform: rotateY(-180deg);-ms-transform: rotateY(-180deg);-moz-transform: rotateY(-180deg);transform: rotateY(-180deg);}}"+
	".loadingRun{-webkit-animation : loadingAnimate 0.s infinite;animation : loadingAnimate 0.s infinite;}</style>";
$("body").append(styleCss);

window.waitForLoading = true;
var LoadingJS = function(){
	this.initConfig();
	this.initHtml();
	this.initCss();
	this.startLoading();
	
	this.onResize();
	var self = this;
	$(window).resize(function(){
		self.onResize();
	});
	
	window.setTimeout(function(){window.waitForLoading = false;},250);
}

LoadingJS.prototype = {
	
	initHtml : function(){
		this.stop = false;
		this.instance = $("<div></div>");
		this.image = $("<img src='" + this.loadingPicture + "'/>");
		
		
		if(this.loadingPicture) this.instance.append(this.image);

		this.initAnimationHtml();

		this.instance.append(this.title);
		$("body").append(this.instance);
	},

	initAnimationHtml : function(){

		this.loadBox = $("<div></div>");
		var img1 = $(this.loadImageUrl);
		var img2 = $(this.loadImageUrl);	
		this.img3 = $(this.loadImageUrl);
		this.img3.attr("class", "loadingRun");

		this.loadBox.css({
			"position":"relative",
			"perspective":"200px",
			"-webkit-transform-style":"preserve-3d",
			"-o-transform-style":"preserve-3d",
			"-ms-transform-style":"preserve-3d",
			"-moz-transform-style":"preserve-3d",
			"transform-style":"preserve-3d"
		});

		this.img3.css({
			"position" : "absolute" ,
			"left" : "50%" ,
			"z-index" : "-1" ,
			"-webkit-transform-origin" : "0 50%",
			"-o-transform-origin" : "0 50%",
			"-ms-transform-origin" : "0 50%",
			"-moz-transform-origin" : "0 50%",
			"transform-origin" : "0 50%",
			"fill" : this.loadingCaptionColor
		});

		img2.css({
			"position" : "absolute" ,
			"left" : "-50%" ,
			"-webkit-transform":"rotateY(180deg)",
			"-o-transform":"rotateY(180deg)",
			"-ms-transform":"rotateY(180deg)",
			"-moz-transform":"rotateY(180deg)",
			"transform":"rotateY(180deg)",
			"fill" : this.loadingCaptionColor
		});
		
		img1.css({
			"position" : "absolute" ,
			"left" : "50%",
			"fill" : this.loadingCaptionColor
		});

		this.loadBox.append(img1).append(img2).append(this.img3);
		this.instance.append(this.loadBox);
	},

	initConfig : function(){
		  this.loadingCaption, this.loadingCaptionColor, this.loadingPicture;
		  try{
		  	this.loadingCaption = bookConfig.loadingCaption ? bookConfig.loadingCaption : "Loading";
		  	this.loadingCaptionColor = bookConfig.loadingCaptionColor ? bookConfig.loadingCaptionColor : "#DDDDDD";
		  	this.loadingBackground = bookConfig.loadingBackground ? bookConfig.loadingBackground : "#1F2232";
		  	this.loadingPicture = bookConfig.loadingPicture ? bookConfig.loadingPicture : "";
		  }catch(err){
		  	this.loadingCaption = "Loading";
		  	this.loadingCaptionColor = "#BDBDBD";
		  	this.loadingBackground = "#1F2233";
		  	this.loadingPicture = "";
		  }
	},
	
	startLoading : function(){
		this.title.text($(document).attr("title"));
	},
	
	destroy : function(){
		this.img3.attr("class", "");
		$("body>style").html("");
		this.instance.remove();
		this.image.attr("src", "");
		$("body").css({"background-color" : ""});
	},
	
	initCss : function(){

		$("html").css({
			"margin" : 0,
			"padding" : 0,
			"width" : "100%",
			"height" : "100%"
		});
		$("body").css({
			"margin" : 0,
			"padding" : 0,
			"width" : "100%",
			"height" : "100%",
			"position" : "fixed",
			"background-color" : this.loadingBackground
		});
		this.instance.css({
			"width" : "100%",
			"height" : "100%",
			"color" : this.loadingCaptionColor,
			"text-align" : "center",
			"vertical-align" : "middle",
			"font-family" : "Tahoma",
		    "position" : "relative",

		});

		this.image.css({
			"position" : "absolute",
			"bottom" : "50%",
			"left" : "50%",
			"-webkit-transform" : "translate(-50% , 50%)",
		    "-moz-transform" : "translate(-50% , 50%)",
		    "-ms-transform" : "translate(-50% , 50%)",
		    "-o-transform" : "translate(-50% , 50%)",
			"transform" : "translate(-50% , 50%)",
			"margin-bottom" : "28px",
			"max-width" : "40%",
			"max-height" : "30%"
		});
		
		if(window.innerHeight <= 300) this.image.hide();
		
		var titleTran = "translate(-50%, 16px)";
		var loadingBoxTran = "translate(-50% , -56px)";
		
		// if(this.loadingPicture) {
			// var titleTran = "translate(-50%, 40px)";
			// var loadingBoxTran = "translate(-50% , -50%)";
		// }

		this.title.css({
			"font-family":"Arial",
		  	"font-size" : "24px",
		  	"position" : "absolute",
		  	"top" : "50%",
		  	"left" : "50%",
		  	"-webkit-transform" : titleTran,
		    "-moz-transform" : titleTran,
		    "-ms-transform" : titleTran,
		    "-o-transform" : titleTran,
			"transform" : titleTran,
		  	"margin" : 0,
		  	"padding" : 0
		});

		this.loadBox.css({
			"position" : "absolute",
			"width" : "49px",
			"height" : "56px",
			"left" : "50%",
			"top" : "50%",
			"-webkit-transform" : loadingBoxTran,
		    "-moz-transform" : loadingBoxTran,
		    "-ms-transform" : loadingBoxTran,
		    "-o-transform" : loadingBoxTran,
			"transform" : loadingBoxTran,
		  	"padding" : 0
		});

	},
	
	onResize : function(){}

}

var jsLoadingBar = new LoadingJS();