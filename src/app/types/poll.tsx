export interface IPoll {
  _id?: string;
  pollId: string;
  question: string;
  status: "open" | "closed";
  options: IOption[]; 
}

export interface IOption {
  value: string;
  votes: number;
}
