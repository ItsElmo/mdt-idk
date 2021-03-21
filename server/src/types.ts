export type MyContext = {
	req: Request & { session: Express.Session };
	res: Response;
};
