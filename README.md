# ElementController and ExecuteController
### Install
```sh
$ npm install wtc-controller-element --save
```
## ExecuteController
ExecuteController is a static class used to register and instanciate controllers extended from the ElementController class.

#### How to register a controller.
Inside your module, **BEFORE** exporting it:
```javascript
// Register
ExecuteControllers.registerController(TestController, '[OPTIONAL-NAME]');
```
If the name for the controller is left empty, the name of the controller will be used as default.

#### How to instanciate controllers.
There are 2 options, but first, import it:
```javascript
import {ExecuteControllers}  from 'wtc-controller-element';
```
##### All at once
This will instanciate all elements with a **[data-controller]** attribute.
```javascript
ExecuteControllers.instanciateAll();
```

##### Explicit
Just pass in the element and the name of the registered controller.
```javascript
ExecuteControllers.instanciate(document.getElementById('id'), 'TestController');
```

### ElementController
ElementController is the base class for controllers that alter DOM elements. It's responsible for saving the state and the instance of the controller for easy reference.

#### Usage
Import and extend it in your module.
```javascript
import {default as ElementController, ExecuteControllers}  from 'wtc-controller-element';

class TestController extends ElementController {
  constructor(element) {
    super(element);
  }
}

/* Don't forget to register it */
ExecuteControllers.registerController(TestController);
```

### bower
**bower version is DEPRECATED and is here for older projects.  
Please use the new ES6 module if possible.**
#### Install
```
bower install wtc-controller-element
```
#### Usage
Simply extend it on your controller function.
