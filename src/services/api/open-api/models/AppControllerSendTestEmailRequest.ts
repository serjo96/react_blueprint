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
 * @interface AppControllerSendTestEmailRequest
 */
export interface AppControllerSendTestEmailRequest {
    /**
     * 
     * @type {string}
     * @memberof AppControllerSendTestEmailRequest
     */
    email?: string;
}

/**
 * Check if a given object implements the AppControllerSendTestEmailRequest interface.
 */
export function instanceOfAppControllerSendTestEmailRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AppControllerSendTestEmailRequestFromJSON(json: any): AppControllerSendTestEmailRequest {
    return AppControllerSendTestEmailRequestFromJSONTyped(json, false);
}

export function AppControllerSendTestEmailRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppControllerSendTestEmailRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': !exists(json, 'email') ? undefined : json['email'],
    };
}

export function AppControllerSendTestEmailRequestToJSON(value?: AppControllerSendTestEmailRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
    };
}

