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
 * @interface ErrorValidationDto
 */
export interface ErrorValidationDto {
    /**
     * Object with errors arrays
     * @type {object}
     * @memberof ErrorValidationDto
     */
    errors?: object;
    /**
     * 
     * @type {string}
     * @memberof ErrorValidationDto
     */
    message: string;
    /**
     * 
     * @type {number}
     * @memberof ErrorValidationDto
     */
    statusCode: number;
}

/**
 * Check if a given object implements the ErrorValidationDto interface.
 */
export function instanceOfErrorValidationDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "message" in value;
    isInstance = isInstance && "statusCode" in value;

    return isInstance;
}

export function ErrorValidationDtoFromJSON(json: any): ErrorValidationDto {
    return ErrorValidationDtoFromJSONTyped(json, false);
}

export function ErrorValidationDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorValidationDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'errors': !exists(json, 'errors') ? undefined : json['errors'],
        'message': json['message'],
        'statusCode': json['statusCode'],
    };
}

export function ErrorValidationDtoToJSON(value?: ErrorValidationDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'errors': value.errors,
        'message': value.message,
        'statusCode': value.statusCode,
    };
}

