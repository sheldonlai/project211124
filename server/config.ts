export const config = {

    'database': {
        'URI': 'mongodb://admin:1122312@ds143141.mlab.com:43141/askalot'
    },

    'testDatabase': {
        'URI': 'mongodb://admin:1122312@ds145292.mlab.com:45292/testaskalot'
    },

    'jwt' : {
        'secretKey': 'KByAhnzskR'
    },

    'facebook': {
        'appID' : '1421085411246839',
        'appSecret' : 'c27a4754cdf0055dafa7d3afaaddb73d',
    },

    'email': {
        'address': 'noreply.eztextbook@gmail.com',
        'password': 'gqTlxA0w7J'
    },

    'aws': {
        'accessKeyId': 'xxxx',
        'associateTag': 'yyyy',
        'secretKey': 'zzzz'
    },

    'dev': {
        'devMode': true,
        'database' : 'mongodb://127.0.0.1:27017/test'
    }

}
