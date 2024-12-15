export interface IPoll {
  pollId: string;
  question: string;
  status: "open" | "closed";
  options: IOption[]; 
}

export interface IOption {
  text: string;
  votes: number;
}
