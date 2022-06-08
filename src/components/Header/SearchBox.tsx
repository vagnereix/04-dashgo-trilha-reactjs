import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  return (
    <Flex
      as='label'
      flex='1'
      py='4'
      px='8'
      ml='6'
      maxW='400'
      h='60px'
      alignSelf='center'
      color='gray.200'
      position='relative'
      bg='gray.800'
      borderRadius='full'
      align='center'
    >
      <Input
        color='gray.50'
        border='0'
        bg='transparent'
        px='4'
        mr='4'
        placeholder='Buscar na plataforma'
        _placeholder={{
          color: 'gray.400',
        }}
        _focus={{
          border: '0',
        }}
      />
      <Icon as={RiSearchLine} fontSize='20' />
    </Flex>
  )
}
