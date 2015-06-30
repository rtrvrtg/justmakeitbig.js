/**
 * JustMakeItBig.js
 * v0.1.1
 */

var JustMakeItBig = {
  // HTML5 Fullscreen API
  _fullscreen: {
    canFullScreen: function(){
      return (
        !!document.exitFullscreen ||
        !!document.msExitFullscreen ||
        !!document.webkitExitFullscreen ||
        !!document.webkitCancelFullScreen ||
        !!document.mozCancelFullScreen
      );
    },
    isFullScreen: function(){
      return (
        !!document.fullscreenElement ||
        !!document.msFullscreenElement ||
        !!document.mozFullScreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.webkitCurrentFullScreenElement
      );
    },
    enterFullScreen: function(elem, whenToggled){
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
      }
      whenToggled(true);
    },
    exitFullScreen: function(whenToggled){
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
      whenToggled(false);
    }
  },

  // Psuedo-fullscreen for browsers that can't do fullscreen normally
  // eg. iOS Safari
  _fullpage: {
    _elemStyle: {
    },
    _pageScroll: null,
    _keyupAction: function(e){
      // ESC key to close full page
      if (e.which == 27) {
        JustMakeItBig._fullpage.exitFullPage();
      }
    },
    _attachEvents: function(){
      $(document).bind('keyup', JustMakeItBig._fullpage._keyupAction);
    },
    _detachEvents: function(){
      $(document).unbind('keyup', JustMakeItBig._fullpage._keyupAction);
    },
    canFullPage: function(){
      return true;
    },
    isFullPage: function(){
      return $(document).find('[data-justmakeitbig-full-page-elem]').length > 0;
    },
    enterFullPage: function(elem, toggleElement, whenToggled) {
      $('body').css('overflow', 'hidden');
      $(elem).attr(
        'data-justmakeitbig-full-page-elem',
        '0'
      ).data(
        'JustMakeItBig.stashScroll',
        $(document).scrollTop()
      ).data('JustMakeItBig.stashStyle', {
        position: $(elem).css('position'),
        width: $(elem).css('width'),
        height: $(elem).css('height'),
        top: $(elem).css('top'),
        left: $(elem).css('left'),
        zIndex: $(elem).css('z-index')
      }).css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: $(window).innerWidth(),
        height: $(window).innerHeight(),
        zIndex: 999999
      }).attr('data-justmakeitbig-full-page-elem', "1");
      toggleElement.focus();
      JustMakeItBig._fullpage._attachEvents();
      $(document).scrollTop(0);
      whenToggled(true);
    },
    exitFullPage: function(toggleElement){
      JustMakeItBig._fullpage._detachEvents();
      $(document).find('[data-justmakeitbig-full-page-elem]').each(function(){
        $(this).css(
          $(this).data('JustMakeItBig.stashStyle')
        ).removeAttr('data-justmakeitbig-full-page-elem');
      });
      $('body').css('overflow', 'auto');
      toggleElement.focus();
      $(document).scrollTop();
      whenToggled(false);
    }
  },
  // API function: can display this in full screen
  canFullscreen: function(){
    return JustMakeItBig._fullscreen.canFullScreen() || JustMakeItBig._fullpage.canFullPage();
  },
  toggle: function(elem, toggleElement, whenToggled){
    if (!whenToggled) {
      whenToggled = function(){};
    }
    if (!!elem) {
      if (JustMakeItBig._fullscreen.canFullScreen()) {
        if (JustMakeItBig._fullscreen.isFullScreen()) {
          JustMakeItBig._fullscreen.exitFullScreen(whenToggled);
        }
        else {
          JustMakeItBig._fullscreen.enterFullScreen(
            elem,
            whenToggled
          );
        }
      }
      else if (JustMakeItBig._fullpage.canFullPage()) {
        if (JustMakeItBig._fullpage.isFullPage()) {
          JustMakeItBig._fullpage.exitFullPage(
            elem,
            toggleElement,
            whenToggled
          );
        }
        else {
          JustMakeItBig._fullpage.enterFullPage(
            elem,
            toggleElement,
            whenToggled
          );
        }
      }
    }
  }
};