export class GetMenusQuery { constructor(public readonly take = 25, public readonly cursor?: string, public readonly companyId?: string) {} }
