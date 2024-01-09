import { useQuery } from 'react-query';
import { api } from '../api';

type UserFromAPI = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
  pageStart: number;
  pageEnd: number;
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);
  const pageStart = data.pageStart;
  const pageEnd = data.pageEnd;

  const users: User[] = data.users.map((user: UserFromAPI) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return { users, totalCount, pageStart, pageEnd };
}

export function useUsers(page: number, initialData: GetUsersResponse) {
  return useQuery<GetUsersResponse>(['users', page], () => getUsers(page), {
    staleTime: 1000 * 30 * 5, // 5 minutes
    initialData,
  });
}
