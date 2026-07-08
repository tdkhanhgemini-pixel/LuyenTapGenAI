import { Question } from './types';
import { questions1 } from './questions1';
import { questions2 } from './questions2';
import { questions3 } from './questions3';

// 45 câu hỏi trải rộng trên 4 miền kiến thức chính
export const questionBank: Question[] = [...questions1, ...questions2, ...questions3];

