/*
*  
* variables configuring production, and developer mode
*
*/


// container for all environments

const environments = {};


// Default environments (staging)
environments.staging = {
    'httpPort': 3000,
    'envname': 'staging'

}

// Production environments
environments.production = {
    'httpPort': 5000,
    'envname': 'production'

}

// Current environmet
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check current environment is one above, if not, set default environment

const environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


// export 
module.exports = environmentToExport;