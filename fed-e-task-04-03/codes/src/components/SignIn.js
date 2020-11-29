import React from 'react';
import {
    Input,
    InputGroup,
    Stack,
    InputLeftAddon,
    InputRightAddon,
    Text,
    Box,
    Select,
    Switch,
    Checkbox,
    FormLabel,
    Flex,
    Button,
    FormControl
} from '@chakra-ui/react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { FaUserAlt, FaLock, FaCheck } from 'react-icons/fa';

export default function() {
    const formik = useFormik({
        initialValues: {username: '', password: ''},
        validationSchema: Yup.object({
            username: Yup
                        .string()
                        .matches(/(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|5|7|8|9]\d{9}$)/, '请填写正确的手机号或邮箱')
                        .required('请填写用户名'),
            password: Yup
                        .string()
                        .min(3, '密码的长度不能小于3')
                        .required('请填写密码')
        }),
        onSubmit: async values => {
            const res = await axios.post('https://conduit.productionready.io/users/login', {
                user: {
                    ...values
                }
            })
            console.log(res, JSON.stringify(values, null, 2));
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing="2">
                <FormControl isInvalid={formik.touched.username && !!formik.errors.username}>
                    <InputGroup>
                        <InputLeftAddon children={<FaUserAlt />} />
                        <Input
                            {...formik.getFieldProps('username')}
                            placeholder="请输入手机号或邮箱" />
                    </InputGroup>
                </FormControl>
                <Text color="red.500">{formik.touched.username && formik.errors.username}</Text>
                <FormControl isInvalid={formik.touched.password && !!formik.errors.password}>
                    <InputGroup>
                        <InputLeftAddon children={<FaLock />} />
                        <Input
                            {...formik.getFieldProps('password')}
                            placeholder="密码"
                            type="password" />
                    </InputGroup>
                </FormControl>
                <Text color="red.500">{formik.touched.password && formik.errors.password}</Text>
                <Flex alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center" flexDirection="row">
                        <Checkbox id="deal" mr="3" />
                        <FormLabel htmlFor="deal">记住我</FormLabel>
                    </Flex>
                    <Text>遇到问题？</Text>
                </Flex>
                {/* <button type="submit">Submit</button> */}
                <Button
                  type="submit"
                  _hover={{bgColor: 'blue.200'}}
                  w="100%"
                  borderRadius="50px"
                  colorScheme="blue">登陆</Button>
            </Stack>
        </form>
    )
}
