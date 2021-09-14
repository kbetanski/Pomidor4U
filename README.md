# Pomidor4You

## Local development

Create `.env` file in `api` catalog:
```
DB_DATABASE=pomodoro
DB_PASSWORD=password
DB_USERNAME=root
DB_HOSTNAME=localhost
DB_PORT=3306
```

Install dependencies in both, `api` and `frontend`
```bash
$ npm i
```

Start both of them in development mode:
```bash
$ cd api && npm run start:dev
```

```bash
$ cd frontend && npm run serve
```
