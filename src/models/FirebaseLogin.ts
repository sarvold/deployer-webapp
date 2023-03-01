export interface FirebaseLoginSuccess {
    displayName: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered: boolean;
};

export interface FirebaseLoginFail {
    error: {
        code: number;
        errors: FirebaseLoginErrorItem[];
        message: string;
    }
}

export interface FirebaseLoginErrorItem {
    message: string;
    domain: string;
    reason: string;
}

export function isFirebaseLoginSuccess(loginResponse: FirebaseLoginSuccess | FirebaseLoginFail): loginResponse is FirebaseLoginSuccess {
    return (loginResponse as FirebaseLoginSuccess).idToken !== undefined;
  }