/*
    Element Controller
    =======================================
    Author          liamegan
    email           liam@wethecollective.com
    Created         2014-03-12 08:59:26
    namespace       com.wtc.controller
    Requirements    jQuery
    Description     General element controller
    Edited by       liamegan
    Edited          2014-05-05 16:51:10
    Version         0.1
*/
; 'use strict';

(function()
{
  var _base;
  window.wtc || (window.wtc = {});
  (_base = window.wtc).controller || (_base.controller = {});
  (function($, NS)
  {
    NS.ElementController = (function()
    {
      function ElementController($element) {
        this.$element = $element;
        this.$element.data('controller', this);
        this.$element.data('instanciated', true);
      }
      ElementController.prototype.elementExistsInDOM = function() {
        var element, exists;
        exists = this.$element && this.$element[0];
        if (!exists) {
          return false;
        }
        element = this.$element[0];
        while (element) {
          if (element === document) {
            return true;
          }
          element = element.parentNode;
        }
        return false;
      };
      return ElementController;
    })();
  })(jQuery, window.wtc.controller);
})();