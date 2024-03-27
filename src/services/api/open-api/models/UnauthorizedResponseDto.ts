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
/**
 *
 * @export
 * @interface UnauthorizedResponseDto
 */
export interface UnauthorizedResponseDto {
  /**
   *
   * @type {string}
   * @memberof UnauthorizedResponseDto
   */
  message: string;
  /**
   *
   * @type {number}
   * @memberof UnauthorizedResponseDto
   */
  status: number;
}

/**
 * Check if a given object implements the UnauthorizedResponseDto interface.
 */
export function instanceOfUnauthorizedResponseDto(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'message' in value;
  isInstance = isInstance && 'status' in value;

  return isInstance;
}

export function UnauthorizedResponseDtoFromJSON(
  json: any
): UnauthorizedResponseDto {
  return UnauthorizedResponseDtoFromJSONTyped(json, false);
}

export function UnauthorizedResponseDtoFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): UnauthorizedResponseDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    message: json['message'],
    status: json['status'],
  };
}

export function UnauthorizedResponseDtoToJSON(
  value?: UnauthorizedResponseDto | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    message: value.message,
    status: value.status,
  };
}
