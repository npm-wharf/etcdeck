# etcdeck

A control deck for etcd. Works nicely with [kickerd]() as a service configuration bootstrapper and [furthermore]()'s style of key management.

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

## Problem

The cobbler's children have no shoes. Everything I've ever worked on would have benefited from a custom admin control surface and virtually none of them ever had one. CLIs are good, but sometimes dashboards are nice.

## What It Does

 * Loads a list of key spaces (prefixes)
 * Add new key prefix
 * Allows you to change or delete keys in a prefix
 * Keys are updated on blur

## What It Should Eventually Do

 * Handle failures better (rollback UI changes to previous state)
 * Provide an auth mechanism via OAuth to GitHub or other things
 * Monitor key spaces for changes and update UI (push via sockets)
 * A mechanism to define presentation parameters per key at a prefix level

## Running In Production

The travis build produces a Docker image for use in production. The only environment variable you need to set (for now) is `ETCD_URL`

## Running This For Dev

The `dev.js` script will spin up both the react client process and the server process. Both _should_ pick up changes to source and restart in the background such that you really shouldn't have to think about this.

### For Mac OS with Docker
```bash
npm i
./start-etcd.sh
node ./dev.js
```

### For Other Things With Docker
```bash
npm i
sudo ./start-etcd.sh
node ./dev.js
```

### Help, I Don't Docker

I don't have install instructions for setting etcd up on your system (sorry). Docker is pretty straight-forward and the upside is you don't make a mess installing a bunch of server products on your machine :grin:

You will need etcd, though. Once you have it, you can just run:

```bash
npm i
node ./dev.js
```

> Note: if you run it at a port other than 2379, you should set the URL via `ETCD_URL`.

__example__
```bash
export ECTD_URL=http://localhost:4479
node ./dev.js
```

## Project Structure

### `./src`

#### Top Level

 * index - sets up reducer, router, history, pull in bootstrap
 * app - main view, pulls in Main, About, Notification and NavBar components
 * nav - a reducer to capture history for other downstream components
 * reducer - top level reducer that pulls in reducers for all component reducers


#### feature

Each component is under its own folder under `feature` and will have some subset of the following files:
 * `index.js`
 * `style.css`
 * `reducer.js`
 * `actions.js`
 * `api.js`

The idea here is to isolate everything related to a component in its own folder and eliminate guess work in regard to where code for a particular component's display or functional behavior might reside. Sometimes it even works out that way.

Regrettably, `create-react-app` does not allow CSS modules and so all styles exist in global scope. If I had taken more time to design this/were any good at design, the classes would follow BEM style and it wouldn't matter.

Alas, I am terrible at UI/UX :grimacing:

 * about - the about screen
 * key - display the control for viewing / editing a key
 * keySet - builds the display for the set of keys
 * main - routing between component and UI structure
 * navbar - the horizontal nav bar
 * newKey - create and add a new key
 * newPrefix - create and add a new prefix
 * notification - a dismissable notification ribbon component
 * prefixList - the left "nav", lists keyspaces on the server
 * prefix - displays a prefix in the nav list

### `./server`

The node process that hosts the API is here. Deftly, a thing that grew out of stuff I did at LeanKit, is the abstraction that sits atop `express` and provides the API.

The `key` resource is where all the API endpoints the UI currently talk to are defined (for now anyway).

A `watch` endpoint is likely coming to manage which prefix is active so that the server knows what keyspace to watch in etcd so it can push any changes up to your session via socket.io.

## Contributing

### Code Style

The project uses [standard]. This is on purpose. My coworkers like it. I like my coworkers. Therefore, this is how I write the JavaScripts now. If it makes you sad, I'm sorry. It's only syntax.

The upside is that with `standard --fix` a lot of things can be reconciled. I don't accept PRs that fail standard's lint.

### Contributions not Rewrites

TL;DR - contributions are welcome; changing the project to match your preferences but with no actual upside is not a contribution. _Please do not do this._

Web development is a dilemma of choice right now. It's quite likely you know of different ways to do things that might benefit this project but there are most certainly trade-offs involved and a conversation is warranted. Please let's talk before you spend a lot of your valuable time submitting a PR that would make lots of changes to technology choice, project structure, etc. only to have me reply with, "no thank you". That's no fun for either of us.

## Disclaimer

This was written as a weekend project in the midst of other weekend projects. Use issues/email/[internet-method] to provide feedback or contribute ideas. I want to see it improve and plan to work on it, but there are other projects in the works that need attention.

## To Do

 * There are no tests ;( Shame on me.
 * Handle failures better (rollback UI changes to previous state)
 * Provide an auth mechanism via OAuth to GitHub or other things
 * Monitor key spaces for changes and update UI (push via sockets)
 * A mechanism to define presentation parameters per key at a prefix level

[travis-url]: https://travis-ci.org/arobson/kickerd
[travis-image]: https://travis-ci.org/arobson/kickerd.svg?branch=master
[coveralls-url]: https://coveralls.io/github/arobson/kickerd?branch=master
[coveralls-image]: https://coveralls.io/repos/github/arobson/kickerd/badge.svg?branch=master
