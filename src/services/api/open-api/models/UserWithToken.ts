/* tslint:disable */
/* eslint-disable */
/**
 * Blueprint api
 * The blueprint API description
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { TokensResponse } from './TokensResponse';
import {
  TokensResponseFromJSON,
  TokensResponseFromJSONTyped,
  TokensResponseToJSON,
} from './TokensResponse';
import type { UserResponseDto } from './UserResponseDto';
import {
  UserResponseDtoFromJSON,
  UserResponseDtoFromJSONTyped,
  UserResponseDtoToJSON,
} from './UserResponseDto';

/**
 *
 * @export
 * @interface UserWithToken
 */
export interface UserWithToken {
  /**
   *
   * @type {UserResponseDto}
   * @memberof UserWithToken
   */
  user: UserResponseDto;
  /**
   *
   * @type {TokensResponse}
   * @memberof UserWithToken
   */
  token: TokensResponse;
}

/**
 * Check if a given object implements the UserWithToken interface.
 */
export function instanceOfUserWithToken(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'user' in value;
  isInstance = isInstance && 'token' in value;

  return isInstance;
}

export function UserWithTokenFromJSON(json: any): UserWithToken {
  return UserWithTokenFromJSONTyped(json, false);
}

export function UserWithTokenFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): UserWithToken {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    user: UserResponseDtoFromJSON(json['user']),
    token: TokensResponseFromJSON(json['token']),
  };
}

export function UserWithTokenToJSON(value?: UserWithToken | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    user: UserResponseDtoToJSON(value.user),
    token: TokensResponseToJSON(value.token),
  };
}
