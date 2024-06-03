## Описание проекта

Приложение для управления задачами и событиями с использованием календаря, созданное с помощью React.

## Цель проекта

Цель проекта - предоставить удобный инструмент для планирования и управления задачами с визуализацией на календаре.

## Требования

- Node.js
- npm или yarn
- Docker

## Установка

1. **Клонирование репозитория**

    ```sh
    git clone https://github.com/ilyasilkin27/todo-calendar.git
    cd todo-calendar
    ```

2. **Установка зависимостей**

    ```sh
    npm install
    ```
    или
    ```sh
    yarn install
    ```

## Скрипты

- **Запуск приложения в режиме разработки**

    ```sh
    npm start
    ```

    или

    ```sh
    yarn start
    ```

- **Запуск тестов**

    ```sh
    npm test
    ```

    или

    ```sh
    yarn test
    ```

- **Сборка приложения**

    ```sh
    npm run build
    ```

    или

    ```sh
    yarn build
    ```

## Docker

Для запуска проекта в Docker:

1. **Сборка Docker образа**

    ```sh
    docker build -t todo-calendar .
    ```

2. **Запуск контейнера**

    ```sh
    docker run -p 3000:3000 todo-calendar
    ```

Теперь приложение доступно по адресу `http://localhost:3000`.
