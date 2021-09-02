import { createLogger } from 'bunyan';
import { createStream } from 'bunyan-seq';

let logger = createLogger({
    name: 'myapp',
    streams: [
        {
            name:'console',
            stream: process.stdout,
            level: 'info',
        },
        createStream({
            name:'seq',
            serverUrl: 'http://localhost:5341',
            level: 'info'
        })
    ]
});

export default logger;