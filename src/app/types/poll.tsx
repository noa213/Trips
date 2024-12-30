export interface IPoll {
  _id?: string;
  pollId: string;
  question: string;
  status: "open" | "closed";
  options: IOption[]; 
}

export interface IOption {
<<<<<<< HEAD
  text: string;
=======
  value: string;
>>>>>>> noa
  votes: number;
}
