# Project Title

Nike SNKRS Monitor - get notified for every hyped drop on the Nike SNKRS app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Developed and tested on node v8.6.0

Install on MAC:
```
brew install node@8
brew link node@8
```

Follow those guidelines to install on other machines:
```
https://nodejs.org/en/download/package-manager/
```

### Installing

Download repository with

```
git clone https://github.com/AndiSap/snkrs-monitor.git
```

And then install dependencies with

```
npm install
```

## Deploying and running the monitor

1) set up your account info in snkrsMonitor.ts with
```
this.twilio.setupAccount("YourName", "YourAccountSid", "YourAuthToken", "YourPhoneNumber", "YourTwilioPhoneNumber");
```

2) change directory to the project and build it with
```
npm run build
```

3) start the monitor with
```
node javascript/snkrsMonitor.js
```

## Running tests

TODO: add unit tests
Run unit tests with

```
npm run test
```

## Built With

* [Node.js](https://nodejs.org) - The framework used
* [Twilio](https://www.twilio.com) - sending text messages
* [request-promise-native](https://www.npmjs.com/package/request-promise-native) - sending http requests


## Authors

* **Andreas Saplacan** - *Initial work*


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
