import { PaginationDto } from "../types/dtos/pagination.dto";
import { Op, col, Model } from "sequelize";
import { KeyValueEntryPagination, PaginationResult } from "../types/pagination";
export const paginationOptions = (pagination: PaginationDto) => {
  let page = pagination.page - 1 < 0 ? 0 : pagination.page - 1;
  let offset = pagination.limit * page;
  return {
    offset,
    limit: pagination.limit,
    distinct: true
  };
};

export const entriesToPaginatedObject = <M extends Model>(
  entries: { rows: M[]; count: number },
  pagination: PaginationDto,
  customMapper?: any
 ) : PaginationResult<M> => {
  let entriesMapped = entries.rows.map((entry: M) => entry.toJSON()) as M[];
  if (customMapper) {
    entriesMapped = entriesMapped.map(customMapper);
  }
  let total = entries.count;
  if (total == 0)
    return {
      total,
      totalInPage: 0,
      pages: 0,
      page: pagination.page == 0 ? 1 : pagination.page,
      data: []
    };

  let pages = Math.ceil(total / pagination.limit);

  return {
    total,
    totalInPage: entriesMapped.length,
    pages,
    page: pagination.page == 0 ? 1 : pagination.page,
    data: entriesMapped
  };
};
export const paginationOrder = <T>(pagination: PaginationDto, fields: any) => {
  if (pagination.order == null || pagination.order.length == 0) return {};
  let orderObject = JSON.parse(pagination.order);
  if (orderObject.column == null || orderObject.order == null) return {};
  if (orderObject.order != "ASC" && orderObject.order != "DESC") return {};

  let field = fields.find(
    (f:any) => f === orderObject.column || f.field === orderObject.column
  );
  if (field == null) return {};
  if (field.dbColumn) {
    return {
      order: [[field.dbColumn, orderObject.order]]
    };
  }
  return {
    order: [[field, orderObject.order]]
  };
};

export const paginationSearchInColumns = <T>(
  pagination: PaginationDto,
  fields: KeyValueEntryPagination<T>,
  globalOperator: symbol = Op.or
) => {
  let columns = [];
  if (fields.sequelizeAdditional) {
    columns.push(...fields.sequelizeAdditional);
    delete fields.sequelizeAdditional;
  }
  if (pagination.search) {
    pagination.search = pagination.search.replace(/[^\w\s]/gi, "");
  }
  for (let [columnName, op] of Object.entries(fields)) {
    let operator: any = op;
    const symbol = operator[0];
    columns.push({
      [columnName]: {
        [symbol]: `%${pagination.search}%`
      }
    });
  }
  let where = {
    [globalOperator]: columns
  };
  if (!pagination.search || 0 === pagination.search.length) {
    return {};
  }
  return where;
};
