'use strict';

const should = require('should');
const fetchGitData = require('../lib/fetchGitData');
const { getOptions } = require('..');

describe('fetchGitData', () => {
  beforeEach(() => {
    process.env = { PATH: process.env.PATH };
  });
  it('should throw an error when no data is passed', () => {
    fetchGitData.should.throw(/fetchGitData requires a callback/);
  });
  it('should throw an error when no git context is provided', done => {
    fetchGitData(undefined, err => {
      err.should.match(/No options passed/);
      done();
    });
  });
  it('should execute git commands when a valid commit hash is given', done => {
    process.env.COVERALLS_GIT_COMMIT = 'HEAD';
    process.env.COVERALLS_GIT_BRANCH = 'master';
    getOptions((err, options) => {
      should.not.exist(err);
      options = options.git;
      options.head.should.be.Object();
      options.head.author_name.should.not.equal('Unknown Author');
      options.head.committer_name.should.not.equal('Unknown Committer');
      options.head.message.should.not.equal('Unknown Commit Message');
      options.branch.should.be.String();
      options.should.have.property('remotes');
      options.remotes.should.be.instanceof(Array);
      options.remotes.length.should.be.above(0);
      done();
    });
  });
});
