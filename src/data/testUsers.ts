export interface UserCredentials {
    username: string;
    password: string;
    errorMessage: string;
}

export const validUsers: UserCredentials[] = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        errorMessage: ''
    },
    {
        username: 'problem_user',
        password: 'secret_sauce',
        errorMessage: ""
    },
    {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        errorMessage: ""
    },
    {
        username: 'error_user',
        password: 'secret_sauce',
        errorMessage: ""
    },
    {
        username: 'visual_user',
        password: 'secret_sauce',
        errorMessage: ""
    }
]

export const invalidUsers: UserCredentials[] = [
    {
        username: '',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username is required',
    },
    {
        username: 'standard_user',
        password: '',
        errorMessage: 'Epic sadface: Password is required',
    },
    {
        username: '',
        password: '',
        errorMessage: 'Epic sadface: Username is required',
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Sorry, this user has been locked out.',
    },
    {
        username: 'standard_user',
        password: 'wrong_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        username: 'wrong_username',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        username: 'wrong_username',
        password: 'wrong_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    }
]