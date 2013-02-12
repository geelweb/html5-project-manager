basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,

    'app/lib/angular/angular.js',
    'app/lib/angular/angular-resource.js',
    'test/lib/angular/angular-mocks.js',

    'app/js/**/*.js',

    'app/lib/jquery.js',
    'app/lib/bootstrap/js/bootstrap.min.js',

    'test/unit/**/*.js'
];

autoWatch = false;
singleRun = true;
browsers = ['Chrome'];
