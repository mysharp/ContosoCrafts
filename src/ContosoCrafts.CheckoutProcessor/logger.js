import { createLogger } from 'bunyan';
import bunyanSeq from 'bunyan-seq';

const { createStream } = bunyanSeq;

const logger = createLogger({
  name: 'myapp',
  streams: [
    {
      name: 'console',
      stream: process.stdout,
      level: 'info',
    },
    createStream({
      name: 'seq',
      serverUrl: 'http://localhost:5341',
      level: 'info',
    }),
  ],
});

export default logger;
