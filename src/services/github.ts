const BASE_URL = "https://api.github.com";

export type User = {
    login: string,
    id: number
}

export interface IUsersResponse {
    items: User[];
    total_count: number | null;
}

export const getUsersByLogin = async (value: string): Promise<IUsersResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/search/users?q=${value}+in:login&per_page=8`)

        if (response.status !== 200) throw new Error();

        const usersResponse: IUsersResponse = await response.json();

        return usersResponse;
    } catch (_) {
        throw new Error("Oops! Something went wrong, please try again later.")
    }
}