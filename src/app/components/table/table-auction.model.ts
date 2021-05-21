import { Auction } from '../../models/auction.model';
import {statusTranslate} from '../../models/auction-status.enum';
import { DateTimeService } from '../../services/date-time.service';

export enum ColumnName {
    Id = 'id',
    Name = 'name',
    StartTime = 'startTime',
    EndTime = 'endTime',
    CompanyName = 'companyName',
    IsAuction = 'isAuction',
    IsOpen = 'isOpen',
    Status = 'status',
}

export class TableAuction {
    constructor(auction: Auction) {
        this[ColumnName.Id] = String(auction.id);
        this[ColumnName.Name] = auction.name;
        this[ColumnName.StartTime] = DateTimeService.getTimeFormat(new Date(auction.startTime));
        this[ColumnName.EndTime] = DateTimeService.getTimeFormat(new Date(auction.endTime));
        this[ColumnName.CompanyName] = auction.companyName;
        this[ColumnName.IsAuction] = auction.isAuction ? 'Да' : 'Нет';
        this[ColumnName.IsOpen] = auction.isOpen ? 'Свободный' : 'По приглашению';
        this[ColumnName.Status] = statusTranslate[auction.status];
    }
}
