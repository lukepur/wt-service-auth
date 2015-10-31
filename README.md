# wt-service-auth

A super-lightweight auth service, utilising JSON web tokens to offload user authentication to consuming clients. The service provides a lean API to signup, login and retrieve a key to verify issued tokens.

# Setup

## Prerequisites

1. Node.js and NPM
2. Mongodb running locally, or a url to a writable instance elsewhere

## Installation

1. `npm install`
2. Create a `.env` file at root of project and add the mongodb URL, e.g.

  `dbUrl=mongodb://127.0.0.1/credentials`
3. `npm start`

# API

### `POST /signup`

* Fields:

  * `username` (required)

  * `password` (required)

* Returns

  - `200` with JSON web token containing user id (successful signup)
  - `409` if username already exists

### `POST /login`

* Fields:

  * `username` (required)
  * `password` (required)

* Returns
  - `200` with `JSON web token containing user id (successful login)
  - `400` if incorrect password
  - `404` if user doesn't exist

### `GET /verification-key`

Returns the public key which can be used to verify the digitally signed tokens returned from the `/signup` and `/login` endpoints.

# Tokens

The tokens returned from successful `/signup` and `/login` requests are digitally signed using a private key. The public key used to verify these tokens is exposed on the `/verification-key' endpoint.

# Current considerations

1. Keys for signing tokens are currently created/stored on a per instance basis, so scaling multiple instances will not work - TODO: use redis to store keys for sharing across multiple service instances
2. API endpoints are unprotected. TODO: add configuration to use client credentials and facility to register clients.
3. This service should be served behind a TLS proxy to prevent man-in-the-middle attacks on the tokens.
