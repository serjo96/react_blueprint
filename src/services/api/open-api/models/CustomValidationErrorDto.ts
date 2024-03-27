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
 * @interface CustomValidationErrorDto
 */
export interface CustomValidationErrorDto {
  /**
   *
   * @type {string}
   * @memberof CustomValidationErrorDto
   */
  message: string;
  /**
   *
   * @type {number}
   * @memberof CustomValidationErrorDto
   */
  status: number;
  /**
   *
   * @type {object}
   * @memberof CustomValidationErrorDto
   */
  errors: object;
}

/**
 * Check if a given object implements the CustomValidationErrorDto interface.
 */
export function instanceOfCustomValidationErrorDto(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'message' in value;
  isInstance = isInstance && 'status' in value;
  isInstance = isInstance && 'errors' in value;

  return isInstance;
}

export function CustomValidationErrorDtoFromJSON(
  json: any
): CustomValidationErrorDto {
  return CustomValidationErrorDtoFromJSONTyped(json, false);
}

export function CustomValidationErrorDtoFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): CustomValidationErrorDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    message: json['message'],
    status: json['status'],
    errors: json['errors'],
  };
}

export function CustomValidationErrorDtoToJSON(
  value?: CustomValidationErrorDto | null
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
    errors: value.errors,
  };
}
