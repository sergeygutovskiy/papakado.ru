const mix = require('laravel-mix');
const path = require('path');

mix
    .alias({
        '@': path.join(__dirname, 'resources/js'),
        '@-c': path.join(__dirname, 'resources/js/client'),
        '@-c-vue': path.join(__dirname, 'resources/js/client/vue'),

        '@-a': path.join(__dirname, 'resources/js/admin'),
        '@-a-vue': path.join(__dirname, 'resources/js/admin/vue')
    })

    .options({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                    exclude: /node_modules/,
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                }
            ]
        }
    })

    .sass('resources/scss/app.scss', 'public/css')
    // .js('resources/js/client/app.js', 'public/js')
    .ts('resources/ts/client/app.ts', 'public/js/client')    

    // .js('resources/js/admin/admin.js', 'public/js') 
    .ts('resources/ts/admin/app.ts', 'public/js/admin') 

    .vue()
    .version()
    ;