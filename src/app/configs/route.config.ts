import { Config } from './config';

export class RouteConfig {
    public static domain = 'https://cislinketp.com/';
    public static auctionApi = `${RouteConfig.domain}bff/widget/${Config.clientId}/auctions`;
    public static schedule = `${RouteConfig.domain}schedule/`;
}
