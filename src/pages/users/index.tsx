import {
  Text,
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  useBreakpointValue,
  Spinner,
  Link as ChakraLink,
} from '@chakra-ui/react';

import Link from 'next/link';
import { useState } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { getUsers, useUsers } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { GetServerSideProps } from 'next';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type UserListProps = {
  users: User[];
  totalCount: number;
  pageStart: number;
  pageEnd: number;
};

export default function UserList({
  users,
  totalCount,
  pageStart,
  pageEnd,
}: UserListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(currentPage, {
    users,
    totalCount,
    pageStart,
    pageEnd,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(id: string) {
    await queryClient.prefetchQuery(
      ['user', id],
      async () => {
        const { data } = await api.get(`users/${id}`);

        return data;
      },
      {
        staleTime: 1000 * 30 * 5, // 5 minutes
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex width='100%' my='6' maxWidth='1480' mx='auto' px='6'>
        <Sidebar />

        <Box flex='1' borderRadius='8' bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Usuários
              {isFetching && !isLoading && (
                <Spinner size='sm' color='gray.500' ml='4' />
              )}
            </Heading>

            <Link passHref href='/users/create'>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Erro ao encontrar usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color='gray.300' width='8'>
                      <Checkbox colorScheme='pink' />
                    </Th>

                    <Th>Usuário</Th>

                    {isWideVersion && <Th>Data de cadastro</Th>}

                    <Th w='8'></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.users.map((user: User) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={['4', '4', '6']}>
                          <Checkbox colorScheme='pink' />
                        </Td>

                        <Td>
                          <Box>
                            <ChakraLink
                              color='purple.400'
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight='bold'>{user.name}</Text>
                            </ChakraLink>
                            <Text fontSize='sm' color='gray.300'>
                              {user.email}
                            </Text>
                          </Box>
                        </Td>

                        {isWideVersion && <Td>{user.createdAt}</Td>}

                        <Td>
                          <Button
                            as='a'
                            size='sm'
                            fontSize='sm'
                            colorScheme='purple'
                            leftIcon={<Icon as={RiPencilLine} fontSize='16' />}
                            iconSpacing={!isWideVersion ? '0' : '2'}
                          >
                            {isWideVersion && 'Editar'}
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data?.totalCount ?? 0}
                pageStart={data?.pageStart as number}
                pageEnd={data?.pageEnd as number}
                onPageChange={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount, pageStart, pageEnd } = await getUsers(1);

  return {
    props: { users, totalCount, pageStart, pageEnd },
  };
};
