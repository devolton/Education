export interface IProfileDetails {
    surname: string;
    name: string;
    middleName: string;
    login: string;
    avatarPath
}

export interface IUpdateLogin {
    newLogin: string;
    confirmPassword: string;
}

export interface IUpdatePassword {
    currentPassword: string;
    newPassword: string;
    passwordConfirmation: string;
}

export interface IConnectedAccounts {
    google: boolean;
    github: boolean;
    stack: boolean;
}

export interface IEmailPreferences {
    successfulPayments: boolean;
    payouts: boolean;
    freeCollections: boolean;
    customerPaymentDispute: boolean;
    refundAlert: boolean;
    invoicePayments: boolean;
    webhookAPIEndpoints: boolean;
}

export interface INotifications {
    notifications: {
        email: boolean;
        phone: boolean;
    };
    billingUpdates: {
        email: boolean;
        phone: boolean;
    };
    newTeamMembers: {
        email: boolean;
        phone: boolean;
    };
    completeProjects: {
        email: boolean;
        phone: boolean;
    };
    newsletters: {
        email: boolean;
        phone: boolean;
    };
}

export interface IDeactivateAccount {
    confirm: boolean;
}

export const profileDetailsInitValues: IProfileDetails = {
    avatarPath: "media/avatars/300-1.jpg",
    surname: '',
    name: '',
    middleName: '',
    login: ''

};

export const updateLogin: IUpdateLogin = {
    newLogin: "",
    confirmPassword: "",
};

export const updatePassword: IUpdatePassword = {
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
};

export const connectedAccounts: IConnectedAccounts = {
    google: true,
    github: true,
    stack: false,
};

export const emailPreferences: IEmailPreferences = {
    successfulPayments: false,
    payouts: true,
    freeCollections: false,
    customerPaymentDispute: true,
    refundAlert: false,
    invoicePayments: true,
    webhookAPIEndpoints: false,
};

export const notifications: INotifications = {
    notifications: {
        email: true,
        phone: true,
    },
    billingUpdates: {
        email: true,
        phone: true,
    },
    newTeamMembers: {
        email: true,
        phone: false,
    },
    completeProjects: {
        email: false,
        phone: true,
    },
    newsletters: {
        email: false,
        phone: false,
    },
};

export const deactivateAccount: IDeactivateAccount = {
    confirm: false,
};
