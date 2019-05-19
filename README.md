# X i18n

## What is it?

A React library that use Redux to internationalize the messages of your app. See a demo [here](http://demo.x-i18n.seudev.com).

## Using X i18n

```javascript
npm i @seudev/x-i18n
```

Create a folder with your message files.

* The file name must be the ISO language code;
* The default export must be the message object;
* The `id` property  (required) must be the ISO lange code;
* The `messages` property (required) must be a object.

The children of the `messages` property are your messages. You are free to define any structure.
The message key is the path to access the message. Example: `foo.bar`

`src/i18n/en.js`

```javascript
export default {
    id: "en",
    messages: {
        foo: {
            bar: "Hello World!"
        }
    }
};
```

`src/i18n/pt-BR.js`

```javascript
export default {
    id: "pt-BR",
    messages: {
        foo: {
            bar: "Olá Mundo!"
        }
    }
};
```

Combine the `i18nReducer` reducer to the property `i18n`.

```javascript
import { i18nReducer } from '@seudev/x-i18n';

combineReducers({
    i18n: i18nReducer,
});
```

* Map the `i18n` state property to a component property (See `mapStateToProps`).
* Map the `i18nActions` actions to a component property (See `mapDispatchToProps`).
* Import your message file that will be the **fallback** (See `import en from './i18n/en'`).
* Initialize the x-i18n in your `App` class using the method `xi18n` (See `this.props.xi18n`).

Call the `xi18n` method passing an object with the `fallback`, an array of available languages (`all`) and function that import the message files of lazy mode (`messagesProvider`).

Optionally you can call the `tryUseNavigatorLang` to try use the navigator language. This method verify if the navigator language is available in the `all` property.

*Note: The fallback message file must contain all messages of your application. *

```javascript
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { i18nActions } from '@seudev/x-i18n';
import en from './i18n/en';

class App extends Component {

    componentWillMount() {
        this.props.xi18n({
            fallback: en,
            all: [
                "en",
                "pt-BR"
            ],
            messagesProvider: lang => import(`./i18n/${lang}`)
        });
        //Optional
        this.props.tryUseNavigatorLang();
    }

    render() {
        return (
            <h1>Hello World!</h1>
        );
    }

}

const mapStateToProps = state => ({
    i18n: state.i18n
});

const mapDispatchToProps = dispatch => bindActionCreators(i18nActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

Where you desire internationalize some message:

```javascript
import { Message } from '@seudev/x-i18n';

export default props => (
    <div>
        <h1><Message id="foo.bar" /><h1>
    </div>
)
```

Alternatively you can use the `getMessage`:

```javascript
import { getMessage } from '@seudev/x-i18n/Message';

<div>
    <h1>{getMessage('foo.bar')}<h1>
</div>
```

See more usage examples [here](http://demo.x-i18n.seudev.com).

## Licensing

**seudev/x-i18n** is provided and distributed under the [Apache Software License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Refer to *LICENSE* for more information.
