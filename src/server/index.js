import cluster from 'cluster';
import { cpus } from 'os';
import Server from './server';

const cpuCoreCount = process.env.NODE_ENV !== 'production' ? 1 : cpus().length - 1;

global.__IS_SERVER__ = true;

if (cluster.isMaster) {
    for (let i = 0; i < cpuCoreCount; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online'); // eslint-disable-line no-console
    });

    cluster.on('exit', function( worker, code, signal) {
        console.log('Worker ' + worker.process.pid + 'died with code: (' + code + '), and signal: ' + signal); // eslint-disable-line no-console max-len
        console.log('Starting new worker'); // eslint-disable-line no-console
        cluster.fork();
    });
} else {
    Server.create(function(err, server) {
        server.start(() => {
            server.log(['bootstrap'], 'Server running at: ' + server.info.uri);
            server.log(['environment'], process.env.NODE_ENV);
        });
    });
}
