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
   * @param {String|Object} query  - Can be a string, ex: '[data-controller]' or
   *                                 an object, ex: {el: DOMNode, query: '[data-controller]'}
   * @param {String} controllerAtt - Attribute with the name of the controller.
   */
  static instanciateAll(query = '[data-controller]', controllerAtt = 'data-controller', debug = false) {
    let els = null;

    if (typeof query === 'string') {
      els = document.querySelectorAll(query);
    }
    else if (typeof query === 'object') {
      if (!query.hasOwnProperty('el')) {
        throw 'Instanciate all is missing the DOMNode. Ex: instanciateAll({el: DOMNode, query: "[data-controller]"})'
      }

      if (!query.hasOwnProperty('query')) {
        query.query = '[data-controller]'
      }

      els = query.el.querySelectorAll(query.query);
    }

    if (els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        let op = els[i];
        let cont = op.getAttribute(controllerAtt);

        if (cont) {
          ExecuteControllers.instanciate(op, op.getAttribute(controllerAtt), debug);
        }
      }
    }
  }

  /**
   * Instanciate controller and saves it in the data attribute.
   * @param {DOMNode} el             - Element.
   * @param {string|class}  controllerName - Name of the registered controller, or a Class.
   *
   * @return {DOMNode} Element.
   */
  static instanciate(el = null, controllerName = null, debug = false) {
    let controller = controllerName;
    
    try {
      if (typeof controllerName === 'string') {
        if (controllersList.has(controllerName)) {
          controller = controllersList.get(controllerName);
        } else {
          throw new Error (`The controller '${controllerName}' has not been registered. Please make sure the controller is registering itself using ExecuteController.registerController(CLASS, 'OPTIONAL-NAME').`);
        }

        if (!debug) {
      
          let instance = new controller(el);

          return el;
        }
      }
    } catch (_error) {
      console.warn("Error: " + _error.message, _error.stack);
    }

    if (debug) {
      let instance = new controller(el);
      return el;
    }
  }

  /**
   * Registers controllers
   * @param {Class}  controller     - Controller.
   * @param {string} [controllerName=''] - Name of the controller
   */
  static registerController(controller, controllerName = '') {
    try {
      if (!controllerName) {
        throw `Controller name is required. Ex: ExecuteControllers.registerController(TestController, 'TestController');`;
      }

      if (controllersList.has(controllerName)) {
        console.warn(`Controller ${controllerName} is already registered.`);
      } else {
        controllersList.set(controllerName, controller);
      }
    }
    catch (e) {

    }

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
