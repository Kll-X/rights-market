# rights-market-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development with different api
```
npm run serve  
npm run serve:testapi  
npm run serve:prodapi  
npm run serve:greyapi  
npm run serve:devapi  
```

### Compiles and minifies for different environment 
```
npm run build  
npm run testbuild  
npm run greybuild  
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## 代码风格：
1. 尽量缩进使用4个空格
2. 样式名使用a-b-c风格
3. 单位尽量用rem，与@2X的尺寸转化比是100，即设计稿的100px相当于1rem
4. 注意大小写：组件名大写

## 分支管理:
### master 分支
master 为主分支，也是用于部署生产环境的分支，确保master分支稳定性
master 分支一般由dev以及hotfix分支合并，任何时间都不能直接修改代码

### dev 分支
dev 为开发分支，始终保持最新完成以及bug修复后的代码
一般开发的新功能时，feature分支都是基于dev分支下创建的

### feature 分支
开发新功能时，以dev为基础创建feature分支
分支命名: feature/ 开头的为特性分支， 命名规则: feature/seckilling、 feature/secondConfirmBuy

### release分支
release 为预上线分支，发布提测阶段，会release分支代码为基准提测
当有一组feature开发完成，首先会合并到dev分支，进入提测时，会创建release分支。
如果测试过程中若存在bug需要修复，则直接由开发者在release分支修复并提交。
当测试完成之后，合并release分支到master和dev分支，此时master为最新代码，用作上线。

### hotfix 分支
分支命名: hotfix/ 开头的为修复分支，它的命名规则与 feature 分支类似
线上出现紧急问题时，需要及时修复，以master分支为基线，创建hotfix分支，修复完成后，需要合并到master分支和dev分支