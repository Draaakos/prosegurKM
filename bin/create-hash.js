import fs from 'fs';
import { randomUUID } from 'crypto';

fs.writeFileSync('./bin/hash.txt', randomUUID());