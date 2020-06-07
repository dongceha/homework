#!/usr/bin/env node
 
// 设置环境变量的 文件头
 
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
 
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: '文件名称'
    }
]).then(answers => {
    // 根据用户的输入结果生成文件
    // 模板目录
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = process.cwd()
 
    // 读取模板文件，并输出
    fs.readdir(tmplDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
                if (err) throw err
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})