import type { User } from "@prisma/client";

import type {
  Email,
  Password,
  Id,
  FirstName,
  SecondName,
  HttpResponseStatusCode,
  HttpResponseStatusMessage,
} from "@types";

/**
 * Interface for two-level navigation item
 */
export interface NavigationItem {
  readonly label: string;
  readonly path?: string;
 
  subitems: {
    readonly label: string;
    readonly path?: string;
  }[];
}

/**
 * Contains props for creating Next Image
 */
export interface NextImageProps {
  readonly src: `/static/${string}`;
  readonly originalSize: [number, number];
  readonly alt?: string;
  readonly width?: {
    readonly sm?: number;
    readonly md?: number;
    readonly lg?: number;
  };
}

/**
 * Client-side user-related data.
 */
export interface SafeUser {
  email: User["email"];
  firstName: User["firstName"];
  secondName: User["secondName"];
}

/**
 * Data needed to register an user.
 */
export interface RegisterValues {
  firstName: FirstName;
  secondName: SecondName;
  email: Email;
  password: Password;
}

/**
 * Server-side user-related data.
 */
// export interface FullUser extends SafeUser {
//   password: Password;
//   id: Id;
// }
export interface FullUser extends User {}

export interface HttpResponseStatus {
  readonly code: HttpResponseStatusCode;
  readonly message: HttpResponseStatusMessage;
}
