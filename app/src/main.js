require.config({
    baseUrl: 'src',
    paths: {
        app: './app',
        jquery: 'http://cdn.jsdelivr.net/jquery/2.1.1/jquery.min'
    }
});

define([
    'app'
], function (Application) {
    var app = new Application();
});
