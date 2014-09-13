require.config({
    baseUrl: 'src',
    paths: {
        app: './app'
    }
});

define([
    'app'
], function (Application) {
    var app = new Application();
});
