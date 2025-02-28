export const LOGIN_REGEX = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z]).{8,40}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;
export const PHONE_REGEX = /^\+?\d{10,15}$/;
