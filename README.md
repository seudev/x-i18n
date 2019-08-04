# X i18n

## What is it?

A React library that use Redux to internationalize the messages of your app. See a demo [here](http://demo.x-i18n.seudev.com).

## Using X i18n

```javascript
npm i @seudev/x-i18n
```

### Messages Files

Create a folder with your message files.

* The file name must be the ISO language code;
* The default export must be the message object;
* The `id` property  (required) must be the ISO language code (Equal to the file name);
* The `messages` property (required) must be a object.

The children of the `messages` property are your messages. You are free to define any structure.
The **message id** is the path to access the message. Example: `foo.bar`

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

### Redux Reducer

Combine the `i18nReducer` reducer to the property `i18n`.

```javascript
import { i18nReducer } from '@seudev/x-i18n';

combineReducers({
    i18n: i18nReducer,
});
```

* Note: Case desire access the the `i18n` state, map the `i18n` state property to a component property (`mapStateToProps`).

### I18n

```jsx
import I18n from '@seudev/x-i18n';
```

#### Props

| **Name**            | **Type** | **Default** | **Description**                                                                                        |
|---------------------|----------|-------------|--------------------------------------------------------------------------------------------------------|
| init                | object   |             | An object with the `fallback`, an array of available languages (`all`) and function that import the message files of lazy mode (`messagesProvider`). *Note: The fallback message file must contain all messages of your application.*                       |
| lang                | string   |             | The lang that will be used. Must be one of available languages (`all`).                                |
| tryUseNavigatorLang | boolean  | false       | Tries use the navigator language. It verifies if the navigator language is available in the `all` property.                                                                                                                                               |

### Initialization

#### Using the [I18n](#i18n) component:

* Import your message file that will be the **fallback** (See `import en from './i18n/en'`).
* Initialize the x-i18n in your `App` class using the `I18n` component.

```jsx
import React, { Component } from 'react';

import I18n from '@seudev/x-i18n';
import en from './i18n/en';

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <I18n init={{ fallback: en, all: ['en', 'pt-BR'], messagesProvider: lang => import(`./i18n/${lang}`) }} />
                //Put your code here
            </React.Fragment>
        );
    }

}
```

#### Using redux action:

```jsx
import { xi18n } from '@seudev/x-i18n';
```

Map the `xi18n({ fallback, all, messagesProvider })` action to a component property (`mapDispatchToProps`).

### Set Lang

#### Using the [I18n](#i18n) component:

```jsx
    <I18n lang="pt-BR" />
```

*Note: You can use the `lang` property together with the [initialization](#initialization).*

#### Using redux action:

```jsx
import { setLang } from '@seudev/x-i18n';
```

Map the `setLang(lang)` action to a component property (`mapDispatchToProps`).

### Try Use Navigator Lang

#### Using the [I18n](#i18n) component:

```jsx
    <I18n tryUseNavigatorLang />
```

*Note: You can use the `tryUseNavigatorLang` property together with the [initialization](#initialization).*

#### Using redux action:

```jsx
import { tryUseNavigatorLang } from '@seudev/x-i18n';
```

Map the `tryUseNavigatorLang()` action to a component property (`mapDispatchToProps`).

### Message

```jsx
import { Message } from '@seudev/x-i18n';
```

#### Props

| **Name** | **Type**              | **Default** | **Description**                                                                  |
|----------|-----------------------|-------------|----------------------------------------------------------------------------------|
| id       | string                |             | The id of a message (Defined in some message file)                               |
| params   | object                |             | An object with param, to interpolate the message template.                       |
| rawHtml  | boolean               | false       | Use true to enable support to Html tags in the message.                          |
| default  | string                |             | The message returned if not found a message with the given id.                   |
| as       | string or elementType |             | The element type that the message will wrapped. Example: `"div"` or `MyElement`. |


* Where you desire internationalize some message:

```jsx
import { Message } from '@seudev/x-i18n';

export default props => (
    <div>
        <h1><Message id="foo.bar" /><h1>
    </div>
)
```

* Alternatively you can use the `getMessage(id, params = {}, defaultMessage)`:

```jsx
import { getMessage } from '@seudev/x-i18n';

export default props => {
    const message = getMessage('foo.bar');
    return (
        <div>
            <h1>{message}<h1>
        </div>
    );
}
```

See more usage examples [here](http://demo.x-i18n.seudev.com).

## Licensing

**seudev/x-i18n** is provided and distributed under the [Apache Software License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Refer to *LICENSE* for more information.
