import { RoleEmun } from '../enum/role-emun';

export interface AuthenticationRequestModel {
  email?: string;
  password?: string;
}

export interface AuthenticationResponseModel {
  accessToken?: string;
  refreshToken?: string;
}

export interface RefreshTokenRequestModel {
  refreshToken: string;
}

export interface UtilisateurModel {
  id?: number;
  nom?: string;
  email?: string;
  motDePasse?:string;
  role?: RoleEmun;
  dateCreation?: Date;
}
