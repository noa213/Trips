


export interface Option {
    text: string;
    votes: number;
  }
  
  export interface Question {
    id: number;
    questionText: string;
    options: Option[];
  }
  
  export interface IPoll {
    id: number;
    title: string;
    questions: Question[];
    status: 'open' | 'closed'; // חייב להיות אחד מהערכים הללו
  }
  