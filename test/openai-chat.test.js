const should = require('chai').should();
const helper = require('node-red-node-test-helper');
const openaiChatNode = require('../openai-chat.js');

helper.init(require.resolve('node-red'));

describe('openai-chat Node', () => {
  beforeEach((done) => {
    helper.startServer(done);
  });

  afterEach((done) => {
    helper.unload().then(() => {
      helper.stopServer(done);
    });
  });

  it('should be loaded', (done) => {
    const flow = [{ id: 'n1', type: 'openai-chat', name: 'openai-chat' }];
    helper.load(openaiChatNode, flow, () => {
      const n1 = helper.getNode('n1');
      n1.should.have.property('name', 'openai-chat');
      done();
    });
  });

  // Add more test cases as needed
});
