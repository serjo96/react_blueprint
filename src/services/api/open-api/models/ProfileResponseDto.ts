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
 * @interface ProfileResponseDto
 */
export interface ProfileResponseDto {
    /**
     * 
     * @type {string}
     * @memberof ProfileResponseDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ProfileResponseDto
     */
    name: string;
    /**
     * 
     * @type {Date}
     * @memberof ProfileResponseDto
     */
    birthday: Date;
    /**
     * 
     * @type {string}
     * @memberof ProfileResponseDto
     */
    photoUrl: string;
    /**
     * 
     * @type {string}
     * @memberof ProfileResponseDto
     */
    userId: string;
}

/**
 * Check if a given object implements the ProfileResponseDto interface.
 */
export function instanceOfProfileResponseDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "birthday" in value;
    isInstance = isInstance && "photoUrl" in value;
    isInstance = isInstance && "userId" in value;

    return isInstance;
}

export function ProfileResponseDtoFromJSON(json: any): ProfileResponseDto {
    return ProfileResponseDtoFromJSONTyped(json, false);
}

export function ProfileResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfileResponseDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'birthday': (new Date(json['birthday'])),
        'photoUrl': json['photoUrl'],
        'userId': json['userId'],
    };
}

export function ProfileResponseDtoToJSON(value?: ProfileResponseDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'birthday': (value.birthday.toISOString()),
        'photoUrl': value.photoUrl,
        'userId': value.userId,
    };
}
