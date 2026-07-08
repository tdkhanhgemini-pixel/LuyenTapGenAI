export type QuestionType = 'single' | 'multiple' | 'fill' | 'match' | 'true_false';

export type Category = 
  | 'methodology' // Phương pháp và Phương pháp luận của AI tạo sinh
  | 'prompting_basics' // Kiến thức cơ bản về kỹ thuật tạo câu lệnh
  | 'accuracy' // Tính Chính xác của Câu lệnh
  | 'ethics'; // Tác động về mặt đạo đức, xã hội và pháp lý

export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
  category: Category;
  explanation?: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single';
  options: string[];
  correctAnswer: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple';
  options: string[];
  correctAnswers: string[];
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill';
  chunks: string[];
  blanks: {
    options: string[];
    correctAnswer: string;
  }[];
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'match';
  pairs: {
    left: string;
    right: string;
  }[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  correctAnswer: boolean;
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | FillBlankQuestion
  | MatchingQuestion
  | TrueFalseQuestion;
