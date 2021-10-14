'use strict';

require('should')();
const index = require('..');

describe('logger', () => {
  it('should log at debug level when --verbose is set', () => {
    index.options.verbose = true;
    const logger = index.logger();
    logger.level.should.equal('debug');
  });
});
