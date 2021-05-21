import { AuctionStatus } from './auction-status.enum';
import { AuctionType } from './auction-type';

export interface AuctionResponse {
    entities: Auction[];
    filter: AuctionFilter;
    totalCount: number;
}

export interface Auction {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    companyName: string;
    isAuction: boolean;
    isOpen: boolean;
    status: AuctionStatus;
    type: AuctionType;
}

export interface AuctionFilter {
    count?: number;
    offset?: number;
    auctionStatuses?: AuctionStatus[];
    companyName?: string;
    auctionName?: string;
}
