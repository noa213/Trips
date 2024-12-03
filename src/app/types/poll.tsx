export interface IPoll {
  pollId: string;
  question: string;
  options: Array<{
    option: string;
    votes: number;
  }>;
  status: "open" | "closed";
}
