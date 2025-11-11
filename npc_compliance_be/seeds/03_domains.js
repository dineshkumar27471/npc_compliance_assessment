/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex("domains").del()

	// Inserts seed entries with explicit IDs
	await knex("domains").insert([
		{
			id: 1,
			name: "Coordinating the national statistical system",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 2,
			name: "Managing relationships with data providers and stakeholders",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 3,
			name: "Managing statistical information",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 4,
			name: "Assuring Professional Competence",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 5,
			name: "Assuring Impartiality and Objectivity",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 6,
			name: "Assuring Transparency",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 7,
			name: "Assuring Statistical Confidentiality and Data Security",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 8,
			name: "Assuring Commitment to Quality",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 9,
			name: "Managing the Respondent Burden",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 10,
			name: "Assuring Relevance",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 11,
			name: "Assuring Accuracy and Reliability",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 12,
			name: "Assuring Accessibility and Clarity",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 13,
			name: "Assuring Timeliness and Punctuality",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 14,
			name: "Assuring Coherence and Comparability",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
		{
			id: 15,
			name: "Managing Metadata",
			assessment_type_id: 2,
			created_at: knex.fn.now(),
			updated_at: knex.fn.now(),
		},
	])
}
