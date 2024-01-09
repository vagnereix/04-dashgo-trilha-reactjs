import {
  Button,
  HStack,
  SimpleGrid,
  VStack,
  Box,
  Flex,
  Heading,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/dist/client/router';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
  password_confirmation: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .oneOf([yup.ref('password')], 'As senhas precisam ser iguais'),
});

export default function CreateUser() {
  const router = useRouter();

  const { mutateAsync } = useMutation(
    async (user: CreateUserFormData) => {
      const { data } = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return data.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await mutateAsync(data);

    router.push('/users');
  };

  return (
    <Box>
      <Header />

      <Flex width='100%' my='6' maxWidth='1480' mx='auto' px='6'>
        <Sidebar />

        <Box
          as='form'
          onSubmit={handleSubmit(handleCreateUser)}
          flex='1'
          borderRadius='8'
          bg='gray.800'
          p={['6', '8']}
        >
          <Heading size='lg' fontWeight='normal'>
            Criar usuário
          </Heading>

          <Divider my='6' borderColor='gray.700' />

          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input
                label='Nome e sobrenome'
                {...register('name')}
                error={errors.name}
              />
              <Input
                type='email'
                label='E-mail'
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input
                type='password'
                label='Senha'
                {...register('password')}
                error={errors.password}
              />
              <Input
                type='password'
                label='Confirme sua senha'
                {...register('password_confirmation')}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end' align='center'>
            <HStack spacing='4'>
              <Link passHref href='/users'>
                <Button as='a' colorScheme='whiteAlpha'>
                  Cancelar
                </Button>
              </Link>
              <Button type='submit' isLoading={isSubmitting} colorScheme='pink'>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
