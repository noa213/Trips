export interface IPoll {
  pollId: string;
  question: string;
  status: "open" | "closed";
  options: IOption[]; 
}

interface IOption {
  text: string;
  votes: number;
}
