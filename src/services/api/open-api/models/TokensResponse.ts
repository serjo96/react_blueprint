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
 * @interface TokensResponse
 */
export interface TokensResponse {
    /**
     * 
     * @type {string}
     * @memberof TokensResponse
     */
    accessToken: string;
    /**
     * 
     * @type {string}
     * @memberof TokensResponse
     */
    refreshToken: string;
}

/**
 * Check if a given object implements the TokensResponse interface.
 */
export function instanceOfTokensResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "accessToken" in value;
    isInstance = isInstance && "refreshToken" in value;

    return isInstance;
}

export function TokensResponseFromJSON(json: any): TokensResponse {
    return TokensResponseFromJSONTyped(json, false);
}

export function TokensResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TokensResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accessToken': json['accessToken'],
        'refreshToken': json['refreshToken'],
    };
}

export function TokensResponseToJSON(value?: TokensResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'accessToken': value.accessToken,
        'refreshToken': value.refreshToken,
    };
}

