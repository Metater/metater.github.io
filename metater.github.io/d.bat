CALL build.bat
del "E:\Projects\Visual Studio\metater.github.io\docs" /s /f /q
xcopy /s /f /q /y "E:\Projects\Visual Studio\metater.github.io\metater.github.io\build" "E:\Projects\Visual Studio\metater.github.io\docs"
cd "E:\Projects\Visual Studio\metater.github.io" && git init
cd "E:\Projects\Visual Studio\metater.github.io" && git add . 
cd "E:\Projects\Visual Studio\metater.github.io" && git status
cd "E:\Projects\Visual Studio\metater.github.io" && git commit -m 'Deployed pages folder docs'
cd "E:\Projects\Visual Studio\metater.github.io" && git push