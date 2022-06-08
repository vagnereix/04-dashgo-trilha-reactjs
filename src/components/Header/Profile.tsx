import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>Vagner Reis</Text>
        <Text color='gray.300' fontSize='small'>vagnereix@dev.com</Text>
      </Box>

      <Avatar size='md' name='Vagner Reis' src='https://github.com/vagnereix.png' />
    </Flex>
  )
}
