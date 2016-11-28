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
ExecuteControllers.registerController('TestController', TestController);
```

#### How to instanciate controllers.
There are 2 options.
##### All at once
This will instanciate all elements with a **[data-controller]** attribute.
```javascript
ExecuteControllers.instanciateAll();
```

##### Explicit
Just pass in the element and the name of the controller.
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
