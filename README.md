<h1 align="center">CISLINK AUCTION WIDGET</h1>

## Документация

Для работы с виджетом необходимо скачать проект

```
git clone https://github.com/CislinkEtp/auction-widget.git
```
Установить пакеты, выполнив команду: 
```
npm i
```
Открыть фаил 
```
src/app/configs/config.ts
```
Вставить в поле clientId свой ключ вида <b>4sssf755-999c-4181-9c80-74cc40187ace</b> и перезаписать фаил.
<br>
Для сборки проекта выполнить команду:
```
npm run build:prod
```
После сборки проекта в папке dist у вас появится фаил
<b>cislink-auction-widget.js</b>
<br>
Скопируйте данный фаил в свой проект и добавьте ссылку на страницу где должен быть виджет:
```
<script defer="defer" src="cislink-auction-widget.js"></script>
```
В необходимом месте в проекте, где должен будет распологаться виджет, добавьте тег <b><auction-table></auction-table></b>