<h1 align="center">CISLINK AUCTION WIDGET</h1>

## Документация

Для работы с виджетом скачайте проект:

```
git clone https://github.com/CislinkEtp/auction-widget.git
```
Установите пакеты, выполнив команду: 
```
npm i
```
Откройте файл:
```
src/app/configs/config.ts
```
Вставьте в поле clientId свой ключ вида <b>4sssf755-999c-4181-9c80-74cc40187ace</b> и перезапишите файл.
<br>
Для сборки проекта выполните команду:
```
npm run build:prod
```
После сборки проекта в папке dist у вас появится файл
<b>cislink-auction-widget.js</b>
<br>
Скопируйте данный файл в свой проект и добавьте ссылку на страницу, где будет размещен виджет:
```
<script defer="defer" src="cislink-auction-widget.js"></script>
```
В необходимом месте проекта, где будет размещен виджет, добавьте тег:
```
<auction-table></auction-table>
```
