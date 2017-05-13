var path = require('path');

module.exports = {
    entry: {
        app : './client/app/main.tsx'
    },
    devtool: 'source-maps',
    cache: true,
    output: {
        path: path.join(__dirname, './client/static/'),
        filename: '[name].bundle.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", "jsx", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader'}
        ],

        // plugins : [
        //     new LoaderOptionsPlugin({
        //         debug: false,
        //         options: {
        //             resolve: {
        //                 extensions: ['.ts', '.tsx', '.js']
        //             }
        //         }
        //     })
        // ]

        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //     { test: /\.js$/, loader: "source-map-loader" }
        // ]

    }

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};