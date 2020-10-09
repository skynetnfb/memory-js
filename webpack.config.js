const HtmlWebPackPlugin = require ("html-webpack-plugin");
const MiniCssExtractPlugin = require ("mini-css-extract-plugin");

module.exports={
module: {
rules: [
        {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                        loader: 'babel-loader',
                        options: {
                                presets: ['@babel/preset-env']
                        }
                }
        },
{
        test: /\.html$/,
use: [
{
        loader:"html-loader",
options:{minimize:true}
}
]
},
        {
                test: /\.scss$/,
                use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                ]
        },
        {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: ['file-loader']
        },
]
},
plugins: [new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
}),
        new MiniCssExtractPlugin({
                filename: "[name].css]",
                chunkFilename: "[id].css"
        })]
}
