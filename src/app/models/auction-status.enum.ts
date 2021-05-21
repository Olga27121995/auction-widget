export enum AuctionStatus {
    Planned = 0,
    InProgress = 1,
    Ended = 2,
}

export const statusTranslate: Record<AuctionStatus, string> = {
    [AuctionStatus.InProgress]: 'Идет',
    [AuctionStatus.Planned]: 'Запланирован',
    [AuctionStatus.Ended]: 'Завершен',
};
