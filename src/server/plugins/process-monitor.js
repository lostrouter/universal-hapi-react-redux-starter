import good from 'good';

const loggingEvents = {
    response: '*',
    error: '*',
    log: '*',
    request: '*'
};

const logToConsoleConfig = [
    {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [loggingEvents]
    },

    {
        // Output log info to console
        module: 'good-console'
    },
    'stdout'
];

const logToFileConfig = [
    {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [loggingEvents]
    },

    {
        module: 'good-squeeze',
        name: 'SafeJson'
    },

    {
        // Output log to file
        module: 'good-file',
        args: ['./logs/hapi-log_' + Date.now() ]
    }
];

export default {
    register: good,
    options: {
        reporters: {
            console: logToConsoleConfig,
            file: logToFileConfig
        }
    }
};
