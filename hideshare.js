/*! imageshare - v0.1.0 - 2013-09-11
/* ========================================================================
 * IMAGESHARE v1.0.0
 * https://github.com/arnonate/imageshare
 * ========================================================================

  Copyright (c) 2016 Debasish Bose

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
 */

/*global jQuery:false, window:false, document:false */

;(function(window, $) {

  "use strict";

  // IMAGESHARE PUBLIC CLASS DEFINITION
  // =================================

  var Imageshare = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  Imageshare.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,      
      position: "bottom",
      speed: 100,
      fbAppId: ''
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wrapImageshare();
      return this;
    },

    wrapImageshare: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title || this.$elem.find(".media__caption").first().text(),
          shareLink = this.config.link,
          shareMedia = this.config.media || [location.host,this.$elem.find("img").first().attr("src")].join(""),
          shareDescription = this.config.description,
          fbAppID = this.config.fbAppId,
          template = '<li><a class="imageshare-facebook facebook" href="#"><span class="icon--facebook">Facebook</span><span class="social__text">SHARE</span></a></li>';
          //template += '<li><a class="imageshare-twitter twitter" href="#"><span class="icon--twitter">Twitter</span><span class="social__text">TWEET</span></a></li>';
          template += '<li><a class="imageshare-pinterest pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><span class="icon--pinterest">Pinterest</span></a></li>';
          //template += '<li><a class="imageshare-google-plus google-plus" href="#"><span class="icon--google-plus">Google Plus</span><span class="social__text">G+</span></a></li>';    

      // Construct sharing list
      var imageshareList = '<div class="social social--share social--horizontal"><ul class="imageshare-list">' + template + '</ul></div>';
      
      this.$wrap = this.$elem;

      // Insert sharing button list
      $(imageshareList).appendTo(this.$elem);


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=' + fbAppID + '&link=' + encodeURIComponent(shareLink) + '&picture=' + encodeURIComponent(shareMedia) + '&name=' + encodeURIComponent(shareTitle) + '&description=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      // var shareTwitter = function() {
      //   window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      // };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(['http://',shareMedia].join('')) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      // var shareGooglePlus = function() {
      //   window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      // };
      
      this.$wrap.find(".imageshare-facebook").click(function() {
        shareFacebook();
        return false;
      });

      // this.$wrap.find(".imageshare-twitter").click(function() {
      //   shareTwitter();
      //   return false;
      // });

      this.$wrap.find(".imageshare-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      // this.$wrap.find(".imageshare-google-plus").click(function() {
      //   shareGooglePlus();
      //   return false;
      // });

    }
  };

  Imageshare.defaults = Imageshare.prototype.defaults;

  $.fn.imageshare = function(options) {
    return this.each(function() {
      new Imageshare(this, options).init();
    });
  };

  window.Imageshare = Imageshare;

})(window, jQuery);
