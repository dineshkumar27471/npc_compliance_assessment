/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex("assessment_types").del()

	// Inserts seed entries
	await knex("assessment_types").insert([
		{
			id: 1,
			name: "Compliance Assessment",
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 2,
			name: "Compliance Assessment",
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	])
}
