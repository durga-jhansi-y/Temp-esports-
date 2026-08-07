package com.esports.auth.entity;

/**
 * Application roles used for authorization.
 *
 * USER  – default role assigned to all public registrations.
 * ADMIN – elevated privileges; never self-assignable during registration.
 */
public enum Role {
    USER,
    ADMIN
}
