import { PaginationDto } from "../types/dtos/pagination.dto";
import County from "../database/models/county.db.model";
import Voivodeship from "../database/models/voivodeship.db.model";
import Place from "../database/models/place.db.model";
import { Sequelize } from "sequelize-typescript";
import { entriesToPaginatedObject, paginationOptions, paginationOrder, paginationSearchInColumns } from "../utils/pagination.utils";
import { FindAndCountOptions } from "sequelize/types";
const { Op } = require("sequelize");

export const getPlacesWithPagination = async (pagination?: PaginationDto) => {
    
    let paginationSearch = pagination.search;
    if (paginationSearch) {
      paginationSearch = paginationSearch.replace(/[^\w\s]/gi, "");
    }
    
    let paginationWhere = paginationSearchInColumns<Place>(pagination, {
        name: [Op.like],
        fullName: [Op.like],
        sequelizeAdditional: [
            Sequelize.where(
            Sequelize.fn(
                "concat",
                Sequelize.col("firstName"),
                " ",
                Sequelize.col("lastName")
            ),
            {
                [Op.like]: "%" + paginationSearch + "%"
            }
            )
        ]
    });


    const places = await Place.findAndCountAll({
        include: [
            Voivodeship, County
        ],
        where: {
            ...paginationWhere
        },
        order: [["id", "ASC"]],
        ...paginationOptions(pagination),
        ...paginationOrder<Place>(pagination, [
            {
                field: "name",
                dbColumn: Sequelize.fn(
                "concat",
                Sequelize.col("name"),
                " ",
                Sequelize.col("fullName")
                )
            },
            "email",
            "id"
        ])
    } as FindAndCountOptions);
    
    return entriesToPaginatedObject(places, pagination);
}