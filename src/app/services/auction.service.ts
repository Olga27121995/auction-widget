import { Config } from '../configs/config';
import { RouteConfig } from '../configs/route.config';
import {Auction, AuctionFilter, AuctionResponse} from '../models/auction.model';
import { PaginationResponse } from '../models/pagination-response.model';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

export class AuctionService {
    public static getAuctions(filter: AuctionFilter = {}): Promise<AuctionResponse> {
        filter.count = filter.count || Config.auctionCount;
        const url =
            RouteConfig.auctionApi + UrlService.getQuery(filter);
        return HttpService.api<PaginationResponse<Auction>>(url).then((response) => ({ ...response, filter }));
    }
}
