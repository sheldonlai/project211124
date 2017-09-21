# Project Askalot

### Objective:
To simplify learning in universities by allowing students to share different topics and guides with each other.

### Requirements
Make sure npm and node is installed.\
We use node-gyp for some components make sure python 2.7 and c++ compiler is present\
Install elastic search and run it on localhost:9200 \
Have node 8.4.x or above
#### Mac OSX:
1. should be installed with xcode

#### Windows:
1. open windows powershell as an administrator and type:\
`npm install --global --production windows-build-tools`
   
### Build:

1. Go to root directory and type:\
`npm install`
1. To build the server type: (note: you might need typescript to be installed globally or reference the .bin inside node_modules)\
`tsc` or `node_modules/.bin/tsc`
1. To build the front end type: (note: you might need webpack to be installed globally or reference the .bin inside node_modules)\
`webpack` or `node_modules/.bin/webpack`
1. Finally run the server by typing:\
`npm start`
### Commit or pull request:
make sure all tests pass before you commit by typing: \
`npm test`\
all tests should pass and they should be running concurrently. 


