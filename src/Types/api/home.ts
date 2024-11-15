export interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterGoogleAuth {
  name: string;
  email: string;
  avatarURL: string;
  avatarName: string;
  password: string;
}
export interface IEditRequest {
  tripId: string;
  accept: boolean;
}
export interface IUserDataToUpdate {
  name: string;
  email: string;
  curPassword: string;
  password: string;
}
export interface IEditRequestData {
  reqId: string;
  isAccept: boolean;
}
