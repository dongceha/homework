import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {Tabs, TabList, Tab, TabPanel, TabPanels, Box, useColorModeValue} from '@chakra-ui/react';
export default function() {
    const bgColor = useColorModeValue('gray.200', 'gray.700')
    return (
        <Box
            p="3"
            w="400px"
            mx="auto"
            
            boxShadow="lg"
            bgColor="white"
            borderRadius="lg">
            <Tabs>
                <TabList px="100px"  justifyContent="space-around">
                    <Tab _focus={{boxShadow: 'none'}}>登陆</Tab>
                    <Tab _focus={{boxShadow: 'none'}}>注册</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <SignIn />
                    </TabPanel>
                    <TabPanel>
                        <SignUp />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
