# fastapi-angular-blog

[![](https://img.shields.io/badge/Python-3.8-blue.svg)](https://www.python.org/downloads)
[![](https://img.shields.io/badge/FastAPI-0.74.1-ff69b4.svg)](https://fastapi.tiangolo.com/)
[![](https://img.shields.io/badge/Angular-13.x-red.svg)](https://angular.cn/)

PS: 工作關係，擱置中

## 介绍
Python后端簡約开源博客 

*后端*
* 框架：FastAPI
* 數據庫：Sqlib3
* ORM：SQLAlchemy
* 搜索： _在做了_ 

*前端*
* 框架：Angular
* 博客界面：ngx-bootstrap
* 管理界面：@angular/material

### 基本要求
* Python: 3.8.x
* Node: 16.13.0 (LTS)
* Angular CLI: 13.x

## 下載
```shell
git clone https://gitee.com/Woodrex/fastapi-angular-blog.git


### 安裝
*後端*
```
1: 安装Python 3.8.x，打開虛擬環境（默認使用venv）
2：或進入backend目錄，pip install -r ./requirements.txt
```
*前端*
```
1: 安装Node版本 16.13.0 和 angular-cli
```

### 開發啓動(僅供測試，不適合生產環境)

*后端*
```
# 初始化和啓動
1: cd fastapi-angular-blog
2: backend\venv\scripts\activate.bat # 打開虛擬環境
3: uvicorn backend.main:app --port 8003
```
*前端*
```
1: cd fastapi-angular-blog
2: npm -i
3: npm start
4: http://localhost:4200        # 進入前端頁面
4: http://localhost:4200/login  # 進入管理員頁面
```

## 預覽

![avatar](./pic/Main.png)
![avatar](./pic/control.png)

