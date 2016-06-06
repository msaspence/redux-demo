# Trip Planner  

[![Circle Status](https://circleci.com/gh/holidayextras/trip-planner/tree/staging.png?circle-token=40e4943b0e2c0047a5e27b8d50c980a5811dcfe6&style=shield)](https://circleci.com/gh/holidayextras/trip-planner)
[![Coverage Status](https://coveralls.io/repos/github/holidayextras/trip-planner/badge.svg?branch=staging&t=VWbWtq)](https://coveralls.io/github/holidayextras/trip-planner?branch=staging)
[![Dependency Status](http://david-dm.org/holidayextras/trip-planner.svg)](http://david-dm.org/holidayextras/trip-planner)
[![devDependency Status](http://david-dm.org/holidayextras/trip-planner/dev-status.svg)](http://david-dm.org/holidayextras/trip-planner#info=devDependencies)

The JavaScript application behind HEHA!

<table>
  <tr>
    <th colspan="3">Project Gurus</th>
    <th>Supporting SA</th>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/jackdcrawford"><img src="https://avatars2.githubusercontent.com/u/1485654?v=3&s=150" /></a><br />
      <a href="https://github.com/jackdcrawford">Jack Crawford</a>
    </td>
    <td>
      <a href="https://github.com/msaspence"><img src="https://avatars0.githubusercontent.com/u/242861?v=3&s=150" /></a><br />
      <a href="https://github.com/msaspence">Matthew Spence</a>
    </td>
    <td>
      <a href="https://github.com/Joezo"><img src="https://avatars0.githubusercontent.com/u/2870255?v=3&s=150" /></a><br />
      <a href="https://github.com/Joezo">Joe Warren</a>
    </td>
    <td>
      <a href="https://github.com/shackpank"><img src="https://avatars3.githubusercontent.com/u/655660?v=3&s=150" /></a><br />
      <a href="https://github.com/shackpank">Ollie Buck</a>
    </td>
  </tr>
  <tr>
    <td colspan="3">For day-to-day technical queries and support.</td>
    <td>For escalated queries.</td>
  </tr>
</table>

## Contents

* [Getting Started](#getting-started)
* [Running](#running)
* [Building](#building)
* [Testing](#testing)
  * [Running a Subset of the Suite](#running-a-subset-of-the-suite)
  * [Test Coverage](#test-coverage)
  * [Manual Testing](#manual-testing)
* [Configuration](#configuration)
* [Linting](#linting)
* [Contributing & Continuous Integration/Deployment](#contributing--continuous-integrationdeployment)
  * [Heroku Review Apps](#heroku-review-apps)
  * [Continuous Integration](#continuous-integration)
  * [Continuous Deployments](#continuous-deployments)
  * [Manual Deployments](#manual-deployments)
  * [Developing Integrations](#developing-integrations)
* [Git Hooks](#git-hooks)
* [Common Questions](#common-questions)

## Getting Started

### 1. Install Node

Trip-planner requires Node 4.2.3. If you are not already, we suggest using a node version manager. These instructions are for [nvm](https://github.com/creationix/nvm) but [other node](https://github.com/tj/n) [managers are available](https://github.com/hokaccha/nodebrew).

**You'll need to follow these steps if you're not sure of the version of node you're using.**

Install [nvm](https://github.com/creationix/nvm) with [homebrew](http://brew.sh).

```
brew install nvm
```

and follow the output instructions. Then install the required version of node.

```
nvm install 4.2.3
```

You can run `nvm use 4.2.3` to switch to the correct version and call it a day. However if you are using different versions of Node in different projects you might find it easier to automatically switch node versions with [avn](https://www.npmjs.com/package/avn). (avn also works with [n](https://github.com/tj/n) and [nodebrew](https://github.com/hokaccha/nodebrew))

```
npm install -g avn avn-nvm
avn setup
```

Now whenever you `cd` into the trip-planner project directory avn will automatically switch to the correct version of Node as specified in the [.node-version](https://github.com/holidayextras/trip-planner/blob/staging/.node-version) file.

### 2. Clone and Install

```
git clone git@github.com:holidayextras/trip-planner.git
cd trip-planner
npm install
```

This will install the trip-planner and all of its dependencies. After install the application will be built (using `npm run build`) and [git hooks will be installed](#git-hooks) for you.

### 3. Run

```
npm start
```

Trip planner will now be running on [http://localhost:3050](http://localhost:3050)

### 4. Try it out

In order to get started and see the trip-planner app you need to make a booking. Point your browser to [Trip Controller](http://trip.holidayextras.co.uk/settings) and switch to the Staging environment (by default the trip-planner retrieves its data from staging).

Next, go to [the homepage](http://www.holidayextras.co.uk) and make a booking for one of our supported products and destinations (e.g. airport parking, flying to Barcelona). You can use one of the test credit cards from Confluence. Enter your email, create a password and after you finish the booking you'll end up on the staging trip planner.

To test it worked correctly point your browser to <http://localhost:3050> and enter the login credentials you've just used or created on the previous step. It should give you the first upcoming reservation made by you. To switch to a different reservation add the following query string parameters in the URL:

```
?base_booking_ref=HP<BOOKING REF>
```
where the `<BOOKING REF>` is the 5-character reference you are looking for.


## Running

`npm start` will run all of the child `start` scripts, you can run each of these in their own terminal if required:

```
npm run start:js      # Watches for changes in .js(x) files and rebuilds as necessary
npm run start:static  # Watches for changes in .html files and copies them to the dist directory as necessary
npm run start:less    # Watches for changes in .less files and rebuilds as necessary
npm run start:tests   # Watches for changes in tests files, rebuilds and runs the test suite as necessary
```

## Building

It is possible to build the application without continuing to watch for changes using the `build` scripts. These do the same thing as the equivalent `start` scripts but exit once they have built their resources.

```
npm run build         # Runs all of the build scripts in parallel
npm run build:js      # Builds the main index.js file
npm run build:static  # Copies .html files to the dist directory
npm run build:less    # Builds the main index.css file
```

## Testing

The test suite is run in Chrome using [Karma](http://karma-runner.github.io/0.13/index.html). `npm test` will build the test suite, run it once, generate coverage reports and exit. For local development `npm run start:karma` will watch for changes and rerun the test suite as needed. This is run as part of the `npm start` script and is best for local development as it doesn't have to build the webpack from scratch each time.

Once you have Karma running you can manually trigger a test run with `npm run test-run`.


### Running a Subset of the Suite

There are a couple of ways to only run a subset of the test suite and to focus on what you are currently working on.

#### `.only`

Adding `.only` to a `describe`, `context`, or `it` call in mocha will instruct it to only run that test or set of tests. See the [Mocha documentation](https://mochajs.org#exclusive-tests) for more details.

```
describe('My module', function() {
  describe.only('My method', function() {
    it('will run this test', function() { expect(something).to.eq(something) })
    it('and this test', function() { expect(something).to.eq(something) })
  });

  describe('My other method', function() {
    it('but not this test', function() { expect(something).to.eq(something) })
  });
});
```

#### `--grep`

Mocha also has a `--grep` flag (`-g` for short), that will generate a regular expression to be matched against your test descriptions. Only tests or sets of tests that match will be run. See the [Mocha documentation](https://mochajs.org#g-grep-lt-pattern-gt) for more details. You can pass this (and other flags) to Mocha from the npm `test-run` command with `--`.

```
npm run test-run -- --grep "Weather"
```

### Test Coverage

Coverage of the test suite is automatically calculated when ever Karma does a test run, whether that's via `npm test` or `npm start`. This will give you a summary of test coverage in your terminal output and build a more in depth html report in `coverage/index.html`.

Test coverage is tracked on [Coveralls](https://coveralls.io/github/holidayextras/trip-planner). You *can* send coverage to Coveralls with `npm run coverage:upload` but *this is automatically done* as part of the continuous integration process. **You don't need to do this manually!**

*Note:* When the Karma watcher automatically runs a subset of the tests based on your changes the coverage report will be significantly lower because it is still calculated against the entire application code. This will not affect Coveralls but after such a test run your local test reports will be much lower than reality.

### Manual Testing
The [regression checklist](https://github.com/holidayextras/trip-planner/blob/checklist/docs/regression-checklist.md) provides a simple list of regression checks to perform when deploying changes to Trip Planner.

## Configuration

### npm

Configuration is powered by the [package.json](https://github.com/holidayextras/trip-planner/blob/staging/package.json) `config`. Current configurable options include:

* `port` (3050) - this is the port that serve will deliver the application on locally

You can override these with:

```
npm config set <key> <value>
```

**Do not** make changes to the values in package.json unless you mean to change the default values for everyone.

### Application
Configuration lives in `src/config`. In there you'll find different files for each environment.

You can access the `config` object within your code by writing

```javascript
const config = require('config');
```

This uses a webpack alias to automatically pull in the correct file based on `DEPLOY_ENV`. If `DEPLOY_ENV` does not exist then it will fallback to `NODE_ENV`. If that isn't set then it will default to `'development'`.
## Linting

You can lint your .js(x) and .less files with:

```
npm run lint      # Runs each of the following in sequence
npm run lint:js   # Lints .js(x) files
npm run lint:less # Lints .less files, this is a @TODO and doesn't actually do anything
```

`npm run lint:js` will also run SNYK report giving you information on dependency vulnerabilities.

This is run automatically when you commit by a [git hook](#git-hooks) that is installed automatically after `npm install`. There are [addons](https://atom.io/packages/eslint) [available](https://atom.io/packages/linter-less) [for most](https://packagecontrol.io/packages/SublimeLinter-contrib-eslint) editors to do this as you work.

## Contributing & Continuous Integration/Deployment

This follows the pattern as out lined in the [culture docs](https://github.com/holidayextras/culture/blob/master/cd-flow.md). There are some differences around deployment and testing, highlighted in **bold** below.

1. Code Change
  1. A feature branch is created from the `staging` branch
  1. Changes are made and committed back to `origin`
  1. A new PR is created
  1. Automated tests and quality checks are run on the feature branch
1. Code Review
  1. Code is reviewed by another developer
  1. Code is reviewed by a senior or project guru
  1. **Work is tested using Heroku review app**
  1. Work is either signed off or feedback is actioned
1. Testing
  1. **Tester uses Heroku review app to test changes**
1. Staging
  1. Tester/QA merges feature branch into the `staging` branch
  1. Automated tests and quality checks run on the `staging` branch
  1. Changes to staging are automatically deployed to staging environment
  1. Appropriate testing is performed alongside any other recent changes from the team
1. Go live
  1. Tester/QA merges staging branch into the `master` branch
  1. Automated tests and quality checks run on the `master` branch
  1. Changes to master are deployed automatically to production environment
  1. Appropriate manual testing is performed  to ensure a successful deployment
  1. **Minimal automated tests are NOT performed to ensure a successful deployment**, this is a @TODO
  1. **Deployment notification are NOT sent out to team**, this is a @TODO

### Heroku Review Apps

When a PR request is created Heroku will automatically create a [review app](https://devcenter.heroku.com/articles/github-integration-review-apps) making the version of the application up for review available at `http://hx-trip-planner-pr-<pull_request_number>.herokuapp.com`. Testers and reviewers can use this to review the behavior of the application without having to checkout the branch locally.

This is the first time these have been used at Holiday Extras and we'll be feeding back how useful they are to the wider web team. If you are tester or reviewer making use of review apps please let us know how you get on.

It may still be necessary to check out the feature branch locally for review or testing, due to the nature or complexity of the changes or simply personal preference. This is perfectly acceptable although we ask that people give the review app a try.

### Continuous Integration

Continuous integration is provided by [CircleCI](https://circleci.com/gh/holidayextras/trip-planner) and will automatically run the test suite.

### Continuous Deployments

Once either the `staging` or `master` branch has passed its automated testing CircleCI will deploy them to their respective S3 buckets.

* **Staging:** http://s3-eu-west-1.amazonaws.com/hx-staging-repo/hx-trip-planner/index.html
* **Production:** http://s3-eu-west-1.amazonaws.com/hx-production-repo/hx-trip-planner/index.html

These are fronted by the CloudFront [CDN](https://en.wikipedia.org/wiki/Content_delivery_network)

* **Staging:** http://d3mybgevzuuf33.cloudfront.net
* **Production:** http://d3oo38t2dqdyho.cloudfront.net

In production stylesheet and JavaScript files will have the CircleCI build number added to their filename to allow cache busting with each deploy. It will also create a tag for reference in the git repo.

### Manual Deployments

*If* necessary, it is possible to manually deploy to staging and production:

```
DEPLOY_ENV=staging npm run deploy
DEPLOY_ENV=production npm run deploy
```

You will need to provide the correct AWS key and secret using the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables. [Matthew Spence](mailto:matthew.spence@holidayextras.co.uk) has a set, if he is unobtainable contact IT for access.

In production when run manually the current git hash is added as a cache buster to asset filenames rather than the CircleCI build number. If for what ever reason the project is not a git repo it will use the unix epoch. In either instance a git tag **will not** be created.

### Developing Integrations

Trip planner integrations are internal modules that are responsible for retrieving and persisting data to and from server side services. They provide an abstraction layer to the various services we use and help us from being too tightly coupled to any one specific source of data.

[More in depth document for integrations is available.](https://github.com/holidayextras/trip-planner/blob/staging/docs/integrations.md)

## Git hooks

We use a package called [ghooks](https://www.npmjs.com/package/ghooks) to manage our git hooks. These are configured in the `config.ghooks` property within `package.json`. Currently these are:

* **pre-commit** - before committing, [linting](#linting) will be run with `npm run lint`

## Common Questions

#### This component expects a `dispatch` prop but its parent component isn't providing it. Where does it come from?

The `connect` function of `react-redux` [automatically provides it](https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-just-dispatch-and-dont-listen-to-store).

#### Why does this component's export look strange?

```javascript
const connectedFooComponent = connect(mapStateToProps)(FooComponent);
connectedComponent.FooComponent = FooComponent;
module.exports = connectedFooComponent;
```

The module is exporting a `FooComponent` that's connected to the redux store, with an additional `FooComponent` property attached to it exposing the unconnected component. The unconnected component is exported so that it can be unit tested through passing it props, instead of having to mock out all of `react-redux`'s functionality.

With ES6 modules this would be achieved differently:

```
export default connect(mapStateToProps)(FooComponent);
export { FooComponent as UnconnectedFooComponent }
```

The first example is a way of getting the same results using commonjs modules.

#### How can I use this app with local tripapp and local hapi?

Uncomment the 3 lines in `src/config/development.js` to point trip planner to the correct places. Visit trip-planner at http://localhost:3050.

If you're running hapi or tripapp on a VM then you'll need to edit your host file so that both systems are running on the same domain. `local.holidayextras.co.uk` works for us. Now edit `src/config/development.js` to swap the `localhost` domain to your new domain.
