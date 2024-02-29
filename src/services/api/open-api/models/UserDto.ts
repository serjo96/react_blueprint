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
import type { ProfileDto } from './ProfileDto';
import {
    ProfileDtoFromJSON,
    ProfileDtoFromJSONTyped,
    ProfileDtoToJSON,
} from './ProfileDto';

/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    login?: string;
    /**
     * User role
     * @type {string}
     * @memberof UserDto
     */
    roles: UserDtoRolesEnum;
    /**
     * 
     * @type {boolean}
     * @memberof UserDto
     */
    confirmed: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    password?: string;
    /**
     * 
     * @type {ProfileDto}
     * @memberof UserDto
     */
    profile?: ProfileDto;
}


/**
 * @export
 */
export const UserDtoRolesEnum = {
    Guest: 'guest',
    User: 'user',
    Moderator: 'moderator',
    Admin: 'admin'
} as const;
export type UserDtoRolesEnum = typeof UserDtoRolesEnum[keyof typeof UserDtoRolesEnum];


/**
 * Check if a given object implements the UserDto interface.
 */
export function instanceOfUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "roles" in value;
    isInstance = isInstance && "confirmed" in value;

    return isInstance;
}

export function UserDtoFromJSON(json: any): UserDto {
    return UserDtoFromJSONTyped(json, false);
}

export function UserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'login': !exists(json, 'login') ? undefined : json['login'],
        'roles': json['roles'],
        'confirmed': json['confirmed'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'profile': !exists(json, 'profile') ? undefined : ProfileDtoFromJSON(json['profile']),
    };
}

export function UserDtoToJSON(value?: UserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'login': value.login,
        'roles': value.roles,
        'confirmed': value.confirmed,
        'password': value.password,
        'profile': ProfileDtoToJSON(value.profile),
    };
}

