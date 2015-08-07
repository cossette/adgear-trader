AdGear Trader
=========
[![Build Status](https://travis-ci.org/cossette/adgear-trader.svg?branch=master)](https://travis-ci.org/cossette/adgear-trader)
[![Dependency Status](https://gemnasium.com/cossette/adgear-trader.svg)](https://gemnasium.com/cossette/adgear-trader)

AdGear Trader API wrapper written in JavaScript/Node.js.

## Installation

  ```npm install adgear-trader --save```

## Usage
```
  var trader = require('adgear-trader')(ev.process.AUTH_TOKEN);
  
  trader.getCampaigns(function(err, campaigns) {
    
  });
```
## Tests

  ```npm test```

## Release History

* 0.1.0 Initial release
