export enum UserType {
  USER,
  AI,
}

export type Message = {
  type: UserType;
  content: string;
};
