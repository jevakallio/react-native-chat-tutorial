React Native Chat App
===

**At the Reactivate training? 👋 Jump to [Let's code!](#lets-code)**

## Introduction

This tutorial will walk through building a simple real-time chat app with React Native for Android and iOS. Along the way, you'll get to practice React Native basics and learn about tools you can use to build apps.

Work the tutorial at your own pace. The instructions below assume that you are comfortable with writing JavaScript and using npm. The tutorial assumes the use of `npm`, but the equivalent `yarn` commands will work as well.

## Set up development environment

We'll build the app from scratch. That means you don't need to clone this repository. Instead install [Create React Native App (CRNA)](https://github.com/react-community/create-react-native-app) from NPM and generate a new project:
```sh
npm install -g create-react-native-app
create-react-native-app MyChatApp
```

This will create a new CRNA project in a directory `./MyChatApp`. Feel free to name your app something else, if you'd like, and run the app with `npm start`:
```sh
cd MyChatApp
npm start
```

After a while, you should see a message _"To view your app with live reloading, point the Expo app to this QR code"_, and a QR code.

Let's do as the instructions suggest. Grab your iOS or Android phone and install the **Expo**
([iOS App Store](https://itunes.apple.com/app/apple-store/id982107779?mt=8) | [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)) app on it, launch the app and scan the QR code.

**Note**: For the phone to find the local server, **both devices need to be on the same local network.** This means either connected to the same WiFi, or the laptop's internet tethered via the phone's internet sharing functionality.

After dismissing the first use greeting from Expo, you should now see your app on your phone.

(If you have iOS or Android simulators installed, you can run `npm run ios` or `npm run android` to start the app on the simulator instead of using a real device.)

### What's Expo?

[Expo](https://expo.io/) lets web developers build truly native apps that work across both iOS and Android by writing them once in just JavaScript. It's open source, free and uses React Native.

Expo is embedded into [Create React Native App](https://github.com/react-community/create-react-native-app), the tool we used to generate and launch our project. It's possible to create React Native apps without CRNA (in fact, you'll need to do that if you want to write any custom Java or Swift code to enhance your app - Expo only supports JavaScript), but for learning the basics CRNA is the best choice. For the more manual alternative, see [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) in React Native docs.

## Code walkthrough

Okay, let's get started by familiarising ourselves with the anatomy of a React module. (If you are already familiar with React, feel free to move on to [next section](#lets-code).  

Open the directory in your favorite IDE or text editor: [Atom](https://atom.io/), [VS Code](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), Vim, Emacs, WebStorm... anything will do.

Open the **App.js** file. This is where we will do most of our coding today. It should look something like this.

<details>
  <summary>App.js (Click to expand)</summary>

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

</details>


Looking at the file, you can see three main sections.

#### Imports

First we import `React` so we can create our own React components, and three named components from `react-native`, which we can use to compose our UI:

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
```

The `import` keyword (and its mirror image `export` as seen on the next line) are part of the [ES6 Modules](http://www.reactnativeexpress.com/imports_and_exports) feature that allow us to split our application across multiple files and modules. React Native uses all the latest and greatest JavaScript features, even some that are not yet generally available in web browsers.

#### Component

Next we declare our `App` component and export it, so it can be accessed by React Native. React components are [ES6 classes](http://www.reactnativeexpress.com/classes) that extend from React.Component - but for now that is not important. This component has a single method, `render` that returns some [JSX](http://www.reactnativeexpress.com/jsx). Every React component needs a render method, and the output of that method is what you'll see on the screen.

```js
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
```

JSX is an extension to JavaScript that adds an ability to render React elements in a HTML-like syntax. In this case we use two types of components, `<View>` and `<Text>`. If you were to replace `View` with `div` and `Text` with `span`, this would look almost regular HTML (and exactly the same as React on the web):
```html
<div style={styles.container}>
  <span>Open up App.js to start working on your app!</span>
  <span>Changes you make will automatically reload.</span>
  <span>Shake your phone to open the developer menu.</span>
</div>
```

Because React Native exists for creating native apps, web primitives like div and span aren't available to us. Instead, on line 2 we imported some of the React Native primitives: View, Text, etc. There are counterparts for most important web primitives, as well as hundreds of others, either included in React Native, included in Expo, or installable via NPM. We will look at these later.

#### Styles

The last section in the file are the styles. If JSX reminded you of HTML, the React Native style system should remind you of CSS.
```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

The same in CSS would look something like this:
```CSS
.container: {
  display: flex;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
}
```

In fact, React Native implements a subset of CSS in JavaScript, including the [Flexbox](http://www.reactnativeexpress.com/flexbox) layout system we'll use to arrange our app components on the screen. The `display: flex` line from the CSS translation is not necessary in React Native, because all components "flex" by default.

Now, finally, let's code!

# Let's code!

## Step 1. Connect to chat server
In order to be able to chat with other users, we'll need a server. Happily, we have one available, and we can install a client library from NPM! Run the following in the project directory:

```sh
npm install --save react-native-training-chat-server
```

Then, in **App.js** add the following lines after the react-native imports:

```js
import {send, subscribe} from 'react-native-training-chat-server';

const NAME = 'jevakallio';
const CHANNEL = 'Reactivate';
```

Replace "Your name" with ... well, your name 😂! The channel can be any alphanumeric string - feel free to set up your own secret channel or use the default "Reactivate" to participate with everyone else. You'll now have access to two functions, `send` and `subscribe` that we'll use to send and receive messages.

## Step 2. Get messages

Next, we'll need to subscribe to our channel when our app starts. Add the following lines immediately below the component declaration:
```js
export default class App extends React.Component {
  //new lines below...
  state = {
    messages: [],
  };

  componentWillMount() {
    subscribe(CHANNEL, messages => {
      this.setState({messages});
    });
  }
  //...end new lines
}
```
It's just a few of lines of code, but there is a lot to unpack here.

1. First, we declare our [state](https://facebook.github.io/react-native/docs/state.html) - this is where React components can store their data and other dynamically changing state. In this case we initialize an empty state with an empty `messages` array.
2. Then, we declare a method named (exactly) `componentDidMount`, one of the special [Lifecycle methods](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) on every React component that will be called at different phases of the component's lifetime. This one will be called just after the component has "mounted", or in our case, when the App has first started.
3. Inside the lifecycle method, we `subscribe` to our chat server with a channel name and a callback function. The callback will be called every time new messages arrive.
4. In the callback, we call another special React method, `this.setState`. This method is responsible for updating the initial state we declared above. After you call `setState`, the component will automatically re-render and update the UI of our application!

You won't yet see any changes on the screen, because we haven't rendered our messages. We'll get to that next, but if you want to verify the subscription works, you can add a `console.log(messages)` into the callback. To access the debugger menu, shake your device and choose "Debug JS Remotely" option to view the log in Chrome Dev Tools. If running on simulator, see the [Debugging](https://facebook.github.io/react-native/docs/debugging.html) guide in React Native docs.

## Step 3. Render messages

Next, let's put some messages on the screen! We'll want to render the messages as a list, so we'll need to start by importing the [FlatList](https://facebook.github.io/react-native/docs/flatlist.html) component from the react-native package on the top of the file:
```diff
import React from 'react';
- import { StyleSheet, Text, View } from 'react-native';
+ import { StyleSheet, Text, View, FlatList } from 'react-native';
```

Then, we can remove the placeholder text in our `render` method with a FlatList:
```diff
  render() {
    return (
      <View style={styles.container}>
-        <Text>Open up App.js to start working on your app!</Text>
-        <Text>Changes you make will automatically reload.</Text>
-        <Text>Shake your phone to open the developer menu.</Text>
+        <FlatList data={this.state.messages} renderItem={this.renderItem} />
      </View>
    );
  }
```

We pass FlatList attributes, or [Props](https://facebook.github.io/react-native/docs/props.html). Props is how React components can pass data to each other. In this case, the props are:

1. `data={this.state.messages}` - FlatList expects an array of "data" to render, so we give it a list of messages we fetched earlier.
2. `renderItem={this.renderItem}` - FlatList also needs a callback it can call for each item in the `data` array to render the corresponding row. Here we pass it a method `this.renderItem`.

The renderItem method isn't one of the special lifecycle methods - it's just a plain old method on the class. In fact, it doesn't event yet exist, so let's create it now. Place the renderItem method immediately *above* your component's `render` method:

```js
  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }
```

If you are using a Channel that someone has posted any messages in it, you should now see them on the screen! They'll look a bit ugly, and a bit squashed, though. That's because we haven't yet added any styles. Let's do that next.

## Step 4. Styling the list

In the `renderItem` method, you see references to styles like `styles.row`, `styles.sender`, `styles.message`. These styles can be defined in the bottom of the file, replacing the existing StyleSheet:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
});
```
Feel free to play around with the styles and make it look different. The style names and values usually match how CSS works on the web, except names are written using camel casing, e.g `backgroundColor` rather than `background-color`.

## Checkpoint 1

At this point, you should see a styled list of messages. There is no one right way to achieve this, but this is how my App.js looks like:

<details>
  <summary>App.js (Click to expand)</summary>

```js
import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {send, subscribe} from 'react-native-training-chat-server';

const NAME = 'Your name';
const CHANNEL = 'Reactivate';

export default class App extends React.Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    subscribe(CHANNEL, messages => {
      this.setState({messages});
    });
  }

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.messages} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
});
```

</details>

## Step 5. Typing up messages

Next, we'll allow the user to send messages. We already have access to the `send` method of the chat server, we'll just need a text input where the user can typd, and a "Send" button the user can press to send the typed message.

Start by importing the `TextInput` primitive from `react-native`:
```diff
- import {StyleSheet, Text, View, FlatList} from 'react-native';
+ import {StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
```

Before we render the TextInput, we'll need a place to keep track of the text the user has typed. As you might remember from Step 2, we can use the component `state` for this. Let's amend the initial state on the top of the component declaration by adding a "typing" state variable that we'll update as the user types:
```diff
state = {
+  typing: "",
  messages: [],
};
```

Now we can add our TextInput to our UI. Add the following lines into your `render` method, immediately after the `<FlatList ... />` component, but before the closing container `</View>`
```jsx
<View style={styles.footer}>
  <TextInput
    value={this.state.typing}
    onChangeText={text => this.setState({typing: text})}
    style={styles.input}
    underlineColorAndroid="transparent"
    placeholder="Type something nice"
  />
</View>
```

Again, there's a lot to unpack here. One by one:
1. First we declare a footer view. We'll need this so we can later position the send button next to the input, within the footer.
2. Then we declare the TextInput. The first prop, `value`, sets the current value of the input. This is "bound" to the `typing` state variable: when `typing` is updated, the TextInput value updates.
3. This update is done in the TextInput's `onChangeText` callback: When the input text is changed by the user, we replace the `typing` state variable with the new text in order to update the input value. This pattern of listening of change events and then feeding the same value back to the component is called "Controlled component" - read about [Handling text input](https://facebook.github.io/react-native/docs/handling-text-input.html) in React Native to learn more.
4. The rest of the TextInput props are presentational. There are [many more props](https://facebook.github.io/react-native/docs/textinput.html) we could give here to control properties like on-screen keyboard type, autocorrect, autofocus etc.

We don't yet see anything on the screen. That is because the text input needs styling and dimensions. Add the missing `footer` and `input` style declarations into the StyleSheet:
```js
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
```

And now we should have a visible input field at the bottom of the screen! Before we go ahead and add the Send button, there is one more thing we need to do. Notice how the on-screen keyboard hides the text input, so you don't know what you are typing? Annoying, but don't worry, it's easy to fix with the help of [KeyboardAvoidingView](https://facebook.github.io/react-native/docs/keyboardavoidingview.html)

Import it from react-native:
```diff
- import {StyleSheet, Text, View, FlatList, TextInput} from 'react-native';
+ import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';
```

And wrap it around our footer View:
```diff
+ <KeyboardAvoidingView behavior="padding">
  <View style={styles.footer}>
    <TextInput
      value={this.state.typing}
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder="Type something nice"
      onChangeText={text => this.setState({typing: text})}
    />
  </View>
+ </KeyboardAvoidingView>
```

And that should do it!

## Step 6: Send messages

Now that we can collect user input, we'll want to send it to our server. Let's declare a `sendMessage` method on our component, for example below the `componentDidMount` function we used when subscribing to messages:

```js
async sendMessage() {
  // send message to our channel, with sender name.
  // the `await` keyword means this function execution
  // waits until the message is sent
  await send({
    channel: CHANNEL,
    sender: NAME,
    message: this.state.typing
  });

  // set the component state (clears text input)
  this.setState({
    typing: '',
  });
}
```

This function looks slightly different that our other methods because of the `async` keyword that precedes the method name. In the middle of the function, you see another keyword `await`. These are part of the ES7 `async/await` feature, which makes it easier to deal with asynchronous code where you would normally have used Promises. For the purposes of this tutorial, going deeper into async/await is not important, but they are very useful and worth [learning more about](https://ponyfoo.com/articles/understanding-javascript-async-await).

We then need a Send button to call our `sendMessage` method. Let's start (you know the drill by now) by importing one more primitive from react-native, this time `TouchableOpacity`:
```
```diff
- import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';
+ import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
```

TouchableOpacity, and its cousins TouchableHighlight, TouchableWithoutFeedback and TouchableNativeFeedback are the primitive components we can use to compose buttons and other elements with simple press interactions.

Let's put that inside our footer `View`, on the next line immediately after the `<TextInput />` element:
```jsx
  <TouchableOpacity onPress={this.sendMessage}>
    <Text style={styles.send}>Send</Text>
  </TouchableOpacity>
```

And of course, we'll style the button by adding a "send" style key to the StyleSheet:
```js
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
```

## Step 7: Anchor the list to the bottom

You probably noticed that the message list starts from the top of the screen and you
need to scroll to the bottom to see the last messages. Unfortunately the React Native
FlatList does not offer a "reversed" option - but no worries, there are a third-party
alternatives.

In this case we can use the `react-native-reversed-flat-list` module. Let's install it
from NPM by running the following command in the project root directory:
```sh
npm install --save react-native-reversed-flat-list
```

Then we can import it on the top of the file:
```diff
import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, } from 'react-native';
+ import ReversedFlatList from 'react-native-reversed-flat-list';
```

The nice thing about ReversedFlatList is that it's (mostly) a drop-in replacement for the normal FlatList. In our `render` method, we can just replace one component with another:
```diff
- <FlatList data={this.state.messages} renderItem={this.renderItem} />
+ <ReversedFlatList data={this.state.messages} renderItem={this.renderItem} />

This example shows how powerful the React Native third-party ecosystem is. Anybody can write a component, publish it to npm, and other developers can drop them into their apps. You can find good components by googling, or browsing component galleries such as [React Parts](https://react.parts/native)
