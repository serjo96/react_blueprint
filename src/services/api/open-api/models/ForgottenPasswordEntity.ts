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
import type { UserEntity } from './UserEntity';
import {
  UserEntityFromJSON,
  UserEntityFromJSONTyped,
  UserEntityToJSON,
} from './UserEntity';

/**
 *
 * @export
 * @interface ForgottenPasswordEntity
 */
export interface ForgottenPasswordEntity {
  /**
   *
   * @type {string}
   * @memberof ForgottenPasswordEntity
   */
  token: string;
  /**
   *
   * @type {Date}
   * @memberof ForgottenPasswordEntity
   */
  expirationDate: Date;
  /**
   *
   * @type {UserEntity}
   * @memberof ForgottenPasswordEntity
   */
  user: UserEntity;
  /**
   *
   * @type {number}
   * @memberof ForgottenPasswordEntity
   */
  attempts: number;
  /**
   *
   * @type {Date}
   * @memberof ForgottenPasswordEntity
   */
  lastAttemptDate: Date | null;
}

/**
 * Check if a given object implements the ForgottenPasswordEntity interface.
 */
export function instanceOfForgottenPasswordEntity(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'token' in value;
  isInstance = isInstance && 'expirationDate' in value;
  isInstance = isInstance && 'user' in value;
  isInstance = isInstance && 'attempts' in value;
  isInstance = isInstance && 'lastAttemptDate' in value;

  return isInstance;
}

export function ForgottenPasswordEntityFromJSON(
  json: any
): ForgottenPasswordEntity {
  return ForgottenPasswordEntityFromJSONTyped(json, false);
}

export function ForgottenPasswordEntityFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ForgottenPasswordEntity {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    token: json['token'],
    expirationDate: new Date(json['expirationDate']),
    user: UserEntityFromJSON(json['user']),
    attempts: json['attempts'],
    lastAttemptDate:
      json['lastAttemptDate'] === null
        ? null
        : new Date(json['lastAttemptDate']),
  };
}

export function ForgottenPasswordEntityToJSON(
  value?: ForgottenPasswordEntity | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    token: value.token,
    expirationDate: value.expirationDate.toISOString(),
    user: UserEntityToJSON(value.user),
    attempts: value.attempts,
    lastAttemptDate:
      value.lastAttemptDate === null
        ? null
        : value.lastAttemptDate.toISOString(),
  };
}
