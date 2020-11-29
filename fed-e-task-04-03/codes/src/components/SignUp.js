import React from 'react';
import axios from 'axios';
import {
    Input,
    InputGroup,
    Stack,
    InputLeftAddon,
    InputRightAddon,
    Text,
    Radio,
    RadioGroup,
    Select,
    Switch,
    FormLabel,
    Flex,
    Button,
    FormControl,
    Link
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
                        .max(3, '用户名的长度不能大于3')
                        .required('请填写用户名'),
            phone: Yup
                    .string()
                    .matches(/^[1][3,4,5,7,8,9][0-9]{9}$/, '请填写正确手机号')
                    .required('请填写手机号'),
            password: Yup
                        .string()
                        .min(3, '密码的长度不能小于3')
                        .required('请填写密码')
        }),
        onSubmit: async values => {
            const res = await axios.post('https://conduit.productionready.io/users', {
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
                            placeholder="你的昵称" />
                    </InputGroup>
                </FormControl>
                <Text color="red.500">{formik.touched.username && formik.errors.username}</Text>
                <FormControl isInvalid={formik.touched.phone && !!formik.errors.phone}>
                    <InputGroup>
                        <InputLeftAddon children={<FaLock />} />
                        <Input
                            {...formik.getFieldProps('phone')}
                            placeholder="手机号"
                            type="phone" />
                    </InputGroup>
                </FormControl>
                <Text color="red.500">{formik.touched.phone && formik.errors.phone}</Text>
                <FormControl isInvalid={formik.touched.password && !!formik.errors.password}>
                    <InputGroup>
                        <InputLeftAddon children={<FaLock />} />
                        <Input
                            {...formik.getFieldProps('password')}
                            placeholder="设置密码"
                            type="password" />
                    </InputGroup>
                </FormControl>
                <Text color="red.500">{formik.touched.password && formik.errors.password}</Text>
                <Button
                  type="submit"
                  _hover={{bgColor: 'green.200'}}
                  w="100%"
                  borderRadius="50px"
                  colorScheme="green">注册</Button>
                <Text
                  fontSize="14px"
                  px="40px"
                  textAlign="center">
                  点击 “注册” 即表示您同意并愿意遵守简书
                  <Link color="blue.200">用户协议</Link>
                  和
                  <Link color="blue.200">隐私政策</Link> 。
                </Text>
            </Stack>
        </form>
    )
}
