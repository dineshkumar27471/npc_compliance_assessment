export default {
	development: {
		client: "pg",
		connection: {
			host: "localhost",
			user: "postgres",
			password: "postgres",
			database: "npc_compliance_db",
		},
		migrations: {
			directory: "./migrations",
		},
		seeds: {
			directory: "./seeds",
		},
	},
}
