/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex("entities").del()

	// Inserts seed entries
	await knex("entities").insert([
		{
			id: "2e6888d4-55dd-4c85-8375-15a059f2a636",
			name: "Ministry of Health",
			description: "",
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	])
}
