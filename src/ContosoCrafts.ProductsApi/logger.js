import { createLogger } from 'bunyan';
import bunyan_seq from 'bunyan-seq';
const { createStream } = bunyan_seq;

let logger = createLogger({
    name: 'myapp',
    streams: [
        {
            name: 'console',
            stream: process.stdout,
            level: 'info',
        },
        createStream({
            name: 'seq',
            serverUrl: 'http://localhost:8191',
            level: 'info'
        })
    ]
});

export default logger;