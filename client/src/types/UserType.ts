export type UserType = {
	id: String;
	avatar: String;
	name: String;
	city: String;
	district: String;
	ward: String;
	phone: String;
	username?: String;
	password?: String;
	dateOfBirth: any;
	address: String;
	citizenIdentificationNumber: String;
	dateRange: any;
	issuedBy: String;
	permanentAddress: String;
	email: String;
	password_email: String;
};

export type AuthType = {
	username: String;
	password: String;
};
