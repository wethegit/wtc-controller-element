/**
 * ExecuteControllers
 * Simple static class to instanciate and register all the controllers.
 *
 * @static
 * @author Marlon Marcello <marlon@wethecollective.com>
 * @version 1
 * @requirements
 * @created Nov 23, 2016
 */

/**
 * Stores controllers.
 * @type {Object}
 */
let controllersList = new Map();

class ExecuteControllers {
  /**
   * Instanciate all the elements with registered controllers.
   * @param {String} query         - Query used to select elements.
   * @param {String} controllerAtt - Attribute with the name of the controller.
   */
  static instanciateAll(query = '[data-controller]', controllerAtt = 'data-controller') {
    let els = document.querySelectorAll(query);

    for (let i = 0; i < els.length; i++) {
      let op = els[i];
      ExecuteControllers.instanciate(op, op.getAttribute(controllerAtt));
    }
  }

  /**
   * Instanciate controller and saves it in the data attribute.
   * @param {DOMNode} el             - Element.
   * @param {String}  controllerName - Name of the registered controller.
   *
   * @return {DOMNode} Element.
   */
  static instanciate(el = null, controllerName = null) {
    try {
      let controller = null;

      if (typeof controllerName === 'string' && controllersList.has(controllerName)) {
        controller = controllersList.get(controllerName);
      } else {
        throw new Error (`The controller '${controllerName}' has not been registered. Please make sure the controller is registering itself using ExecuteController.registerController('NAME', CLASS).`)
      }

      let instance = new controller(el);
      el.data.controller = instance;

      return el;
    } catch (_error) {
      console.warn("Error: " + _error.message);
    }
  }

  /**
   * Registers controllers
   * @param {String} controllerName - Name of the controller
   * @param {Class}  controller     - Controller.
   */
  static registerController(controllerName, controller) {
    controllersList.set(controllerName, controller);
  }

  /**
   * Get list of registered controllers.
   * @return {Map} List
   */
  static get controllersList() {
    return controllersList;
  }
}


/**
 * Element Controller
 * Base class to be extended by controllers.
 * It saves the instance and information on the element data for future reference.
 *
 * @static
 * @author Marlon Marcello <marlon@wethecollective.com>
 * @version 1
 * @requirements
 * @created Nov 23, 2016
 */
class ElementController {
  constructor(element) {
    this.element = element;
    this.element.data = this.element.data || {};
    this.element.data.controller = this;
    this.element.data.instanciated = true;
  }

  /**
   * Check if element exists in the DOM.
   * @return {Bool} True/False.
   */
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

// Export ElementController as defaultl
export {ElementController as default, ExecuteControllers};
