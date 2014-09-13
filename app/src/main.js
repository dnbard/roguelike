require.config({
    baseUrl: 'src',
    paths: {
        app: './app',
        jquery: 'http://cdn.jsdelivr.net/jquery/2.1.1/jquery',
        lodash: 'http://cdn.jsdelivr.net/lodash/2.4.1/lodash',
        pubsub: 'http://cdn.jsdelivr.net/pubsubjs/1.4.2/pubsub.min'
    }
});

define([
    'app'
], function (Application) {
    var app = new Application();
});
