import { createLogger } from 'bunyan';
import bunyanSeq from 'bunyan-seq';

const { createStream } = bunyanSeq;

const seqUrl = process.env.NODE_ENV === 'production' ? 'http://seq_service:80' : 'http://localhost:8191';
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
      serverUrl: seqUrl,
      level: 'info',
    }),
  ],
});

export default logger;
