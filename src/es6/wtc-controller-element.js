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
class ElementController {
  constructor(element) {
    this.element = element;
    this.element.data = this.element.data || {};
    this.element.data.controller = this;
    this.element.data.instanciated = true;
  }

  elementExistsInDOM() {
    let element, exists;
    exists = this.element || null;
    if (!exists) {
      return false;
    }
    element = this.element;
    while (element) {
      if (element === document) {
        return true;
      }
      element = element.parentNode;
    }
    return false;
  }
}

export default ElementController;
