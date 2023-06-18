import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align='center'>
      {showProfileData && (
        <Box mr='4' textAlign='right'>
          <Text>Vagner Reis</Text>
          <Text color='gray.300' fontSize='small'>
            vagnereix.dev@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size='md'
        name='Vagner Reis'
        src='https://github.com/vagnereix.png'
      />
    </Flex>
  );
}
