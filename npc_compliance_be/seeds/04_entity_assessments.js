/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex("entity_assessments").del()

	// Inserts seed entries
	await knex("entity_assessments").insert([
		{
			id: "476cf119-36de-4681-b184-d81e73f5cb5c",
			status: "assigned",
			submitted_by: null,
			reviewed_by: null,
			year: 0,
			comments: "",
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
			entity_id: "2e6888d4-55dd-4c85-8375-15a059f2a636",
			assessment_type_id: 2,
		},
	])
}
