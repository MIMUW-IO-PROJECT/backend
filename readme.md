# Backend

## Wymagania

- Node v16
- npm v8

## Instalacja

Aby zainstalować niezbędne zależności należy wykonać w terminalu polecenie:

```
npm i
```

## Plik .env

Aplikacja wymaga pliku `.env`, w którym zdefiniowane są zmienne `PORT` i `DATABASE_URI`, odpowiednio port, na którym nasłuchuje serwer, oraz [link do łączenia z bazą Mongo](https://www.mongodb.com/docs/manual/reference/connection-string/#std-label-mongodb-uri).

## Uruchomienie

Aby uruchomić aplikację należy wykonać w terminalu polecenie:

```
npm start
```

Jeżeli w konsoli dostaliśmy wiadomość `Server is listening on the port ... .` to znaczy, że serwer uruchomił się poprawnie.

## Development

Aby uruchomić linter należy wykonać w terminalu polecenie:

```
npm run eslint
```

Aby sprawdzić, czy kod jest właściwie sformatowany należy wykonać w terminalu polecenie:

```
npm run prettier-check
```

Aby automatycznie sformatować kod należy wykonać w terminalu polecenie:

```
npm run prettier-format
```

Aby uruchomić testy należy wykonać w terminalu polecenie:

```
npm run test
```
