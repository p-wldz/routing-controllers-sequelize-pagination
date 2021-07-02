# routing-controllers-sequelize-pagination
Integration between routing-controllers and sequelize with typescript for generating pagination.
Project shows how structure should look like with configuration. 

## What's the setup?
- Sequelize with TS - the best option for ORM, it allows you to use decorators. (see `src\database\models\user.db.model.ts`)
- routing-controllers - creating controller classess for express etc.

## Installation
- Run `npm install`
- Change connection credentials in `src\config\environments\development.ts`
- Update DB, run: `npm run sync-db`
- For development process use `nodemon`


## Using
Project has DTO with pagination
```javascript
export type PaginationResult<T> = {
    total: number,
    totalInPage: number,
    pages: number,
    page: number,
    data: T[]
}
```

which means client can catch result of which page is, what is the number of pages etc.
Client can control result by QueryParams `page=1&limit=10&filters=[]`
