@echo off 
cd dist/
git init 
git config core.autocrlf false
git remote add origin git@github.com:Mackkkk/SummaryOfwork.git
git add .
git commit -m 'publish'
git pull origin master
git push origin master