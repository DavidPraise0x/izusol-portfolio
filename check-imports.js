import * as lucide from 'lucide-react';
import * as framer from 'framer-motion';

console.log('--- LUCIDE IMPORTS ---');
console.log(Object.keys(lucide).filter(k => k.toLowerCase().includes('hub')));

console.log('\n--- FRAMER MOTION IMPORTS ---');
console.log('motion:', framer.motion !== undefined ? 'OK' : 'UNDEFINED');
console.log('AnimatePresence:', framer.AnimatePresence !== undefined ? 'OK' : 'UNDEFINED');
