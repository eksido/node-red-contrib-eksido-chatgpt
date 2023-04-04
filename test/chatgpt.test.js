const should = require('chai').should();
const helper = require('node-red-node-test-helper');
const chatgptNode = require('../chatgpt.js');

helper.init(require.resolve('node-red'));

describe('chatgpt Node', () => {
  beforeEach((done) => {
    helper.startServer(done);
  });

  afterEach((done) => {
    helper.unload().then(() => {
      helper.stopServer(done);
    });
  });

  it('should be loaded', (done) => {
    const flow = [{ id: 'n1', type: 'chatgpt', name: 'chatgpt' }];
    helper.load(chatgptNode, flow, () => {
      const n1 = helper.getNode('n1');
      n1.should.have.property('name', 'chatgpt');
      done();
    });
  });

  // Add more test cases as needed
});
