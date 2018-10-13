## Intro

If you've ever been to Reddit (or pretty much any other website), you may have noticed that a page's URL can be indicative of the content on the page.

For instance, look at this **route**: https://www.reddit.com/  

###### (not actually clickable; don't want to lose you)

The route in the above URL is just `/` - typically the default/main/home/root route for any page. No surprises of where the above should take you.

This route, however, is different: https://www.reddit.com/r/rickandmorty/

Still the same base - reddit.com - but now with a `/r/rickandmorty/` addendum - and if you go to that route then, of course, you'll end up on the _Rick and Morty_ sub-reddit, where discussions, theories, and ravings about the show are endless.

We're going to learn how to use React to make static routes, dynamic routes, and links for our own applications so that a user can hop around and get the full [Single Page Application](https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58) experience.

## Setup

To learn about React routes, we're going to create a directory. Yes, old school. 
Since directories are a little... antiquated, we're going to make a Fantasy directory to liven things up a bit.

Ultimately, our directory will look something like [this](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/fantasy-directory.gif).  
As you become entranced by the endless gif, make sure to pay attention to the route on top - see how it matches up with each page.

For example, when the route is `localhost:3000/directory/wizards/merlin` - we're on the page with all the details about the wizard Merlin.

So for now, to save you the boring stuff, **go ahead and fork** [this repository](https://github.com/Elevationacademy/fantasy-directory-class.git)

Look around a bit, get a feel for what you already have set up, and let's dig in.

Specifically, take a look at `package.json` - notice the new `react-router-dom` package. If you create your own project, you'll have to `npm install react-router-dom` (on top of the normal `react` stuff), but now you can just do `npm install` to get all the required node modules.

This might take a couple of minutes.

Once everything is installed, you can `npm start` as usual, then see a pretty background in the background with... nothing else. Let's change that.

* * *

## Router

We got something called a **React Router** from the `react-router-dom` package. This is what we'll use to handle all our routes.

So as with everything React-y, we'll need to import it. Before we do that, let's take a look at `App.js`:

```javascript
class App extends Component {
  constructor() {
    super()
    this.state = {
      wizards: [
        { name: "Merlin", power: "Wisdom", other: "Helped King Arthur", imgUrl: "https://tinyurl.com/merlin-image" },
        { name: "Morgana Le Fay", power: "Forces of Nature", other: "Trapped Merlin in a cave for eternity", imgUrl: "https://tinyurl.com/morgana-image" },
        { name: "Gandalf", power: "Plot Convenience", other: "Once broke a bridge", imgUrl: "https://tinyurl.com/gandalf-img" }
      ],
      bestiary: [
        { name: "Smaug", power: "Fire and Flying", other: "Burned a city to with his mouth", imgUrl: "https://tinyurl.com/smaug-image" },
        { name: "Buckbeak", power: "Flying", other: "Knocked over Malfoy like a boss", imgUrl: "https://tinyurl.com/buckbeak-image" },
        { name: "Cerebrus", power: "Having three heads", other: "Holding back the dead since 100 BCE", imgUrl: "https://tinyurl.com/cerebrus-image" }
      ]
    }
  }

  render() {
    const state = this.state
    return (
      <div className="App">
        <div id="home-background"></div>
        <div id="main-links">
          {/* Main Links */}
        </div>
        {/* Routes go here v */}

        {/* Routes go here ^ */}
      </div>
    );
  }
}
```

Looks like a lot - but really it's just the `state` and some minor boilerplate in the `return`.

Quick word on our app's data: we should be pulling it from some API/our server - but for this example hard coding will do fine. 
As you can see, the data in there is everything that will appear on our app once everything is working (reference the gif from before)

For starters, we'll want to wrap our _whole_ app with that **React Router** we talked about. So first thing's first, add this import to `App.js`:

```javascript
import { BrowserRouter as Router} from 'react-router-dom'
```
  
The React Router is called `BrowserRouter` initially, but we'll shorten it by using the alias `as`. From the [docs](https://reacttraining.com/react-router/web/api/BrowserRouter), the **`BrowserRouter` uses the [HTML 5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to keep our UI in sync with our URLs** (our routes). For instance, if I'm on `localhost:3000/directory/bestiary/pegasus` - I should see a page with information about Pegasus, the winged horse.

With the above import we now have access to a `Router` tag (which is a React component) and we're going to nest our whole app inside of it, like so:

```javascript
render() {
  const state = this.state
  return (
    <Router>
      <div className="App">
        <div id="home-background"></div>
        <div id="main-links">
          {/* Main Links */}
        </div>
        {/* Routes go here v */}

        {/* Routes go here ^ */}
      </div>
    </Router>
  );
}
```

Now we'll be able to use routes inside our whole app.

* * *

## Route

Alone, `Router` doesn't do anything. But now we'll introduce a new component called `Route`. From the [docs](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md) again, **a route renders some UI when a location matches the route's path**.

Before we implement it, take a look at `Home.js` in the `components` folder. You'll see some HTML there that represents our `Home` component - our landing page - but we don't see it in the browser. Ideally, when a user goes to our **home** route, also known as the **root** route, we want them to see this HTML.

To do that, add the following code in `App.js`, in between the _Routes go here_ comments:

```javscript
<Route path="/" component={Home}/>
```

###### Don't forget, of course, to add Route to the import from `react-router-dom`

What this is saying is straightforward: _when the route is `/` ( i.e. the URL is `https://my-site.com**/**` ), render the `Home` component._

Once you've added that, save and look at your page again - wa-bam, what a landing page.

You'll notice that nothing is working - we'll fix that in a bit.

Using the `component` attribute in the `Route` tag is well and fine for rendering a simple, dumb, static, basic, data-less component like `Home` - but once we want to start passing data down, we'll want to use the `render` attribute (yes, not much creativity with naming here).

### Render

Check out the `render` method in the `About.js` component:

```javascript
render() {
    return (
        <div id="about">
            <div>
                Find out about:
            </div>
            <div>
                {this.props.items.map(i => {
                    return <div>{i}</div>
                })}
            </div>
        </div>
    );
}
```

You see on line 8 that this component expects some `props`, specifically an array\* called `items`.

###### \*We know it's an array because we're calling `map` on it.

So back in `App.js` add the following underneath the `Home` route you added:

```javascript
<Route path="/about" render={() => <About items={Object.keys(state)} />} />
```

Let's break this down:

*   `path="/about"` - this route will be relevant when the user goes to `https://my-site.com/about`; in our case that is `localhost:3000/about`
``*   `render` is an attribute for the `Route` tag that is similar to the `component` attribute, but allows us to pass data to whatever it's rendering
*   We use the ES6 arrow function syntax: `() =>` because `render` must return a function
*   The next part is normal component work we already know: `<About items=...`
    *   Render the `About` component, and pass it a property called `items`
*   Finally, the `Object.keys(state)` will get an array of our `state`'s keys

*   For now, that's just `["wizards", "bestiary"]`

Once that is clear (ask for clarification if anything isn't), go to your browser again and go to the `/about` route.

Now that's a funny mess:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-router-home-and-about.jpeg)

We're seeing _both_ the `Home` component _and_ the `About` component, even though we're on the `/about` route.

The reason this is happening is because the `path` attribute works using [regex matching](https://reacttraining.com/react-router/web/api/Route/path-string). In particular, both our `Home` and `About` paths have the forward slash, `/`, in them, hence they both appear. Funny, huh?

The solution is to add the `exact` attribute to our `Route` tag, like so:

```javascript
<Route path="/" exact component={Home}/>
<Route path="/about" exact render={() => <About items={Object.keys(state)} />} />
```
  
Notice that we have to add `exact` to both `Routes` - in fact, you will probably _always_ want to add `exact`. This might be the default in future versions of `react-router-dom`.

Ok so great, now with this fix, you can go to just `/` or `/about` and see the pages you expect!

## Links

So far we've only been able to access our pages by physically writing out the URL each time - obviously, that's not how we want our users to navigate through our apps. That's where the `Link` tag comes in.  
For demonstration, add this inside the `main-links` div in `App.js`:

```javscript
<Link to="/">Home</Link>
```

Pretty straightforward. When you hit this link, it will `go` to the `/` route. Note that Home in this case is just plain text.

Of course, since `Link` is a new component we're using, we're going to have to import it. Add it to your imports from `react-router-dom`, like so:

```javascript
import { BrowserRouter as Router, Link } from 'react-router-dom'
```

To test this out, go to `localhost:3000/about` in the browser, and then hit the _Home_ link that should be on the top left of your page.  
Zoom, there you go.

You should be able to **add another `Link` that routes the user to `/about`** - you've got this.

Once you've got that down, right-click and inspect the Home/About links. Notice that in the DOM they get rendered as simple `a hrefs`!

Remember, React isn't inventing anything new here, it's just packaging the whole routing business nicely for us. Good ol' React.

## Match

Cool cool, so far we can:

1.  Set up an app with a `Router`
2.  Use `Route` to link between components and their corresponding routes
3.  Pass data between routed components using the `render` attribute
4.  `Link` between different routes

Not bad.

The last thing we need is to be able to load data dynamically depending on _which_ route we're on.

Look at the code in `Fentities.js`\*, then look at the [gif](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/fantasy-directory.gif) again.  
Notice in the gif that when we see wizards, the route is always `/directory/wizards/wizardName` - much like `POST`/`GET` routes in our server, we can also use the `/:parameter` syntax with React's router.

###### \*_Fentities_ is a portmanteau of _Fantastic_ and _Entities_

That's why when the user goes to `/directory/wizards/merlin` or `/directory/wizards/gandalf` - both of those routes will show the same component, the `Fentities` component! Check out this component's render code:

```javascript
render() {
    return (
        <div>
            <h1 id="fentities-title">{/*Get from `match`*/}</h1>
            <div id="fentities-container">
                {fentities.map(f => {
                    return (
                        <div className="mini">
                            <img className="directory-img" src={f.imgUrl} alt="" />
                            <span>{f.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>)
}
```

  
Breaking it down:

*   Line 4: We're going to dynamically insert a heading here, depending on which route we're on
*   Line 6: We'll have to create a `fentities` variable, based off our current route and some data we'll get from `state`
*   Lines 8-11: Create a series of image+name for each fantastic entity (wizard/beast/potion/whatever)

*   Note that we're using `.map` again for the looping

Given the above, we understand that when we render this component, we'll need to pass down some data about the route, and about the `state`. We already know how to do the latter (using the `render` attribute and the `() =>` syntax) from before, so let's go back to our `App.js` and add this:

```javascript
<Route path="/directory/:fentities" exact render={({ match }) => <Fentities match={match} />}/>
```

Sure, that's a long line. But you know most of it. Let's dive in:

The `/directory/:fentities` path means that whenever the user goes to `/directory/_anything_`, React should render the `Fentities` component - the component will take care of what UI to create based off of the path.

Now, since the component needs that path information, we need to pass it - and we do that with the `({ match })` above.

Remember, before (when we set up the `About` route), all we had was this:

```javsacript
<Route path="/about" exact render={() => <About ...
```

The only difference here is that we're filling those empty parentheses with `{ match }` which is a reserved keyword for an object that holds information about our route:

```javascript
<Route path="/directory/:fentities" exact render={({ match }) => <Fentities ...
```

And then, like any normal react component, we have to pass the `match` object, which accounts for the final `match={match}` - totally normal and expected React syntax.

So now let's go back to `Fentities.js` and **comment out the entire `fentities-container`**, and - before the `return` - console log `this.props.match`

Now in your browser go to `http://localhost:3001/directory/wizards` and look at the console. You should see this:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-router-match-log.PNG)

Juicy. Most of it should make sense, but the key that interests us most right now is `params` - these are the parameters passed in the route. You notice that we only have one key in the `params` object: `fentities` - and that is exactly what we defined when we created the `Route` for the `Fentities` component.

In other words, the `fentities` in the above image, is the same as the `fentities` here:

```javascript
<Route path="/directory/:fentities" exact render={...
```
  
And why is its value `wizards`? Because we went to `directory/wizards`! We basically _passed_ the value of wizards into that `/:parameter` - very similar to a normal function call!

This is super useful because now whenever we render the `Fentities` component, we can know exactly which group of fantastic entities we want to render. Go ahead and see what console logs when you go to `http://localhost:3001/directory/bestiary` - make sure you understand what's going on!

* * *

So now let's use this information to render that `h1` inside of `Fentities.js` - we want it to display _Wizards_, or _Bestiary_ - or whatever, depending on which route the user went to.

Take a crack at it yourself. Create a `fentitiesCategory` variable and store whichever fantastic entity category the user wants depending on the route. Then set the header's text to be `fentitiesCategory`. Check out this solution once you have your own:

```javascript
const fentitiesCategory = this.props.match.params.fentities
return (
    <div>
        <h1 id="fentities-title">{fentitiesCategory}</h1>
    ...
```

Once you've got that, go to `/directory/wizards`, then `/directory/bestiary` in your browser, and notice how the header changes automatically. Beast.

* * *

Alright that's great, now we want to actually display each fantastic entity's (each wizard's, beast's, whatever) image and name.

That means that the `Fentities` component needs access to `state` as well, since that's where all of that data is stored. Doing this is exactly as you would expect.

Try passing the state down from `App` to `Fentities` with your existing `/directory/:fentities` route, then console log the state from `this.props` in `Fentities.js` to make sure you got it. Notice that you'll pass the whole state because you don't know which route the user is going to until ze actually _goes_ to that route.

Here's a solution for validation:

In the `App` component:

```javascript
<Route path="/directory/:fentities" exact render={({ match }) => <Fentities match={match} state={state} />}/>
```

Notice that earlier we defined `const state = this.state` for convenience.

Then, for validation in the `Fentities` component, before the `return`:

```javscript
console.log(this.props.state)
```

Now we see this in the console:

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-router-print-state.PNG)

So how do we select the relevant one?

Remember, the `state` we passed is just an object, which we can access easily if we know what key we want... which we _do_ know since the user is going to `/directory/theKeyWeWant`! How awfully convenient.

Inside `Fentities.js`, we can use `fentitiesCategory` again to access the array we want from the `state` object we just received.

Check this:

```javascript
const fentities = this.props.state[fentitiesCategory]
console.log(fentities)
```

Look at your console log in the browser when you got to `/directory/wizards` or `/directory/bestiary` again - you'll see how the data changes each time because of the above code! Make sure you understand what's going on.

At this point you can un-comment the `fentities-container` section, then go to your browser and revel at the result!

![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-router-params-wizards.PNG) ![](https://s3-us-west-2.amazonaws.com/learn-app/lesson-images/react-router-params-bestiary.PNG)

